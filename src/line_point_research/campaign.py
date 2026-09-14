from __future__ import annotations

import hashlib
import json
import os
import sqlite3
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml

from .agents import AgentError, CommandAgentProvider
from .exponents import is_stronger_fixed_exponent
from .snapshot import update_dashboard_sections


def utc_timestamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


PROOF_STEP = {
    "type": "object", "additionalProperties": False,
    "required": ["id", "statement", "status", "proof", "dependencies"],
    "properties": {
        "id": {"type": "string"},
        "statement": {"type": "string"},
        "status": {"type": "string", "enum": ["proved", "conditional", "conjectural", "refuted"]},
        "proof": {"type": "string"},
        "dependencies": {"type": "array", "items": {"type": "string"}},
    },
}


EXPONENT_STAGE = {
    "type": "object", "additionalProperties": False,
    "required": ["stage", "input_scale", "output_scale", "loss", "justification", "status"],
    "properties": {
        "stage": {"type": "string"},
        "input_scale": {"type": "string"},
        "output_scale": {"type": "string"},
        "loss": {"type": "string"},
        "justification": {"type": "string"},
        "status": {"type": "string", "enum": ["proved", "conditional", "conjectural", "refuted"]},
    },
}


LITERATURE_DEPENDENCY = {
    "type": "object", "additionalProperties": False,
    "required": ["paper", "version", "result_id", "hypotheses", "used_for"],
    "properties": {
        "paper": {"type": "string"},
        "version": {"type": "string"},
        "result_id": {"type": "string"},
        "hypotheses": {"type": "string"},
        "used_for": {"type": "string"},
    },
}


RESEARCH_SCHEMA = {
    "type": "object", "additionalProperties": False,
    "required": ["title", "dimension", "field_regime", "result_status", "claim_scope", "benchmark_improved",
                 "claimed_exponent", "theorem_statement", "parameter_regime",
                 "sampling_model", "global_conclusion", "literature_dependencies",
                 "proof_steps", "exponent_ledger", "counterexample_attempts",
                 "characteristic_audit", "finite_sanity_checks", "obstructions",
                 "next_tasks", "note_markdown"],
    "properties": {
        "title": {"type": "string"},
        "dimension": {"type": "integer", "const": 2},
        "field_regime": {"type": "string", "enum": ["prime"]},
        "result_status": {"type": "string", "enum": ["proved", "conditional", "conjectural", "refuted"]},
        "claim_scope": {"type": "string", "enum": ["bivariate_theorem", "algebraic_lemma", "combinatorial_lemma", "obstruction", "counterexample", "proof_tool"]},
        "benchmark_improved": {"type": "boolean"},
        "claimed_exponent": {"type": ["string", "null"]},
        "theorem_statement": {"type": "string"},
        "parameter_regime": {"type": "string"},
        "sampling_model": {"type": "string"},
        "global_conclusion": {"type": "string"},
        "literature_dependencies": {"type": "array", "items": LITERATURE_DEPENDENCY},
        "proof_steps": {"type": "array", "items": PROOF_STEP},
        "exponent_ledger": {"type": "array", "items": EXPONENT_STAGE},
        "counterexample_attempts": {"type": "array", "items": {"type": "string"}},
        "characteristic_audit": {"type": "array", "items": {"type": "string"}},
        "finite_sanity_checks": {"type": "array", "items": {"type": "string"}},
        "obstructions": {"type": "array", "items": {"type": "string"}},
        "next_tasks": {"type": "array", "items": {"type": "string"}},
        "note_markdown": {"type": "string"},
    },
}


GENIUS_SCHEMA = {
    "type": "object", "additionalProperties": False,
    "required": ["title", "dimension", "field_regime", "snapshot", "evidence_ledger", "bottleneck_map",
                 "architectures", "selected_architecture_id", "integrated_theorem",
                 "claimed_exponent", "proof_steps", "exponent_ledger",
                 "counterexample_attempts", "research_directives", "limitations",
                 "abstain_reason", "note_markdown"],
    "properties": {
        "title": {"type": "string"},
        "dimension": {"type": "integer", "const": 2},
        "field_regime": {"type": "string", "enum": ["prime"]},
        "snapshot": {
            "type": "object", "additionalProperties": False,
            "required": ["data_manifest_sha256", "durable_file_count", "examined_paths",
                         "omitted_paths", "coverage_complete"],
            "properties": {
                "data_manifest_sha256": {"type": "string"},
                "durable_file_count": {"type": "integer"},
                "examined_paths": {"type": "array", "items": {"type": "string"}},
                "omitted_paths": {"type": "array", "items": {"type": "string"}},
                "coverage_complete": {"type": "boolean"},
            },
        },
        "evidence_ledger": {
            "type": "array", "items": {
                "type": "object", "additionalProperties": False,
                "required": ["claim_id", "statement", "status", "supporting_paths"],
                "properties": {
                    "claim_id": {"type": "string"},
                    "statement": {"type": "string"},
                    "status": {"type": "string", "enum": ["proved", "conditional", "conjectural", "refuted"]},
                    "supporting_paths": {"type": "array", "items": {"type": "string"}},
                },
            },
        },
        "bottleneck_map": {"type": "array", "items": EXPONENT_STAGE},
        "architectures": {
            "type": "array", "items": {
                "type": "object", "additionalProperties": False,
                "required": ["id", "name", "claimed_exponent", "core_idea", "proved_components",
                             "missing_obligations", "known_attacks", "priority"],
                "properties": {
                    "id": {"type": "string"},
                    "name": {"type": "string"},
                    "claimed_exponent": {"type": ["string", "null"]},
                    "core_idea": {"type": "string"},
                    "proved_components": {"type": "array", "items": {"type": "string"}},
                    "missing_obligations": {"type": "array", "items": {"type": "string"}},
                    "known_attacks": {"type": "array", "items": {"type": "string"}},
                    "priority": {"type": "integer"},
                },
            },
        },
        "selected_architecture_id": {"type": ["string", "null"]},
        "integrated_theorem": {"type": "string"},
        "claimed_exponent": {"type": ["string", "null"]},
        "proof_steps": {"type": "array", "items": PROOF_STEP},
        "exponent_ledger": {"type": "array", "items": EXPONENT_STAGE},
        "counterexample_attempts": {"type": "array", "items": {"type": "string"}},
        "research_directives": {"type": "array", "items": {"type": "string"}},
        "limitations": {"type": "array", "items": {"type": "string"}},
        "abstain_reason": {"type": ["string", "null"]},
        "note_markdown": {"type": "string"},
    },
}


AUDIT_ITEM = {
    "type": "object", "additionalProperties": False,
    "required": ["reference", "claim", "verdict", "justification"],
    "properties": {
        "reference": {"type": "string"},
        "claim": {"type": "string"},
        "verdict": {"type": "string", "enum": ["valid", "gap", "false", "unclear"]},
        "justification": {"type": "string"},
    },
}


AUDIT_SCHEMA = {
    "type": "object", "additionalProperties": False,
    "required": ["verdict", "unfixable", "verified_claim_sha256", "dimension_verified",
                 "field_regime_verified", "scope_verified",
                 "benchmark_improved", "verified_exponent", "fatal_obstruction",
                 "coverage_complete", "quantifier_audit", "exponent_audit",
                 "literature_audit", "line_audit", "required_changes",
                 "counterexample_attempts", "summary"],
    "properties": {
        "verdict": {"type": "string", "enum": ["accept", "revise", "reject"]},
        "unfixable": {"type": "boolean"},
        "verified_claim_sha256": {"type": ["string", "null"]},
        "dimension_verified": {"type": "boolean"},
        "field_regime_verified": {"type": "boolean"},
        "scope_verified": {"type": "string", "enum": ["none", "bivariate_theorem", "algebraic_lemma", "combinatorial_lemma", "obstruction", "counterexample", "proof_tool"]},
        "benchmark_improved": {"type": "boolean"},
        "verified_exponent": {"type": ["string", "null"]},
        "fatal_obstruction": {"type": ["string", "null"]},
        "coverage_complete": {"type": "boolean"},
        "quantifier_audit": {"type": "array", "items": AUDIT_ITEM},
        "exponent_audit": {"type": "array", "items": AUDIT_ITEM},
        "literature_audit": {"type": "array", "items": AUDIT_ITEM},
        "line_audit": {"type": "array", "items": AUDIT_ITEM},
        "required_changes": {"type": "array", "items": {"type": "string"}},
        "counterexample_attempts": {"type": "array", "items": {"type": "string"}},
        "summary": {"type": "string"},
    },
}


DIRECTIONS = [
    "audit the exact bivariate prime-field cubic bottleneck in Kominers--Thaler--Zheng",
    "improve the combinatorial concentration step in the affine plane over F_p",
    "improve the bivariate algebraic interpolation step over F_p",
    "multiplicity-sensitive bivariate interpolation and weighted vanishing conditions",
    "Hasse derivatives and inseparability in small prime characteristic",
    "bivariate factorization, discriminants, and absolutely irreducible plane curves",
    "Bezout and intersection-multiplicity accounting for curves in the affine plane",
    "prime-field incidence bounds for point-line agreement configurations",
    "higher moments and dependent random choice on good incidences",
    "energy increment and popularity refinements",
    "additive-combinatorial structure of good directions in F_p^2",
    "sum-product and prime-field incidence phenomena in the affine plane",
    "bivariate Reed--Muller list recovery and list-decoding reductions",
    "local correction and plurality decoding without exponent loss",
    "agreement theorems and direct-product testing analogies",
    "direct affine-plane geometry avoiding lossy intermediate lemmas",
    "structured pencils of good lines through popular points",
    "direction-by-direction consistency and gluing inside F_p^2",
    "polynomial-method incidence bounds specialized to F_p^2",
    "prime-characteristic obstructions when p is small relative to d and epsilon",
    "low-prime-characteristic counterexamples to derivative arguments",
    "construct bivariate prime-field lower-bound examples near the d/p threshold",
    "information-theoretic barriers and sharpness constructions",
    "line-versus-line insights that rigorously preserve the bivariate line-versus-point test",
    "plane-curve rigidity and polynomial identity mechanisms",
    "second-moment versus third-moment losses in the bivariate proof",
    "prime-field character sums or Weil bounds for structured exceptional sets",
    "extract every bivariate prime-field exponent from Arora--Sudan",
    "extract and optimize the bivariate prime-field HKSS exponent ledger",
    "unified bivariate prime-field proof architecture targeting exponent 1-o(1)",
]


SCHEMA = """
PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS campaign_meta (
  key TEXT PRIMARY KEY, value_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS campaign_jobs (
  id TEXT PRIMARY KEY, role TEXT NOT NULL, ordinal INTEGER, direction TEXT,
  dependency TEXT, status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL, output_dir TEXT, error TEXT,
  model TEXT NOT NULL, reasoning_effort TEXT NOT NULL,
  created_at TEXT NOT NULL, started_at TEXT, finished_at TEXT
);
"""


@dataclass
class CampaignPaths:
    config: Path
    workspace: Path
    campaign_dir: Path
    corpus_root: Path


def load_campaign_config(path: Path | str) -> tuple[dict[str, Any], CampaignPaths]:
    config_path = Path(path).resolve()
    config = yaml.safe_load(config_path.read_text())
    if not isinstance(config, dict):
        raise ValueError("campaign configuration must be a YAML mapping")
    campaign = config.get("campaign", {})
    count = int(campaign.get("researcher_count", 0))
    if count < 1:
        raise ValueError("campaign.researcher_count must be at least 1")
    effort = str(campaign.get("reasoning_effort", ""))
    if effort != "ultra":
        raise ValueError("campaign.reasoning_effort must be ultra")
    if int(campaign.get("dimension", 2)) != 2:
        raise ValueError("campaign.dimension must be exactly 2")
    if str(campaign.get("field_regime", "prime")) != "prime":
        raise ValueError("campaign.field_regime must be prime")
    if int(campaign.get("degree_lower_bound_exclusive", 100)) != 100:
        raise ValueError("campaign.degree_lower_bound_exclusive must be 100")
    base = config_path.parent

    def resolve(value: str) -> Path:
        candidate = Path(value)
        return (base / candidate).resolve() if not candidate.is_absolute() else candidate.resolve()

    paths = CampaignPaths(
        config_path,
        resolve(config.get("workspace", "..")),
        resolve(config["campaign_dir"]),
        resolve(config.get("corpus_root", "../research_state")),
    )
    return config, paths


class ResearchCampaign:
    def __init__(self, config_path: Path | str):
        self.config, self.paths = load_campaign_config(config_path)
        self.cfg = self.config["campaign"]
        self.paths.campaign_dir.mkdir(parents=True, exist_ok=True)
        self.db_path = self.paths.campaign_dir / "campaign.sqlite3"
        self.lock = threading.Lock()
        self.provider = CommandAgentProvider(
            self.paths.workspace,
            self.paths.campaign_dir / "agent_logs",
            executable=str(self.cfg.get("executable", "codex")),
            model=str(self.cfg.get("model", "gpt-5.6-sol")),
            reasoning_effort=str(self.cfg.get("reasoning_effort", "ultra")),
            disable_nested_agents=bool(self.cfg.get("disable_nested_agents", True)),
            timeout_seconds=int(self.cfg.get("timeout_seconds", 3600)),
        )
        self.max_workers = int(self.cfg.get("max_workers", 4))
        self.retry_seconds = int(self.cfg.get("retry_seconds", 120))

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.db_path, timeout=60)
        connection.row_factory = sqlite3.Row
        return connection

    def initialize(self, recover_running: bool = True) -> None:
        with self.connect() as connection:
            connection.executescript(SCHEMA)
            connection.execute("INSERT OR REPLACE INTO campaign_meta VALUES (?,?)",
                               ("config", json.dumps(self.config, sort_keys=True)))
            connection.execute("INSERT OR REPLACE INTO campaign_meta VALUES (?,?)",
                               ("created_or_resumed_at", json.dumps(utc_timestamp())))
            if recover_running:
                connection.execute(
                    "UPDATE campaign_jobs SET status='queued',error='recovered stale running lease' WHERE status='running'")
            for ordinal in range(1, int(self.cfg["researcher_count"]) + 1):
                job_id = f"researcher-{ordinal:04d}"
                direction = DIRECTIONS[(ordinal - 1) % len(DIRECTIONS)]
                connection.execute(
                    """INSERT OR IGNORE INTO campaign_jobs
                    (id,role,ordinal,direction,dependency,status,max_attempts,model,reasoning_effort,created_at)
                    VALUES (?,?,?,?,?,'queued',?,?,?,?)""",
                    (job_id, "researcher", ordinal, direction, None,
                     int(self.cfg.get("max_attempts", 8)), self.provider.model,
                     self.provider.reasoning_effort, utc_timestamp()),
                )
                connection.execute(
                    "UPDATE campaign_jobs SET direction=? WHERE id=? AND role='researcher' "
                    "AND status='queued' AND attempts=0",
                    (direction, job_id),
                )
            if bool(self.cfg.get("genius_enabled", True)):
                connection.execute(
                    """INSERT OR IGNORE INTO campaign_jobs
                    (id,role,ordinal,direction,dependency,status,max_attempts,model,reasoning_effort,created_at)
                    VALUES ('GENIUS','genius',NULL,?,'__swarm_reviews__','queued',?,?,?,?)""",
                    ("global proof synthesis toward exponent 1-o(1)",
                     int(self.cfg.get("max_attempts", 8)), self.provider.model,
                     self.provider.reasoning_effort, utc_timestamp()),
                )
                connection.execute(
                    "UPDATE campaign_jobs SET direction=? WHERE id='GENIUS' AND role='genius' "
                    "AND status='queued' AND attempts=0",
                    ("global bivariate prime-field proof synthesis toward exponent 1-o(1)",),
                )
        self.export_status()

    def _ready(self, limit: int) -> list[dict[str, Any]]:
        with self.connect() as connection:
            rows = [dict(row) for row in connection.execute(
                "SELECT * FROM campaign_jobs WHERE status='queued' "
                "ORDER BY CASE role WHEN 'verifier' THEN 0 WHEN 'researcher' THEN 1 ELSE 2 END, ordinal, id")]
            all_jobs = [dict(row) for row in connection.execute(
                "SELECT id,role,status FROM campaign_jobs")]
        states = {row["id"]: row["status"] for row in all_jobs}
        ready: list[dict[str, Any]] = []
        for row in rows:
            dependency = row["dependency"]
            if dependency is None:
                ready.append(row)
            elif dependency == "__swarm_reviews__":
                researcher_terminal = all(
                    states.get(f"researcher-{index:04d}") in {"succeeded", "failed"}
                    for index in range(1, int(self.cfg["researcher_count"]) + 1))
                successful = [item["id"] for item in all_jobs
                              if item["role"] == "researcher" and item["status"] == "succeeded"]
                verifier_terminal = all(
                    states.get(f"verifier-{source_id}") in {"succeeded", "failed"}
                    for source_id in successful)
                if researcher_terminal and verifier_terminal:
                    ready.append(row)
            elif states.get(dependency) == "succeeded":
                ready.append(row)
            if len(ready) >= limit:
                break
        return ready

    def _claim(self, job_id: str) -> bool:
        with self.lock, self.connect() as connection:
            changed = connection.execute(
                """UPDATE campaign_jobs SET status='running',attempts=attempts+1,
                started_at=?,error=NULL WHERE id=? AND status='queued'""",
                (utc_timestamp(), job_id)).rowcount
        return changed == 1

    def _enqueue_verifier(self, source_id: str) -> None:
        if not bool(self.cfg.get("verifier_enabled", True)):
            return
        verifier_id = f"verifier-{source_id}"
        with self.lock, self.connect() as connection:
            connection.execute(
                """INSERT OR IGNORE INTO campaign_jobs
                (id,role,ordinal,direction,dependency,status,max_attempts,model,reasoning_effort,created_at)
                VALUES (?, 'verifier', NULL, ?, ?, 'queued', ?, ?, ?, ?)""",
                (verifier_id, f"independent proof and exponent audit of {source_id}", source_id,
                 int(self.cfg.get("max_attempts", 8)), self.provider.model,
                 self.provider.reasoning_effort, utc_timestamp()),
            )

    def _corpus_instruction(self) -> str:
        return f"""The repository is {self.paths.workspace}. The durable corpus root is
{self.paths.corpus_root}. Begin by reading TARGET.md, references/LITERATURE.md,
references/bibliography.json, research_state/DATA_MANIFEST.json, all prior submissions,
leaderboards, and verifier audits. You have a read-only shell. Treat literature summaries as
navigation aids and identify exact primary-source theorem dependencies. Distinguish quoted
theorems from your own exponent reconstruction. Finite-field computation is useful for
falsification but cannot prove an asymptotic soundness theorem. Ignore every directory named
superseded: those files are retained only as provenance and are not part of the active corpus."""

    def _research_prompt(self, row: dict[str, Any]) -> str:
        modes = ["proof-first", "bottleneck-first", "adversarial", "synthesis-first"]
        mode = modes[(int(row["ordinal"]) - 1) % len(modes)]
        return f"""You are {row['id']}, one of {self.cfg['researcher_count']} independent
mathematical research agents improving soundness of the affine line-versus-point low-degree
test. Your assigned direction is: {row['direction']}. Your mode is {mode}.

{self._corpus_instruction()}

The problem is fixed at m=2 over the prime field F_p, with integer degree 100 < d < p. Degrees
d <= 100, including d=0, are outside the campaign scope. Do not analyze them, repair the theorem
there, or present them as obstructions. The benchmark is the
bivariate specialization of the Kominers--Thaler--Zheng threshold C(d/p)^(1/3), with global
agreement Omega(local agreement). The long-term target is (d/p)^(1-o(1)). Since d/p<1, a
larger exponent is stronger. Do genuine mathematical work: isolate one bottleneck, attempt a
new lemma or counterexample, and write a fully quantified result.

Do not work on m>2, dimension bootstrapping, extension fields, or descent: the standard
general-dimensional lift is a routine downstream corollary and earns no campaign credit. Do not
silently change uniform affine-line sampling, replace total degree by individual degree, assume
fixed d, or return only a large list of candidate global polynomials.

Every exponent manipulation must appear in the exponent ledger. State p,d, local agreement
epsilon, all auxiliary parameters, and the final global agreement, with m=2 fixed. Audit division
by derivatives, discriminants, irreducibility, interpolation multiplicities, and every
union/Markov/Cauchy--Schwarz loss. Test adversarial tables, inseparability, concentrated good
directions, d near p, and the lower boundary d=101. A rigorous obstruction or
correction to the bivariate target is valuable. If the benchmark is not improved, set
benchmark_improved=false. Set dimension=2 and field_regime=prime in the structured response.

Return a standard academic Markdown note with Abstract, Test and Notation, Prior Results,
Theorem, Proof or Conditional Proof, Exponent Ledger, Counterexample Attempts,
Characteristic Audit, and Limitations. Number all proof steps [P1], [P2], ... and mark each as
proved, conditional, conjectural, or refuted. RULE: A lemma statement contains only its
quantified objects, hypotheses, and conclusion. It contains no motivation, derivation,
commentary, proof sketch, interpretation, history, or explanation; put all such material in the
proof. A dedicated Lemma Writer will post-edit and may split a lemma without changing its content.
"""

    def _genius_prompt(self) -> str:
        return f"""You are GENIUS, the global proof-synthesis mathematician for the
line-versus-point campaign. You must inspect the complete accumulated corpus and attempt an
integrated bivariate prime-field route from the cubic threshold toward exponent 1-o(1).

{self._corpus_instruction()}

Inspect every submission and audit under {self.paths.campaign_dir}. Produce a coverage receipt
and abstain from a global theorem if material data are omitted. Reconstruct a single normalized
exponent ledger for the m=2 prime-field portions of Arora--Sudan, HKSS, KTZ, and every new
architecture. Identify whether each loss is algebraic, incidence-combinatorial, probabilistic,
or list-decoding.

The scored degree regime is integer 100 < d < p. Ignore d <= 100 completely, including d=0;
endpoint behavior there is neither a counterexample nor a research contribution for this campaign.

Propose at most three compatible proof architectures. For the selected architecture, state one
exact theorem with all quantifiers and write every dependency as a numbered proof step. A claimed
exponent improvement requires every stage to be proved; otherwise publish the strongest honest
conditional theorem and its minimal missing obligations. Red-team small prime characteristic,
inseparability, d near p, adversarial line tables, and conversion from a list to one global
polynomial. Work only with m=2 over F_p; do not spend effort on the routine lift to higher
dimension or on extension fields. Set dimension=2 and field_regime=prime. Do not average
incompatible lemmas or use finite evidence as proof.

RULE: Every lemma statement must contain only its quantified objects, hypotheses, and conclusion.
Put all motivation, derivation, commentary, proof sketches, interpretation, history, and
explanation in the proof. A dedicated Lemma Writer will post-edit and may split a lemma without
changing its content.
"""

    def _verifier_prompt(self, source_id: str) -> str:
        source_dir = self.paths.campaign_dir / "submissions" / source_id
        response = json.loads((source_dir / "response.json").read_text())
        note = (source_dir / "note.md").read_text()
        numbered = "\n".join(
            f"{index:04d}: {line}" for index, line in enumerate(note.splitlines(), 1))
        claim = response.get("theorem_statement") or response.get("integrated_theorem", "")
        claim_hash = hashlib.sha256(claim.encode()).hexdigest()
        return f"""You are an independent hostile mathematical verifier. Audit submission
{source_id} line by line. You did not author it. Recompute every exponent and check every
quantifier, field hypothesis, sampling convention, literature dependency, and proof-step edge.
Accept only the exact claim whose SHA-256 is {claim_hash}; never silently weaken it.

The campaign theorem is restricted to integer 100 < d < p. Do not raise, investigate, or score
edge cases with d <= 100, including d=0. Verify that the submitted claim covers 100 < d < p;
behavior outside that regime is irrelevant to the verdict.

An accept requires complete coverage; a correct exponent ledger; valid handling of every prime
characteristic in the claimed parameter regime; a proved conversion to the stated
single-polynomial global conclusion; no required changes; and no fatal obstruction. Use reject
with unfixable=true only for a concrete counterexample or false theorem. Use revise for repairable
gaps. Explicitly compare the claimed exponent with 1/3, remembering that d/p<1. Reject or request
revision if the mathematical advance
depends on m other than 2, a non-prime field, or dimension bootstrapping: those are outside this
campaign. Set dimension_verified and field_regime_verified true only after checking those exact
restrictions in every theorem and lemma. Run finite sanity checks only to find errors, never to
certify asymptotic quantifiers.

SUBMISSION MANIFEST:
{json.dumps(response, indent=2, sort_keys=True)}

NUMBERED NOTE:
{numbered}
"""

    def _static_check(self, role: str, response: dict[str, Any]) -> dict[str, Any]:
        note = response.get("note_markdown", "")
        errors: list[str] = []
        if len(note) < 1200:
            errors.append("academic note is shorter than 1200 characters")
        for heading in ("Abstract", "Theorem", "Exponent Ledger", "Limitations"):
            if heading.lower() not in note.lower():
                errors.append(f"missing {heading} section")
        if not response.get("proof_steps"):
            errors.append("no structured proof steps")
        if not response.get("exponent_ledger"):
            errors.append("no structured exponent ledger")
        if response.get("dimension") != 2:
            errors.append("submission dimension must be exactly 2")
        if response.get("field_regime") != "prime":
            errors.append("submission field_regime must be prime")
        if role == "researcher" and response.get("benchmark_improved"):
            if response.get("result_status") != "proved":
                errors.append("benchmark_improved requires result_status=proved")
            if not response.get("claimed_exponent"):
                errors.append("benchmark_improved requires a claimed exponent")
            elif response.get("claimed_exponent") not in {"1-o(1)", "1−o(1)"}:
                try:
                    if not is_stronger_fixed_exponent(
                            response["claimed_exponent"],
                            str(self.cfg.get("benchmark_exponent", "1/3"))):
                        errors.append("claimed exponent does not improve the configured benchmark")
                except (ValueError, ZeroDivisionError):
                    errors.append("claimed exponent is not a recognized rational or 1-o(1)")
        if role == "genius":
            snapshot = response.get("snapshot", {})
            if snapshot.get("coverage_complete") and snapshot.get("omitted_paths"):
                errors.append("coverage_complete conflicts with omitted_paths")
        return {
            "passed": not errors,
            "errors": errors,
            "note_sha256": hashlib.sha256(note.encode()).hexdigest(),
        }

    def _run_job(self, row: dict[str, Any]) -> tuple[str, bool, str | None]:
        role, job_id = row["role"], row["id"]
        try:
            if role == "researcher":
                response, metadata = self.provider.run(
                    job_id, self._research_prompt(row), RESEARCH_SCHEMA)
                schema = "line-point-research-submission-v1"
            elif role == "genius":
                response, metadata = self.provider.run(
                    "GENIUS", self._genius_prompt(), GENIUS_SCHEMA)
                schema = "line-point-genius-synthesis-v1"
            else:
                source_id = str(row["dependency"])
                response, metadata = self.provider.run(
                    job_id, self._verifier_prompt(source_id), AUDIT_SCHEMA)
                schema = "line-point-proof-audit-v1"

            if role == "verifier":
                source_id = str(row["dependency"])
                source_response = json.loads(
                    (self.paths.campaign_dir / "submissions" / source_id / "response.json").read_text())
                claim = source_response.get("theorem_statement") or source_response.get(
                    "integrated_theorem", "")
                expected = hashlib.sha256(claim.encode()).hexdigest()
                accept_consistent = (
                    response["verified_claim_sha256"] == expected and
                    response["dimension_verified"] and
                    response["field_regime_verified"] and
                    response["coverage_complete"] and
                    not response["required_changes"] and
                    response["fatal_obstruction"] is None and
                    response["line_audit"] and
                    response["quantifier_audit"] and
                    response["exponent_audit"] and
                    all(item["verdict"] == "valid" for key in (
                        "line_audit", "quantifier_audit", "exponent_audit", "literature_audit")
                        for item in response[key])
                )
                if response["verdict"] == "accept" and not accept_consistent:
                    response["verdict"] = "revise"
                    response["unfixable"] = False
                    response["fatal_obstruction"] = None
                    response["required_changes"] = list(response["required_changes"]) + [
                        "Harness rejected an internally inconsistent accept verdict."]
                out_dir = self.paths.campaign_dir / "reviews" / source_id / job_id
                out_dir.mkdir(parents=True, exist_ok=True)
                (out_dir / "audit.json").write_text(
                    json.dumps(response, indent=2, sort_keys=True) + "\n")
                (out_dir / "metadata.json").write_text(
                    json.dumps(metadata, indent=2, sort_keys=True) + "\n")
            else:
                out_dir = self.paths.campaign_dir / "submissions" / job_id
                out_dir.mkdir(parents=True, exist_ok=True)
                static = self._static_check(role, response)
                (out_dir / "note.md").write_text(response["note_markdown"].rstrip() + "\n")
                (out_dir / "response.json").write_text(
                    json.dumps(response, indent=2, sort_keys=True) + "\n")
                (out_dir / "manifest.json").write_text(json.dumps({
                    "schema": schema,
                    "job_id": job_id,
                    "model": self.provider.model,
                    "reasoning_effort": self.provider.reasoning_effort,
                    "response_sha256": hashlib.sha256(
                        json.dumps(response, sort_keys=True).encode()).hexdigest(),
                    "static_check": static,
                    "agent": metadata,
                }, indent=2, sort_keys=True) + "\n")
                if not static["passed"]:
                    raise AgentError(
                        "static submission check failed: " + "; ".join(static["errors"]))
            return job_id, True, None
        except Exception as exc:
            return job_id, False, f"{type(exc).__name__}: {exc}"

    def _finish(self, job_id: str, succeeded: bool, error: str | None) -> None:
        with self.lock, self.connect() as connection:
            row = connection.execute(
                "SELECT attempts,max_attempts,role,dependency FROM campaign_jobs WHERE id=?",
                (job_id,)).fetchone()
            status = "succeeded" if succeeded else (
                "failed" if row["attempts"] >= row["max_attempts"] else "queued")
            if row["role"] == "verifier":
                output_dir = self.paths.campaign_dir / "reviews" / str(row["dependency"]) / job_id
            else:
                output_dir = self.paths.campaign_dir / "submissions" / job_id
            connection.execute(
                "UPDATE campaign_jobs SET status=?,output_dir=?,error=?,finished_at=? WHERE id=?",
                (status, str(output_dir), error, utc_timestamp(), job_id))
        if succeeded and not job_id.startswith("verifier-"):
            self._enqueue_verifier(job_id)

    def export_status(self) -> dict[str, Any]:
        with self.connect() as connection:
            counts = {row["status"]: row["count"] for row in connection.execute(
                "SELECT status,COUNT(*) AS count FROM campaign_jobs GROUP BY status")}
            roles = {row["role"]: row["count"] for row in connection.execute(
                "SELECT role,COUNT(*) AS count FROM campaign_jobs GROUP BY role")}
            rows = [dict(row) for row in connection.execute(
                "SELECT * FROM campaign_jobs ORDER BY id")]
        payload = {
            "campaign_dir": str(self.paths.campaign_dir),
            "model": self.provider.model,
            "reasoning_effort": self.provider.reasoning_effort,
            "dimension": int(self.cfg.get("dimension", 2)),
            "field_regime": str(self.cfg.get("field_regime", "prime")),
            "degree_lower_bound_exclusive": int(
                self.cfg.get("degree_lower_bound_exclusive", 100)),
            "benchmark_exponent": str(self.cfg.get("benchmark_exponent", "1/3")),
            "target_exponent": str(self.cfg.get("target_exponent", "1-o(1)")),
            "researcher_count": int(self.cfg["researcher_count"]),
            "planned_agent_invocations": (
                int(self.cfg["researcher_count"]) *
                ((2 if self.cfg.get("verifier_enabled", True) else 1) +
                 (1 if self.cfg.get("lemma_writer_enabled", True) else 0)) +
                ((2 if self.cfg.get("genius_enabled", True) else 0) +
                 (1 if self.cfg.get("genius_enabled", True) and
                  self.cfg.get("lemma_writer_enabled", True) else 0))),
            "counts": counts,
            "roles": roles,
            "updated_at": utc_timestamp(),
        }
        (self.paths.campaign_dir / "status.json").write_text(
            json.dumps(payload, indent=2, sort_keys=True) + "\n")
        (self.paths.campaign_dir / "jobs.json").write_text(
            json.dumps(rows, indent=2, sort_keys=True) + "\n")
        self._export_leaderboards(rows)
        self._export_dashboard_snapshot(payload, rows)
        return payload

    def _export_leaderboards(self, rows: list[dict[str, Any]]) -> None:
        board_dir = self.paths.campaign_dir / "leaderboards"
        board_dir.mkdir(parents=True, exist_ok=True)
        promising: list[dict[str, Any]] = []
        verified: list[dict[str, Any]] = []
        rejected: list[dict[str, Any]] = []
        bottlenecks: list[dict[str, Any]] = []
        for row in rows:
            if row["role"] not in {"researcher", "genius"} or row["status"] != "succeeded":
                continue
            response_path = self.paths.campaign_dir / "submissions" / row["id"] / "response.json"
            if not response_path.exists():
                continue
            response = json.loads(response_path.read_text())
            audit_path = (self.paths.campaign_dir / "reviews" / row["id"] /
                          f"verifier-{row['id']}" / "audit.json")
            audit = json.loads(audit_path.read_text()) if audit_path.exists() else None
            entry = {
                "job_id": row["id"],
                "role": row["role"],
                "title": response.get("title", "GENIUS synthesis"),
                "result_status": response.get("result_status", "conditional"),
                "dimension": response.get("dimension", 2),
                "field_regime": response.get("field_regime", "prime"),
                "claim_scope": response.get("claim_scope", "bivariate_theorem"),
                "claimed_exponent": response.get("claimed_exponent"),
                "benchmark_improved": response.get("benchmark_improved", False),
                "theorem_statement": response.get("theorem_statement") or response.get("integrated_theorem"),
                "note_path": str(response_path.parent / "note.md"),
                "review_verdict": audit.get("verdict") if audit else "pending",
                "verified_exponent": audit.get("verified_exponent") if audit else None,
            }
            if audit and audit.get("verdict") == "accept":
                verified.append(entry)
            elif audit and audit.get("verdict") == "reject":
                rejected.append(entry)
            else:
                promising.append(entry)
            for stage in response.get("exponent_ledger", []):
                bottlenecks.append({"job_id": row["id"], **stage})
        for name, data in (
            ("promising-results", promising),
            ("verified-results", verified),
            ("rejected-results", rejected),
            ("bottleneck-ledger", bottlenecks),
        ):
            (board_dir / f"{name}.json").write_text(
                json.dumps(data, indent=2, sort_keys=True) + "\n")

    def _export_dashboard_snapshot(
            self, status: dict[str, Any], rows: list[dict[str, Any]]) -> None:
        dashboard_public = self.paths.workspace / "dashboard" / "public"
        if not dashboard_public.is_dir():
            return

        board_dir = self.paths.campaign_dir / "leaderboards"

        def load_board(name: str) -> list[dict[str, Any]]:
            path = board_dir / f"{name}.json"
            return json.loads(path.read_text()) if path.exists() else []

        def enrich(entry: dict[str, Any]) -> dict[str, Any]:
            job_id = str(entry["job_id"])
            submission_dir = self.paths.campaign_dir / "submissions" / job_id
            response_path = submission_dir / "response.json"
            note_path = submission_dir / "note.md"
            response = json.loads(response_path.read_text()) if response_path.exists() else {}
            audit_path = (self.paths.campaign_dir / "reviews" / job_id /
                          f"verifier-{job_id}" / "audit.json")
            audit = json.loads(audit_path.read_text()) if audit_path.exists() else None
            return {
                **entry,
                "parameter_regime": response.get("parameter_regime", ""),
                "sampling_model": response.get("sampling_model", ""),
                "global_conclusion": response.get("global_conclusion", ""),
                "proof_steps": response.get("proof_steps", []),
                "exponent_ledger": response.get("exponent_ledger", []),
                "limitations": response.get("limitations", response.get("obstructions", [])),
                "note_markdown": note_path.read_text() if note_path.exists() else "",
                "audit": audit,
            }

        candidate_groups = {
            "verified": [enrich(entry) for entry in load_board("verified-results")],
            "promising": [enrich(entry) for entry in load_board("promising-results")],
            "rejected": [enrich(entry) for entry in load_board("rejected-results")],
        }
        dashboard_jobs = [{
            "id": row["id"],
            "role": row["role"],
            "ordinal": row["ordinal"],
            "direction": row["direction"],
            "status": row["status"],
            "attempts": row["attempts"],
            "max_attempts": row["max_attempts"],
            "started_at": row["started_at"],
            "finished_at": row["finished_at"],
            "error": row["error"],
        } for row in rows]
        snapshot = {
            "schema": "line-point-research-dashboard-v1",
            "campaign": self.paths.campaign_dir.name,
            "status": status,
            "candidates": candidate_groups,
            "bottlenecks": load_board("bottleneck-ledger"),
            "jobs": dashboard_jobs,
        }
        update_dashboard_sections(self.paths.workspace, snapshot, replace_base=True)

    def run(self) -> dict[str, Any]:
        self.initialize()
        stop_file = self.paths.campaign_dir / "STOP"
        while not stop_file.exists():
            ready = self._ready(self.max_workers)
            if not ready:
                status = self.export_status()
                if status["counts"].get("queued", 0) == 0 and status["counts"].get("running", 0) == 0:
                    (self.paths.campaign_dir / "COMPLETED").write_text(utc_timestamp() + "\n")
                    return status
                time.sleep(min(self.retry_seconds, 30))
                continue
            claimed = [row for row in ready if self._claim(row["id"])]
            batch_failed = False
            with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
                futures = [executor.submit(self._run_job, row) for row in claimed]
                for future in as_completed(futures):
                    job_id, succeeded, error = future.result()
                    batch_failed = batch_failed or not succeeded
                    self._finish(job_id, succeeded, error)
                    self.export_status()
            if batch_failed:
                time.sleep(self.retry_seconds)
        return self.export_status()


def launch_campaign(config_path: Path | str) -> dict[str, Any]:
    _, paths = load_campaign_config(config_path)
    paths.campaign_dir.mkdir(parents=True, exist_ok=True)
    pid_path = paths.campaign_dir / "runner.json"
    if pid_path.exists():
        old = json.loads(pid_path.read_text())
        try:
            os.kill(int(old["pid"]), 0)
            return {"status": "already_running", **old}
        except (OSError, KeyError, ValueError):
            pass
    log_path = paths.campaign_dir / "campaign.log"
    log_handle = log_path.open("a")
    environment = os.environ.copy()
    source_path = str(paths.workspace / "src")
    environment["PYTHONPATH"] = (
        source_path + os.pathsep + environment["PYTHONPATH"]
        if environment.get("PYTHONPATH") else source_path)
    environment["PYTHONPYCACHEPREFIX"] = str(paths.campaign_dir / "python-cache")
    process = subprocess.Popen(
        [sys.executable, "-m", "line_point_research", "campaign-run",
         str(Path(config_path).resolve())],
        cwd=paths.workspace,
        stdout=log_handle,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True,
        env=environment,
    )
    log_handle.close()
    payload = {
        "status": "launched",
        "pid": process.pid,
        "config": str(Path(config_path).resolve()),
        "log": str(log_path),
        "started_at": utc_timestamp(),
    }
    pid_path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n")
    return payload


def campaign_status(config_path: Path | str) -> dict[str, Any]:
    campaign = ResearchCampaign(config_path)
    if not campaign.db_path.exists():
        campaign.initialize()
    return campaign.export_status()

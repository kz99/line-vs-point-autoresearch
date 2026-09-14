# Line-vs-Point Autoresearch

This repository is a durable proof-author, adversary, verifier, and synthesis loop for improving the soundness threshold of the affine line-versus-point low-degree test in the affine plane over a prime field.

The current primary benchmark is Kominers--Thaler--Zheng's cubic threshold: local agreement

\[
\varepsilon \ge C(d/p)^{1/3}
\]

forces agreement \(\Omega(\varepsilon)\) with one bivariate total-degree-\(d\) polynomial over \(\mathbb F_p\). The long-term target is a theorem at threshold \((d/p)^{1-o(1)}\). The research problem is fixed throughout at \(m=2\) and prime \(p\); the standard lift from the bivariate theorem to general dimension is downstream and is not a campaign objective.

This project deliberately does **not** rank finite experiments as mathematical progress. Small-field computation may falsify a lemma, expose a characteristic-dependent failure, or test an exponent ledger. Only an asymptotic theorem with a complete academic note and an independent line-by-line audit can enter the verified leaderboard.

## Quick start

The initialized 10-researcher test campaign is the recommended first run:

```bash
line-point-research campaign-status configs/campaign-10-ultra.yaml
line-point-research campaign-launch configs/campaign-10-ultra.yaml
```

Initialization and status inspection do not invoke agents. `campaign-launch` is the explicit start command. The test campaign plans 10 proof researchers, up to 10 corresponding verifiers, one `GENIUS` synthesis, and one synthesis verifier (up to 22 agent invocations). Every role is hard-locked to `gpt-5.6-sol` at its highest supported reasoning level, `ultra`; campaign loading fails if the reasoning level is lowered.

The separate 300-researcher production campaign remains available:

```bash
python -m pip install -e .
python -m unittest discover -s tests -v
line-point-research campaign-init configs/campaign-300-ultra.yaml
line-point-research campaign-status configs/campaign-300-ultra.yaml
line-point-research campaign-launch configs/campaign-300-ultra.yaml
```

The production campaign queues 300 independent proof researchers, one verifier per successful submission, a global `GENIUS` synthesis job, and a verifier for the synthesis. Four workers run concurrently. Every job is durable and resumable through SQLite. The two campaign directories are independent, so testing cannot consume or alter the production queue.

Results live under `research_state/campaign-10-ultra/` for the test or `research_state/campaign-300-ultra/` for production:

- `submissions/`: academic notes and structured theorem manifests;
- `reviews/`: hostile line-by-line proof audits;
- `agent_logs/`: exact prompts, schemas, responses, and stderr;
- `leaderboards/`: promising, verified, and rejected claims plus a bottleneck ledger;
- `campaign.sqlite3`: the durable job queue.

Read [TARGET.md](TARGET.md) before interpreting any claimed exponent, and [references/LITERATURE.md](references/LITERATURE.md) before launching agents.

## Safety and proof policy

An exponent is not a theorem merely because algebraic manipulations produce it. Every submission must identify:

1. the precise line and point sampling distribution;
2. that the field is the prime field \(\mathbb F_p\) and \(0\le d<p\);
3. the domains and dependencies of \(d,p,\varepsilon\), with \(m=2\) fixed;
4. the exact global conclusion and its agreement loss;
5. every use of interpolation, factorization, list decoding, plurality, and conversion to one global polynomial;
6. all small-characteristic and inseparability cases;
7. a multiplicative exponent ledger from hypothesis to conclusion.

The verifier must reject a false theorem or construction, request revision for a repairable gap, and accept only the exact SHA-identified claim it audited.

Arguments about \(m\ne2\), extension fields, or dimension bootstrapping are out of scope for scoring. General-dimensional bootstrapping is standard once the bivariate theorem is available; it is mentioned only to identify the downstream consequence.

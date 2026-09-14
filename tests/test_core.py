import json
import tempfile
import unittest
from pathlib import Path

from line_point_research.agents import CommandAgentProvider
from line_point_research.campaign import ResearchCampaign
from line_point_research.exponents import is_stronger_fixed_exponent, parse_rational_exponent
from line_point_research.lemma_book import (
    LEMMA_STATEMENT_RULE,
    canonical_sha256,
    validate_editorial_response,
)


class ExponentTests(unittest.TestCase):
    def test_larger_exponent_is_stronger(self):
        self.assertTrue(is_stronger_fixed_exponent("2/5", "1/3"))
        self.assertFalse(is_stronger_fixed_exponent("1/7", "1/3"))
        self.assertEqual(str(parse_rational_exponent("1/3")), "1/3")


class ProviderTests(unittest.TestCase):
    def test_provider_pins_model_and_ultra_reasoning(self):
        with tempfile.TemporaryDirectory() as directory:
            provider = CommandAgentProvider(
                ".", Path(directory) / "agent-logs", model="gpt-5.6-sol",
                reasoning_effort="ultra", disable_nested_agents=True)
            command = provider.command(Path("schema.json"), Path("output.json"))
            self.assertIn("gpt-5.6-sol", command)
            self.assertIn('model_reasoning_effort="ultra"', command)
            self.assertEqual(command[command.index("--disable") + 1], "multi_agent")


class CampaignTests(unittest.TestCase):
    def test_campaign_initializes_10_researcher_trial(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = root / "campaign.yaml"
            config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 10
  dimension: 2
  field_regime: prime
  verifier_enabled: true
  genius_enabled: true
  model: gpt-5.6-sol
  reasoning_effort: ultra
""")
            campaign = ResearchCampaign(config)
            campaign.initialize()
            status = campaign.export_status()
            self.assertEqual(status["roles"]["researcher"], 10)
            self.assertEqual(status["roles"]["genius"], 1)
            self.assertEqual(status["counts"]["queued"], 11)
            self.assertEqual(status["planned_agent_invocations"], 33)
            self.assertEqual(status["degree_lower_bound_exclusive"], 100)

    def test_campaign_exports_dashboard_snapshot_when_present(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "dashboard" / "public").mkdir(parents=True)
            config = root / "campaign.yaml"
            config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 10
  dimension: 2
  field_regime: prime
  verifier_enabled: true
  genius_enabled: true
  model: gpt-5.6-sol
  reasoning_effort: ultra
""")
            campaign = ResearchCampaign(config)
            campaign.initialize()
            snapshot = json.loads(
                (root / "dashboard" / "public" / "research-data.json").read_text())
            self.assertEqual(snapshot["campaign"], "state")
            self.assertEqual(len(snapshot["jobs"]), 11)
            self.assertEqual(snapshot["status"]["counts"]["queued"], 11)
            self.assertEqual(snapshot["candidates"]["verified"], [])

    def test_campaign_initializes_300_researchers_and_genius(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = root / "campaign.yaml"
            config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 300
  dimension: 2
  field_regime: prime
  verifier_enabled: true
  genius_enabled: true
  model: gpt-5.6-sol
  reasoning_effort: ultra
  benchmark_exponent: "1/3"
  target_exponent: "1-o(1)"
""")
            campaign = ResearchCampaign(config)
            campaign.initialize()
            status = campaign.export_status()
            self.assertEqual(status["roles"]["researcher"], 300)
            self.assertEqual(status["roles"]["genius"], 1)
            self.assertEqual(status["planned_agent_invocations"], 903)
            self.assertEqual(status["benchmark_exponent"], "1/3")
            self.assertEqual(status["target_exponent"], "1-o(1)")
            self.assertEqual(status["dimension"], 2)
            self.assertEqual(status["field_regime"], "prime")
            boards = root / "state" / "leaderboards"
            self.assertTrue((boards / "promising-results.json").exists())
            self.assertEqual(json.loads((boards / "bottleneck-ledger.json").read_text()), [])

    def test_prompts_enforce_asymptotic_proof_policy(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = root / "campaign.yaml"
            config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 300
  dimension: 2
  field_regime: prime
  verifier_enabled: true
  genius_enabled: true
  model: gpt-5.6-sol
  reasoning_effort: ultra
""")
            campaign = ResearchCampaign(config)
            prompt = campaign._research_prompt({"id": "researcher-0001", "ordinal": 1,
                                                "direction": "test"})
            self.assertIn("m=2 over the prime field F_p", prompt)
            self.assertIn("C(d/p)^(1/3)", prompt)
            self.assertIn("(d/p)^(1-o(1))", prompt)
            self.assertIn("100 < d < p", prompt)
            self.assertIn("Do not analyze them", prompt)
            self.assertIn("Ignore every directory named\nsuperseded", prompt)
            self.assertIn("Do not work on m>2", prompt)
            self.assertIn("routine downstream corollary", prompt)
            self.assertIn("cannot prove an asymptotic", prompt)
            self.assertIn("A lemma statement contains only its", prompt)

    def test_lemma_writer_rule_and_split_coverage(self):
        source = {
            "proof_steps": [
                {
                    "id": "P1",
                    "statement": "A compound statement.",
                    "proof": "A proof.",
                    "status": "proved",
                    "dependencies": [],
                }
            ]
        }
        response = {
            "source_job_id": "researcher-0001",
            "source_response_sha256": canonical_sha256(source),
            "coverage_complete": True,
            "omitted_source_step_ids": [],
            "lemmas": [
                {
                    "id": "researcher-0001:P1.1",
                    "source_step_id": "P1",
                    "part": 1,
                    "title": "First part",
                    "statement_markdown": "If $x=0$, then $x^2=0$.",
                    "proof_markdown": "This is immediate.",
                    "status": "proved",
                    "dependencies": [],
                },
                {
                    "id": "researcher-0001:P1.2",
                    "source_step_id": "P1",
                    "part": 2,
                    "title": "Second part",
                    "statement_markdown": "If $x^2=0$ in a field, then $x=0$.",
                    "proof_markdown": "Fields have no nonzero nilpotents.",
                    "status": "proved",
                    "dependencies": [],
                },
            ],
        }
        self.assertEqual(validate_editorial_response(
            "researcher-0001", source, response), [])
        self.assertIn("no motivation", LEMMA_STATEMENT_RULE)

    def test_lemma_writer_rejects_omission_and_status_change(self):
        source = {
            "proof_steps": [
                {"id": "P1", "status": "proved"},
                {"id": "P2", "status": "conditional"},
            ]
        }
        response = {
            "source_job_id": "researcher-0001",
            "source_response_sha256": canonical_sha256(source),
            "coverage_complete": True,
            "omitted_source_step_ids": [],
            "lemmas": [{
                "id": "researcher-0001:P1.1",
                "source_step_id": "P1",
                "part": 1,
                "statement_markdown": "A statement.",
                "proof_markdown": "A proof.",
                "status": "conditional",
            }],
        }
        errors = validate_editorial_response("researcher-0001", source, response)
        self.assertTrue(any("status changed" in error for error in errors))
        self.assertTrue(any("P2" in error for error in errors))

    def test_campaign_rejects_other_dimensions_and_field_regimes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            dimension_config = root / "dimension.yaml"
            dimension_config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 300
  dimension: 3
  field_regime: prime_power
  reasoning_effort: ultra
""")
            with self.assertRaisesRegex(ValueError, "dimension must be exactly 2"):
                ResearchCampaign(dimension_config)

            field_config = root / "field.yaml"
            field_config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 300
  dimension: 2
  field_regime: prime_power
  reasoning_effort: ultra
""")
            with self.assertRaisesRegex(ValueError, "field_regime must be prime"):
                ResearchCampaign(field_config)

    def test_campaign_rejects_less_than_ultra_reasoning(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = root / "campaign.yaml"
            config.write_text("""workspace: .
corpus_root: ./corpus
campaign_dir: ./state
campaign:
  researcher_count: 10
  dimension: 2
  field_regime: prime
  reasoning_effort: max
""")
            with self.assertRaisesRegex(ValueError, "reasoning_effort must be ultra"):
                ResearchCampaign(config)


if __name__ == "__main__":
    unittest.main()

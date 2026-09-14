import json
import tempfile
import unittest
from pathlib import Path

from line_point_research.agents import CommandAgentProvider
from line_point_research.campaign import ResearchCampaign
from line_point_research.exponents import is_stronger_fixed_exponent, parse_rational_exponent


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
            self.assertEqual(status["planned_agent_invocations"], 602)
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
            self.assertIn("Do not work on m>2", prompt)
            self.assertIn("routine downstream corollary", prompt)
            self.assertIn("cannot prove an asymptotic", prompt)

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


if __name__ == "__main__":
    unittest.main()

"""Signal taxonomy for agentic-behavior research analysis.

Each axis holds named signals. A signal fires when any of its patterns is seen
in dependency manifests, file paths, or source text. Weights are the points a
signal contributes to its axis score (axis scores are normalized to 0-100).

Edit this file to teach the analyzer about a new framework or practice: nothing
else needs to change.
"""

import re

# --- axes ---------------------------------------------------------------

AXES = {
    "abm": "Agent-based simulation",
    "synth": "Synthetic data generation",
    "llm_behavior": "LLM-based behavioral modeling",
    "rl": "Reinforcement learning / policy search",
    "eval": "Evaluation & validation rigor",
    "bleed": "Context isolation",
}

# --- signals ------------------------------------------------------------
# kind: "dep"  -> matched against declared dependencies (name only)
#       "path" -> matched against repository file paths
#       "text" -> matched against source/prose content
SIGNALS = [
    # agent-based simulation
    ("abm", "mesa", "dep", r"^mesa$", 12, "Mesa agent-based modeling framework"),
    ("abm", "agentpy", "dep", r"^agentpy$", 12, "AgentPy ABM framework"),
    ("abm", "pettingzoo", "dep", r"^pettingzoo$", 10, "PettingZoo multi-agent environments"),
    ("abm", "netlogo", "text", r"\bnetlogo\b", 10, "NetLogo model referenced"),
    ("abm", "repast", "text", r"\brepast\b", 10, "Repast ABM toolkit referenced"),
    ("abm", "gama", "text", r"\bGAMA platform\b", 8, "GAMA simulation platform"),
    ("abm", "simpy", "dep", r"^simpy$", 8, "SimPy discrete-event simulation"),
    ("abm", "agent_class", "text", r"(class|struct)\s+\w*Agent\w*\s*[\({:<]", 8, "Agent class defined in source"),
    ("abm", "step_loop", "text", r"(def|function|fn)\s+(step|tick|advance|update)\s*\(|"
                                 r"(const|let|var)\s+(step|tick|update)\s*=\s*(\(|function|async)", 6,
     "Simulation step/tick loop"),
    ("abm", "agent_population", "text", r"\b(agents|population|households|individuals|members|"
                                        r"families|residents|persons|people|citizens|vehicles|"
                                        r"actors|entities|pedestrians)\s*"
                                        r"(=\s*\[|\.push\(|\.forEach\(|\.map\(|\.filter\()", 6,
     "A population of agents held and iterated"),
    ("abm", "sim_builder", "text", r"\b(build|init|create|run|make|setup)\w*"
                                   r"(Simulation|Sim|Model|World|Scenario|Population)\s*\(", 8,
     "Simulation constructor"),
    ("abm", "tick_time", "text", r"\b(ticks?|timesteps?|time[_ ]steps?|epochs?)\b", 6,
     "Discrete simulation time"),
    ("abm", "heterogeneous_agents", "text", r"\b(elder|child|senior|adult|youth|female|male|"
                                            r"pregnant|disabled|unaccompanied|elderly|infant)\w*"
                                            r"(Pct|Percent|Share|Ratio|Frac|Prop)", 8,
     "Agents differentiated by demographic mix"),
    ("abm", "scheduler", "text", r"\b(RandomActivation|SimultaneousActivation|StagedActivation)\b", 8, "ABM scheduler"),
    ("abm", "grid_space", "text", r"\b(MultiGrid|SingleGrid|ContinuousSpace|NetworkGrid)\b", 6, "Spatial environment"),
    ("abm", "mas_terms", "text", r"\b(multi-?agent system|emergent behaviou?r|agent interaction)\b", 5, "Multi-agent framing in prose"),

    # synthetic data
    ("synth", "sdv", "dep", r"^sdv$", 12, "SDV synthetic data vault"),
    ("synth", "ctgan", "dep", r"^(ctgan|sdmetrics|copulas)$", 10, "Tabular synthesis (CTGAN family)"),
    ("synth", "synthcity", "dep", r"^synthcity$", 10, "synthcity generative library"),
    ("synth", "faker", "dep", r"^(faker|mimesis)$", 8, "Faker/Mimesis record fabrication"),
    ("synth", "gretel", "text", r"\bgretel\b", 8, "Gretel synthetic data platform"),
    ("synth", "population_synth", "text", r"\b(population synthesis|synthetic population|iterative proportional fitting|\bIPF\b)\b", 12, "Explicit population synthesis"),
    ("synth", "census_source", "text", r"\b(census|IPUMS|microdata|PUMS|household survey|DHS)\b", 8, "Real microdata used as a seed"),
    ("synth", "privacy", "text", r"\b(differential privacy|k-anonymity|epsilon budget|re-?identification)\b", 10, "Privacy protection of synthetic output"),
    ("synth", "sampling", "text", r"\b(stratified sampl|rejection sampl|importance sampl|bootstrap resampl)", 6, "Sampling machinery"),
    ("synth", "scale", "text", r"\b(at scale|batch generat|\d{4,}\s+(agents|personas|records|individuals))\b", 6, "Generation at population scale"),

    # LLM-based behavioral modeling
    ("llm_behavior", "anthropic", "dep", r"^anthropic$", 10, "Anthropic SDK"),
    ("llm_behavior", "openai", "dep", r"^openai$", 8, "OpenAI SDK"),
    ("llm_behavior", "orchestration", "dep", r"^(langchain|langgraph|autogen|pyautogen|crewai|llama-index|llama_index|dspy|dspy-ai)$", 10, "LLM agent orchestration framework"),
    ("llm_behavior", "local_models", "dep", r"^(transformers|vllm|ollama|llama-cpp-python)$", 8, "Local/self-hosted model runtime"),
    ("llm_behavior", "persona", "text", r"\b(persona|backstory|character sheet|agent profile|system prompt)\b", 10, "Persona/profile conditioning"),
    ("llm_behavior", "generative_agents", "text", r"\b(generative agents?|memory stream|reflection module|believable agents?)\b", 12, "Generative-agents architecture"),
    ("llm_behavior", "silicon_sample", "text", r"\b(silicon sampl|LLM (respondents?|participants?|subjects?)|simulated (survey|respondents?))\b", 12, "LLMs standing in for human respondents"),
    ("llm_behavior", "prompt_assets", "path", r"(^|/)(prompts?|personas?|characters?)/", 8, "Prompt/persona asset directory"),
    ("llm_behavior", "tool_use", "text", r"\b(tool[_ ]use|function calling|tool_choice|tools=\[)", 6, "Tool-using agents"),
    ("llm_behavior", "memory", "text", r"\b(vector ?store|embedding|retrieval|episodic memory)\b", 5, "Memory/retrieval layer"),

    # reinforcement learning
    ("rl", "gym", "dep", r"^(gym|gymnasium)$", 10, "Gym/Gymnasium environments"),
    ("rl", "sb3", "dep", r"^(stable-baselines3|sb3-contrib)$", 12, "Stable-Baselines3 agents"),
    ("rl", "rllib", "dep", r"^(ray|rllib)$", 10, "Ray RLlib"),
    ("rl", "torchrl", "dep", r"^(torchrl|tianshou|cleanrl|acme|dopamine-rl)$", 10, "RL research library"),
    ("rl", "algorithms", "text", r"\b(PPO|DQN|SAC|TD3|A2C|A3C|Q-learning|policy gradient|actor-critic)\b", 10, "Named RL algorithm"),
    ("rl", "reward", "text", r"\b(reward (function|shaping|signal)|def\s+reward|return_|discount factor|gamma\s*=)", 8, "Reward machinery"),
    ("rl", "rlhf", "text", r"\b(RLHF|DPO|preference model|reward model|constitutional AI)\b", 10, "Preference-based alignment training"),
    ("rl", "env_api", "text", r"def\s+(reset|step)\s*\(self", 6, "Environment reset/step API"),

    # evaluation & validation
    ("eval", "tests", "path", r"(^|/)(tests?|spec)/", 8, "Test suite present"),
    ("eval", "notebooks", "path", r"\.ipynb$", 5, "Analysis notebooks"),
    ("eval", "metrics", "text", r"\b(KS test|Kolmogorov|Wasserstein|Jensen-Shannon|TSTR|fidelity|calibration|coverage)\b", 10, "Distributional fidelity metrics"),
    ("eval", "validation", "text", r"\b(face validity|sensitivity analysis|ablation|held-?out|ground truth|baseline comparison)\b", 10, "Validation practice"),
    ("eval", "seeds", "text", r"\b(random_state|set_seed|np\.random\.seed|"
                              r"mulberry32|xorshift|seedrandom|\bPRNG\b)\b|"
                              r"seed\s*[=:]\s*[\w\d]", 8, "Seeded, reproducible runs"),
    ("eval", "sweeps", "text", r"\b(wandb|mlflow|hydra|optuna|parameter sweep|grid search)\b", 8, "Experiment tracking / sweeps"),
    ("eval", "bias", "text", r"\b(bias audit|fairness|demographic parity|disparate impact|representativeness)\b", 10, "Fairness/representativeness checking"),
    ("eval", "docs", "path", r"(^|/)(docs?|paper|report)/", 5, "Documentation or write-up"),

    # context isolation
    #
    # Context bleeding is information reaching a place the study assumes it
    # cannot: one agent seeing another's private brief, a run inheriting the
    # last one's memory, a model answering out of its own training rather than
    # its persona, an evaluation item sitting in the prompt that is meant to
    # test it.
    #
    # Like every other axis this one detects the *guards*, not the hazard, so
    # a high score reads the same way here as it does everywhere else: this
    # repository has the vocabulary of keeping contexts apart. Silence is not
    # evidence of leakage, only of a boundary nobody wrote down.
    ("bleed", "private_state", "text", r"\b(private[_ ]?(instructions?|strategy|state|brief|goals?|info(rmation)?)|"
                                       r"privileged[_ ]instructions?|hidden[_ ]state|secret[_ ]goals?|"
                                       r"confidential[_ ]brief|\bBATNA\b|red[_ ]lines?)\b", 12,
     "Per-agent private state the other agents are not given"),
    ("bleed", "visibility_rules", "text", r"\b(partial(ly)? observab|observability|information set|fog of war|"
                                          r"visible[_ ]to|disclosure|need-to-know|caucus|sidebar|"
                                          r"who can see|not shared with)\b", 10,
     "Explicit rules for what each agent may see"),
    ("bleed", "context_scoping", "text", r"\b(per-?agent (context|memory|state|history)|scoped (context|memory)|"
                                         r"isolat(e|ed|ion)|sandbox(ed|ing)?|namespaced?|"
                                         r"separate (context|conversation|session)s?)\b", 10,
     "Context scoped or isolated per agent"),
    ("bleed", "fresh_context", "text", r"\b(fresh (context|session|conversation|client)|new (session|conversation) per|"
                                       r"stateless|reset[_ ]?(state|context|memory|between)|clear[_ ]?(history|memory|cache)|"
                                       r"no[_ ]?cache|cache[_ ]?bust)\b", 8,
     "State cleared between runs rather than carried over"),
    ("bleed", "independent_runs", "text", r"\b(independent (runs?|replicat|trials?|samples?)|"
                                          r"monte[_ ]?carlo|replications?|per-?run seed|"
                                          r"repeated (trials?|runs?) )\b", 8,
     "Runs treated as independent replications"),
    ("bleed", "in_character", "text", r"\b(stay in character|out[- ]of[- ]character|break(ing)? character|"
                                      r"in-?character|role fidelity|persona (adherence|drift)|"
                                      r"do not use (your|outside|prior) knowledge)\b", 10,
     "Guards against the model answering as itself rather than the persona"),
    ("bleed", "knowledge_cutoff", "text", r"\b(knowledge cutoff|training cutoff|anachronis(m|tic)|"
                                          r"closed[- ]book|grounded only in|as of (the )?scenario date)\b", 8,
     "Guards against the model's own training reaching the scenario"),
    ("bleed", "contamination", "text", r"\b(contaminat(ion|ed)|decontaminat|data leakage|"
                                       r"train[- ](test|eval) (leak|overlap)|n-?gram overlap|canary (string|token))\b", 12,
     "Explicit contamination or leakage checking"),
    ("bleed", "blind_eval", "text", r"\b(blind(ed)? (evaluation|judge|review|scoring)|"
                                    r"judge does not see|without seeing|held out from the prompt|"
                                    r"no few-?shot from)\b", 10,
     "Evaluation kept blind to what it is judging"),
    ("bleed", "leak_test", "path", r"(^|/)(tests?|spec)/.*\b(isolat|leak|contaminat|privacy|visibility)\w*\.",
     8, "A test that exercises the boundary itself"),
]

# Demographic / stratification attributes the analyzer looks for, so a reader
# can see which population dimensions a repo actually models.
DEMOGRAPHIC_TERMS = [
    "age", "age_group", "cohort", "gender", "sex", "race", "ethnicity",
    "income", "wealth", "education", "occupation", "employment", "household",
    "region", "geography", "urban", "rural", "religion", "literacy",
    "political", "party", "ideology", "marital", "disability", "migration",
    "nationality", "caste", "social class", "mother tongue", "citizenship",
    "elderly", "child", "pregnant", "family size", "mobility", "vulnerability",
    "displacement", "refugee", "disabled",
]

# Model identifiers, so version drift between studies is visible.
MODEL_PATTERNS = [
    r"claude-[a-z0-9.\-]+",
    r"gpt-[0-9a-z.\-]+",
    r"\bo[1-4]-(?:mini|preview|pro)\b",
    r"gemini-[0-9a-z.\-]+",
    r"llama-?[0-9][0-9a-z.\-]*",
    r"mistral-[a-z0-9.\-]+",
    r"qwen[0-9a-z.\-]*",
    r"deepseek-[a-z0-9.\-]+",
]

MODEL_RE = re.compile("|".join(f"({p})" for p in MODEL_PATTERNS), re.I)

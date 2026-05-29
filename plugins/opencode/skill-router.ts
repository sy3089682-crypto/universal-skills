import type { Plugin, Config } from "@opencode-ai/plugin";

export default (async () => {
  return {
    config: async (cfg: Config) => {
      const existing = cfg.command ?? {};
      if (!("skills" in existing)) {
        cfg.command = {
          ...existing,
          skills: {
            description: "Load the right skill for the current task. Usage: /skills <task description>",
            template: "Scan <available_skills> and load any skill matching this task: $ARGUMENTS",
          },
          "list-skills": {
            description: "List all available skills with their descriptions",
            prompt: "List all available skills from <available_skills> with their names and descriptions. Format as a compact table.",
          },
        };
      }
    },
    "experimental.chat.system.transform": async (_input, output) => {
      output.system.push(`## Universal Skills — Auto-Loader

You have a library of specialized skills (<available_skills> above).
Each skill's \`description\` tells you when to use it.

### Rule: Auto-load skills before every task

Before starting ANY work:

1. **Scan** <available_skills> and match descriptions against the user's request
2. **Load** every matching skill via the \`skill\` tool
3. **Proceed** only after loading

### Example skill-to-task mappings:
| When user asks about... | Load these skills |
|---|---|
| deploy, production, docker | devops/*, deployment-reliability-engineer |
| auth, login, security | security/*, authentication-authorization |
| UI, component, design, CSS | frontend/*, accessibility-wcag |
| tests, testing, coverage | testing/* |
| slow, performance, optimize | performance/*, database-query-optimization |
| Stripe, payment, billing | payment/* |
| database, query, schema | database-schema-optimization, backend/* |
| API, endpoint, REST, GraphQL | api-design-rest-graphql, backend/* |
| architecture, patterns, refactor | architecture/* |
| memory, vector, RAG, LLM | ai-ml/*, vector-database-search |
| mobile, iOS, Android, React Native | mobile/* |
| migration, upgrade, breaking change | migration-strategies, architecture/* |

### Multiple skills per task
Load ALL relevant skills. If a task touches 3 domains, load 3 skill sets.

### No match?
Proceed normally. Skills assist — they don't block.

This rule applies to ALL agents, tools, and modes.`);
    },
  };
}) satisfies Plugin;

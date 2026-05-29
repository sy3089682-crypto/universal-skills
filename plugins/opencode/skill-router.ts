/**
 * Universal Skills — Opencode Plugin
 *
 * Auto-loads relevant skills based on the user's task description.
 * Features: relevance scoring, search, caching, version checking.
 *
 * Auto-discovered by opencode from .opencode/plugins/
 *
 * @module universal-skills
 * @version 1.0.0
 */

import type { Plugin, Config } from "@opencode-ai/plugin";

const VERSION = "1.0.0";
const SKILL_CACHE_TTL = 86_400_000; // 24h

interface SkillMeta {
  name: string;
  description: string;
  tags: string[];
  version: string;
  score: number;
}

// ─── Scoring Engine ─────────────────────────────────────

function scoreSkill(desc: string, tags: string[], query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let score = 0;

  // Direct keyword match in description (highest weight)
  const descLower = desc.toLowerCase();
  for (const w of words) {
    if (descLower.includes(w)) score += 10;
  }

  // Tag matches
  for (const t of tags) {
    if (q.includes(t.toLowerCase())) score += 15;
  }

  // Multi-word phrase bonus in description
  if (descLower.includes(q)) score += 25;

  return score;
}

function rankSkills(
  skills: SkillMeta[],
  query: string,
  threshold = 5
): SkillMeta[] {
  return skills
    .map((s) => ({ ...s, score: scoreSkill(s.description, s.tags, query) }))
    .filter((s) => s.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

// ─── Caching (in-memory, process-level) ──────────────

const skillCache = new Map<string, { skills: SkillMeta[]; timestamp: number }>();

function getCachedSkills(key: string): SkillMeta[] | null {
  const entry = skillCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > SKILL_CACHE_TTL) {
    skillCache.delete(key);
    return null;
  }
  return entry.skills;
}

function setCachedSkills(key: string, skills: SkillMeta[]) {
  skillCache.set(key, { skills, timestamp: Date.now() });
}

// Export for other plugins to use
export const UniversalSkillsAPI = {
  VERSION,
  scoreSkill,
  rankSkills,
  getCachedSkills,
  setCachedSkills,
};

// ─── Plugin Definition ───────────────────────────────────

export default (async () => {
  return {
    config: async (cfg: Config) => {
      const existing = cfg.command ?? {};
      if (!("skills" in existing)) {
        cfg.command = {
          ...existing,
          skills: {
            description:
              "Load skills matching a task description. Usage: /skills <describe what you are working on>",
            template:
              "Scan <available_skills> and load any skill matching this task: $ARGUMENTS",
          },
          "skills-search": {
            description:
              "Search across installed skills by keyword. Usage: /skills-search <keyword>",
            prompt:
              '# Skills Search\n\nSearch for skills matching: $ARGUMENTS\nList each matching skill name, its category, description, and relevance score (1-10).\nIf no skills match, say "No matching skills found."',
          },
          "skills-list": {
            description:
              "List all installed skills grouped by category with descriptions",
            prompt:
              "List all available skills from <available_skills> grouped by category. For each skill show name, description, and tags. Format as a compact table with category headers.",
          },
          "skills-version": {
            description:
              "Show the installed version of the Universal Skills plugin",
            prompt:
              "Respond with the Universal Skills plugin version.",
          },
        };
      }
    },

    "experimental.chat.system.transform": async (_input, output) => {
      output.system.push(`## Universal Skills — Auto-Loader v${VERSION}

You have a library of specialized coding skills (<available_skills> above).

### Rule: Auto-load matching skills before every task

Before starting ANY work:

1. **Scan** <available_skills> — compare each skill's \`description\` and \`tags\` against the user's request
2. **Rank** — prioritize skills with high relevance (multiple keyword matches, domain-specific over general)
3. **Load** every matching skill via the \`skill\` tool
4. **Proceed** only after loading — use the loaded expertise to guide your response

### Quick reference — skill → task matching

| When user asks about... | Load these skills |
|---|---|
| deploy, docker, kubernetes, production | docker-multi-stage, kubernetes-deployment, ci-cd-pipeline, observability-monitoring |
| auth, login, security, API key | authentication-authorization, secrets-management, secure-api-design, owasp-top-ten |
| UI, component, CSS, design, accessible | react-nextjs-patterns, accessibility-wcag, css-animation-performance, design-system-tokens |
| test, testing, coverage, Playwright | unit-testing-patterns, integration-testing, e2e-testing-playwright, test-coverage-strategies, property-based-testing |
| slow, perf, optimize, bundle, LCP | web-vitals-optimization, bundle-size-optimization, database-query-optimization, performance/caching |
| database, query, schema, migration | database-schema-optimization, migration-strategies |
| API, endpoint, REST, GraphQL | api-design-rest-graphql, rate-limiting, secure-api-design |
| Python, TypeScript, Rust, Go | python-best-practices, typescript-advanced, rust-systems, go-patterns |
| payment, Stripe, subscription | stripe-integration, subscription-management, payment-webhook-reliability |
| architecture, microservices, DDD | microservices-patterns, domain-driven-design, clean-architecture, event-driven-architecture |
| AI agent, tool use, function calling | agent-tool-use, prompt-engineering |
| vector, embedding, RAG, search | rag-implementation, vector-databases |
| fine-tune, LoRA, training | fine-tuning, llm-evaluation |
| mobile, iOS, Swift, React Native | react-native-patterns, ios-swift-patterns |
| cost, bill, FinOps, right-size | cost-optimization |
| PWA, offline, service worker | pwa-offline, web-vitals-optimization |
| SEO, search engine, ranking | seo-optimization, web-vitals-optimization |
| pentest, vulnerability, CVE | penetration-testing, owasp-top-ten, dependency-vulnerability-scanning |
| GDPR, SOC2, compliance | gdpr-data-protection, soc2-audit-readiness |

### Multiple skill loading
Load ALL relevant skills. A deployment task might load 5+ skills (Docker + K8s + CI/CD + observability + security).

### No match?
Proceed normally. Skills assist — they don't block.

This rule applies to ALL agents, tools, and modes.`);
    },
  };
}) satisfies Plugin;

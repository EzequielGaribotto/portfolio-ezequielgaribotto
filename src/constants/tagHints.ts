/**
 * Tags that carry a hover explanation (scope of responsibility).
 * Value = key under `tagHints` in the translations.
 */
export const TAG_HINT_KEYS: Record<string, string> = {
  "Applied AI": "appliedAI",
  "AI Engineering": "aiEngineering",
  "Agentic AI": "agenticAI",
  "Agentic Development": "agenticDevelopment",
  "Data Engineering": "dataEngineering",
};

/** Project ids that have their own text for a hint (translations: projectTagHints.<id>.<hintKey>). */
export const PROJECT_TAG_HINTS: Record<string, string[]> = {
  prostring: ["appliedAI", "agenticAI", "agenticDevelopment", "dataEngineering"],
  "neutral-news": ["appliedAI", "aiEngineering", "dataEngineering"],
  "ia-bigdata": ["aiEngineering"],
  "shoppingcart-chatbot": ["appliedAI"],
  linkia: ["aiEngineering"],
};

export type ScopeStatus = "planned" | "inProgress" | "noneBuilt";

/** Scope tags whose work in a given project is not finished: the chip says so itself, not only its hint. */
export const PROJECT_SCOPE_STATUS: Record<string, Record<string, ScopeStatus>> = {
  prostring: { "Agentic AI": "planned", "Applied AI": "inProgress" },
};

/** Scope tags with nothing built under them in any project (translations: scopeStatus.<status>). */
export const GLOBAL_SCOPE_STATUS: Record<string, ScopeStatus> = {
  "Agentic AI": "noneBuilt",
};

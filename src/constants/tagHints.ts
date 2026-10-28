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

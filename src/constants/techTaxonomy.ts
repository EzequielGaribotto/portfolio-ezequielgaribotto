import { TAG_HINT_KEYS } from "./tagHints";

/**
 * Generic technology tag -> the concrete technologies under it, most important first.
 * Only names that exist as tags somewhere in the portfolio are useful here: a hint lists
 * the intersection with the tags actually used (in a card, or across all projects).
 */
export const TAG_CHILDREN: Record<string, string[]> = {
  // Scope beans: their children may have children of their own (resolved recursively)
  "Applied AI": ["LLM", "Generative AI", "Conversational AI", "NLP"],
  "AI Engineering": ["Machine Learning", "Deep Learning", "NLP"],
  "Agentic Development": ["Agent Harness", "MCP", "Claude Code", "Subagents"],
  "Data Engineering": ["ETL", "Data Processing", "Big Data", "pg_cron", "Edge Functions"],
  "Python": [
    "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow", "Keras", "XGBoost", "Polars", "PySpark",
    "Flask", "FastAPI", "LangGraph", "LangChain", "BeautifulSoup", "Pydantic", "Pytest",
    "Jupyter Notebooks", "Google Colab",
  ],
  "Exploratory Data Analysis (EDA)": ["Statistical Analysis", "Data Visualization", "Socioeconomic Analysis", "Pandas"],
  "Machine Learning": [
    "scikit-learn", "Random Forest", "Gradient Boosting", "XGBoost", "K-Means", "KNN", "Clustering",
    "Regression", "Classification", "Predictive Modeling", "Hyperparameter Tuning", "Embeddings",
  ],
  "Deep Learning": ["Neural Networks", "Computer Vision", "Keras", "TensorFlow", "PyTorch"],
  "LLM": ["LangGraph", "LangChain", "Generative AI", "Conversational AI", "Chatbot", "AI Integration"],
  "Data Science": ["Pandas", "NumPy", "scikit-learn", "Data Visualization", "Jupyter Notebooks"],
  "Data Processing": ["Pandas", "NumPy", "Polars", "PySpark", "ETL"],
  "Big Data": ["PySpark", "Spark", "Hadoop", "Polars", "MongoDB", "Pandas"],
  "ETL": ["Scraping", "Crawling", "Parsing", "BeautifulSoup", "Pandas"],
  "Back-end": [
    "Supabase", "PostgreSQL", "PL/pgSQL", "Edge Functions", "Deno", "RPC", "Row Level Security",
    "Serverless", "Flask", "FastAPI", "Firebase", "Docker", "MongoDB", "NoSQL",
  ],
  "Front-end": [
    "Vue 3", "TypeScript", "Pinia", "Vite", "React", "Next.js", "TailwindCSS", "CSS", "i18n", "ECharts", "Zod",
  ],
  "Supabase": ["PostgreSQL", "PL/pgSQL", "Edge Functions", "Deno", "RPC", "Row Level Security", "Realtime", "pg_cron"],
  "CI/CD": ["GitHub Actions", "Playwright", "Vitest"],
  "Android": [
    "Kotlin", "Retrofit", "Room", "Hilt", "Dagger", "DAO", "Datastore", "MVVM", "LiveData",
    "DataBinding", "XML", "Kotlin DSL", "Coroutines", "Android SDK", "Firebase", "Google Maps API",
  ],
  "Google Cloud Platform": ["Firebase", "Docker"],
  "SaaS": ["Multi-tenant", "Stripe", "Invoicing", "RBAC", "MFA"],
  "UX": ["QZ Tray", "ESC/POS", "Realtime", "i18n"],
  "SQL": ["PostgreSQL", "PL/pgSQL"],
  "Git": ["GitHub Actions", "CI/CD"],
};

/** Every bean below `tag`: children, grandchildren, and so on (cycle-safe). */
export function descendants(tag: string): Set<string> {
  const out = new Set<string>();
  const stack = [...(TAG_CHILDREN[tag] ?? [])];
  while (stack.length) {
    const next = stack.pop() as string;
    if (next === tag || out.has(next)) continue;
    out.add(next);
    stack.push(...(TAG_CHILDREN[next] ?? []));
  }
  return out;
}

/** Beans below `tag` that appear in `pool`. */
export function usedDescendants(tag: string, pool: string[] | undefined): string[] {
  if (!pool) return [];
  const below = descendants(tag);
  return pool.filter((x) => below.has(x));
}

/**
 * Display order of a card's tags: scope beans first (their own order), then beans that highlight
 * others, the ones with more beans below them first, then the rest in their original order.
 */
export function orderTags(tags: string[]): string[] {
  const scope: string[] = [];
  const parents: { tag: string; count: number }[] = [];
  const rest: string[] = [];
  for (const tag of tags) {
    if (TAG_HINT_KEYS[tag]) {
      scope.push(tag);
      continue;
    }
    const count = usedDescendants(tag, tags).length;
    if (count > 0) parents.push({ tag, count });
    else rest.push(tag);
  }
  parents.sort((a, b) => b.count - a.count); // stable: ties keep their original order
  return [...scope, ...parents.map((p) => p.tag), ...rest];
}

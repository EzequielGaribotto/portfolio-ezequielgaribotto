/**
 * Generic technology tag -> the concrete technologies under it, most important first.
 * Only names that exist as tags somewhere in the portfolio are useful here: a hint lists
 * the intersection with the tags actually used (in a card, or across all projects).
 */
export const TAG_CHILDREN: Record<string, string[]> = {
  "Python": [
    "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow", "Keras", "XGBoost", "Polars", "PySpark",
    "Flask", "FastAPI", "LangGraph", "LangChain", "BeautifulSoup", "Pydantic", "Pytest",
  ],
  "Machine Learning": [
    "scikit-learn", "Random Forest", "Gradient Boosting", "XGBoost", "K-Means", "KNN", "Clustering",
    "Regression", "Classification", "Predictive Modeling", "Hyperparameter Tuning", "Embeddings",
  ],
  "Deep Learning": ["Neural Networks", "Computer Vision", "Keras", "TensorFlow", "PyTorch"],
  "LLM": ["LangGraph", "LangChain", "Generative AI", "Conversational AI", "Chatbot", "AI Integration"],
  "Data Science": ["Pandas", "NumPy", "scikit-learn", "Data Visualization", "Jupyter Notebooks"],
  "Data Processing": ["Pandas", "NumPy", "Polars", "PySpark", "ETL"],
  "Big Data": ["PySpark", "Polars", "MongoDB", "Pandas"],
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
  "Android": ["Kotlin", "Retrofit", "Room", "Hilt", "Dagger", "DAO", "Datastore", "MVVM", "LiveData"],
};

/** Concrete technologies of `tag` that appear in `pool`, in importance order. */
export function usedChildren(tag: string, pool: string[] | undefined): string[] {
  const children = TAG_CHILDREN[tag];
  if (!children || !pool) return [];
  const available = new Set(pool);
  return children.filter((c) => available.has(c));
}

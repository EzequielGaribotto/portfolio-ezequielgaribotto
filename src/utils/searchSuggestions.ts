const fold = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Autocomplete options for the project search. Matches ignore case and accents and rank as:
 * starts with the query, a word inside starts with it, contains it. Shorter entries win ties,
 * which puts tags ahead of long project titles. The query itself is never offered back.
 */
export function suggest(query: string, pool: string[], limit = 6): string[] {
  const q = fold(query.trim());
  if (q.length === 0) return [];

  const ranked: { value: string; rank: number }[] = [];
  const seen = new Set<string>();
  for (const value of pool) {
    const folded = fold(value);
    if (seen.has(folded) || folded === q) continue;
    seen.add(folded);
    let rank = -1;
    if (folded.startsWith(q)) rank = 0;
    else if ((" " + folded.replace(/[-/()]+/g, " ")).includes(" " + q)) rank = 1;
    else if (q.length >= 2 && folded.includes(q)) rank = 2;
    if (rank >= 0) ranked.push({ value, rank });
  }

  return ranked
    .sort((a, b) => a.rank - b.rank || a.value.length - b.value.length)
    .slice(0, limit)
    .map((entry) => entry.value);
}

/** The part of `suggestion` still to type, when it extends `query` exactly (same letters, same accents). */
export function remainder(query: string, suggestion: string | undefined): string {
  if (!suggestion || query.length === 0) return "";
  return suggestion.toLowerCase().startsWith(query.toLowerCase()) ? suggestion.slice(query.length) : "";
}

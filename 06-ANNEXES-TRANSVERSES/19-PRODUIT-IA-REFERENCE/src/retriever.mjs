const tokenize = (value) =>
  value.toLowerCase().normalize("NFKD").replace(/\p{Diacritic}/gu, "")
    .split(/[^a-z0-9]+/).filter(Boolean);

export function retrieve(query, documents, limit = 3) {
  const q = new Set(tokenize(query));
  return documents
    .map((doc) => {
      const tokens = tokenize(doc.text);
      const counts = tokens.reduce((m, token) => m.set(token, (m.get(token) || 0) + 1), new Map());
      let score = 0;
      for (const token of q) {
        if (counts.has(token)) score += 1 + Math.log1p(counts.get(token));
      }
      const lengthPenalty = Math.max(1, Math.log1p(tokens.length));
      return { ...doc, score: score / lengthPenalty };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}

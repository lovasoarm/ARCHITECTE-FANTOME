// Laboratoire : rendre une branche rare reproductible sans prétendre « seed » Math.random.
// La fonction reçoit une source aléatoire injectable ; en production elle utilise Math.random.

function computeTotal(items, random = Math.random) {
  if (!Array.isArray(items) || !items.every(Number.isFinite)) {
    throw new TypeError("items doit être un tableau de nombres finis");
  }
  if (typeof random !== "function") {
    throw new TypeError("random doit être une fonction");
  }

  const tirage = random();
  if (!Number.isFinite(tirage) || tirage < 0 || tirage >= 1) {
    throw new RangeError("random doit retourner une valeur dans [0, 1)");
  }

  // BUG PÉDAGOGIQUE volontaire : la branche rare produit undefined,
  // donc le total devient NaN. Le test doit pouvoir forcer cette branche.
  const bonus = tirage < 0.01 ? undefined : 0;
  return items.reduce((sum, x) => sum + x, 0) + bonus;
}

module.exports = { computeTotal };

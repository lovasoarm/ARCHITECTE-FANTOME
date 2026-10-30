const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);
const MAX_DEPTH = 100;
const isRecord = (value) => value !== null && typeof value === "object" &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);

function assertSafeJson(value, path = "$", ancestors = new WeakSet(), depth = 0) {
  if (depth > MAX_DEPTH) throw new TypeError(`profondeur maximale dépassée à ${path}`);
  if (Array.isArray(value) || isRecord(value)) {
    if (ancestors.has(value)) throw new TypeError(`référence cyclique à ${path}`);
    ancestors.add(value);
    try {
      if (Array.isArray(value)) {
        value.forEach((item, index) => assertSafeJson(item, `${path}[${index}]`, ancestors, depth + 1));
      } else {
        for (const key of Object.keys(value)) {
          if (FORBIDDEN_KEYS.has(key)) throw new TypeError(`clé interdite à ${path}.${key}`);
          assertSafeJson(value[key], `${path}.${key}`, ancestors, depth + 1);
        }
      }
    } finally {
      ancestors.delete(value);
    }
    return;
  }
  if (value === null || ["string", "number", "boolean"].includes(typeof value)) return;
  throw new TypeError(`valeur JSON inattendue à ${path}`);
}

function cloneSafeJson(value) {
  if (Array.isArray(value)) return value.map(cloneSafeJson);
  if (isRecord(value)) {
    const copy = Object.create(null);
    for (const key of Object.keys(value)) {
      Object.defineProperty(copy, key, { value: cloneSafeJson(value[key]), enumerable: true, configurable: true, writable: true });
    }
    return copy;
  }
  return value;
}

/**
 * Demonstration helper for parsed JSON only. Validates the full source before mutation.
 * For application configuration, a strict schema and explicit field mapping are preferred.
 */
export function safeMergeJson(target, source) {
  if (!isRecord(target) || !isRecord(source)) {
    throw new TypeError("target et source doivent être des objets simples");
  }
  assertSafeJson(target);
  assertSafeJson(source);
  const safeSource = cloneSafeJson(source);
  for (const key of Object.keys(safeSource)) {
    const value = safeSource[key];
    const existing = Object.hasOwn(target, key) && isRecord(target[key]) ? target[key] : null;
    if (Array.isArray(value)) {
      Object.defineProperty(target, key, { value, enumerable: true, configurable: true, writable: true });
    } else if (isRecord(value)) {
      const child = existing || Object.create(null);
      Object.defineProperty(target, key, { value: child, enumerable: true, configurable: true, writable: true });
      safeMergeJson(child, value);
    } else {
      Object.defineProperty(target, key, { value, enumerable: true, configurable: true, writable: true });
    }
  }
  return target;
}

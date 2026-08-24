#!/usr/bin/env bash
# tests/run_all.sh
# Compare les traces JS et Python (ou Rust) sur le même scénario.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/.." && pwd)"
SCEN="$DIR/scenario.json"
EXP="$DIR/expected.txt"

# --- Pin Node version vs .nvmrc -----------------------
# On refuse d'executer si node est absent OU si sa version majeure
# ne correspond pas a celle epinglee dans .nvmrc a la racine du curriculum.
find_nvmrc() {
  local d="$ROOT"
  while [ "$d" != "/" ]; do
    if [ -f "$d/.nvmrc" ]; then echo "$d/.nvmrc"; return 0; fi
    d="$(dirname "$d")"
  done
  return 1
}

if ! command -v node >/dev/null 2>&1; then
  echo "[FAIL] node introuvable"; exit 1
fi

NVMRC="$(find_nvmrc || true)"
if [ -n "${NVMRC:-}" ]; then
  PINNED="$(tr -d ' \tvV\r\n' < "$NVMRC")"
  CUR="$(node -v | tr -d ' vV\r\n')"
  PINNED_MAJ="${PINNED%%.*}"
  CUR_MAJ="${CUR%%.*}"
  STRICT_RUNTIME="${STRICT_RUNTIME:-0}"
  if [ -z "$PINNED_MAJ" ] || [ -z "$CUR_MAJ" ]; then
    echo "[FAIL] impossible de comparer les versions node (pinned=$PINNED, cur=$CUR)"; exit 1
  fi
  if [ "$STRICT_RUNTIME" = "1" ]; then
    if [ "$CUR" != "$PINNED" ]; then
      echo "[FAIL] exact Node runtime requis: $PINNED ; actuel: $CUR"; exit 1
    fi
  elif [ "$CUR_MAJ" != "$PINNED_MAJ" ]; then
    echo "[FAIL] Node $CUR ne correspond pas au rail .nvmrc ($PINNED). Utilise le rail Node $PINNED_MAJ."; exit 1
  fi
else
  echo "[WARN] .nvmrc introuvable, execution sans pin de version"
fi
# ---------------------------------------------------------------------------

if [ ! -f "$EXP" ]; then
  echo "[FAIL] tests/expected.txt manquant : ecris la trace attendue avant le code."; exit 1
fi
if [ ! -f "$ROOT/src/loop.js" ]; then
  echo "[FAIL] src/loop.js manquant : c'est ton livrable."; exit 1
fi

OUT_JS="$DIR/output_js.txt"
OUT_ALT="$DIR/output_alt.txt"

node "$ROOT/src/loop.js" "$SCEN" > "$OUT_JS"

if command -v python3 >/dev/null 2>&1 && [ -f "$ROOT/src/loop.py" ]; then
  python3 "$ROOT/src/loop.py" "$SCEN" > "$OUT_ALT"
elif command -v cargo >/dev/null 2>&1 && [ -f "$ROOT/src/loop.rs" ]; then
  ( cd "$ROOT" && rustc src/loop.rs -O -o /tmp/loop_rs >/dev/null 2>&1 )
  /tmp/loop_rs "$SCEN" > "$OUT_ALT"
else
  echo "[FAIL] ni python3 ni cargo dispo pour le langage secondaire"; exit 1
fi

if diff -u "$EXP" "$OUT_JS" >/dev/null && diff -u "$EXP" "$OUT_ALT" >/dev/null; then
  echo "POLYGLOT PARITY OK"
  exit 0
fi
echo "[FAIL] divergence detectee"
echo "--- expected vs js ---"; diff -u "$EXP" "$OUT_JS" || true
echo "--- expected vs alt ---"; diff -u "$EXP" "$OUT_ALT" || true
exit 1

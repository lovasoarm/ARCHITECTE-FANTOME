// ============================================================
// AVANT D'ÉDITER : cp 05-MAITRISE/06-ANNEXES/28_templates/03-HYPOTHESES.md ./HYPOTHESES.md
// puis remplis les 3 hypothèses (chacune avec preuve attendue) AVANT
// toute modification. Le verify.sh refuse de valider sans HYPOTHESES.md
// non vide. Aucun raccourci.
// ============================================================

// Bug attendu : cette fonction "debounce" ré-exécute à chaque appel
// au lieu de ne déclencher qu'après la période de calme.
// Symptôme visible : l'utilisateur tape "hello" (5 keydown en 200ms),
// on voit 5 appels réseau au lieu de 1.

function debounce(fn, delayMs) {
  let timer;
  return function (...args) {
    // BUG : on lance un nouveau timer SANS annuler l'ancien.
    // Chaque appel ajoute son propre timer -> tous se déclenchent.
    setTimeout(() => fn.apply(this, args), delayMs);
  };
}

// Reproduction :
const search = debounce((q) => console.log("QUERY:", q), 100);
search("h");
search("he");
search("hel");
search("hell");
search("hello");
// Sortie observée : 5 lignes QUERY:
// Sortie attendue : 1 seule ligne QUERY: hello

// Objectif de l’épreuve : formuler hypothèse → observation → preuve → correction minimale.
// Aucun fix n’est fourni dans la fixture apprenant.

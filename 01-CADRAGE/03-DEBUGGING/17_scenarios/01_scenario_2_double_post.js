// ============================================================
// AVANT D'ÉDITER : cp 05-MAITRISE/06-ANNEXES/28_templates/03-HYPOTHESES.md ./HYPOTHESES.md
// puis remplis les 3 hypothèses (chacune avec preuve attendue) AVANT
// toute modification. Le verify.sh refuse de valider sans HYPOTHESES.md
// non vide. Aucun raccourci.
// ============================================================

// Bug attendu : un clic sur "Save" envoie DEUX requêtes POST identiques.
// Symptôme visible côté serveur : deux entrées créées en base.

const btn = document.querySelector("#save");

async function save(payload) {
  return fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// BUG : le listener est attaché DEUX fois : une par le code page,
// une par un ancien code de bootstrap oublié dans un autre fichier.
btn.addEventListener("click", () => save({ name: "x" }));
btn.addEventListener("click", () => save({ name: "x" }));

// - grep addEventListener("click", ...) sur ce bouton -> trouver les doublons

// Piège classique : le debugger va soupçonner un problème réseau ou une retry
// serveur. La vraie cause est un double-attach front. Question à se poser :
// "combien de listeners sur ce bouton ?" (getEventListeners en devtools).

// Objectif de l’épreuve : formuler hypothèse → observation → preuve → correction minimale.
// Aucun fix n’est fourni dans la fixture apprenant.

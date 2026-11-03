---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, preuve_partielle]
anti_recipe_key: defaut_cache+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# Contraste et couleurs : quand le design devient illisible

Temps de lecture ~7 min

Un texte gris clair sur fond blanc, ça fait "moderne et épuré" sur la maquette Figma. Sur un écran en plein soleil, ou pour quelqu'un avec une basse vision, ça devient juste... invisible. Le contraste, c'est la différence de luminosité entre un texte et son fond. WCAG (Web Content Accessibility Guidelines) fixe des ratios précis à respecter, pas des "à peu près ça va".

## 1) LE RATIO DE CONTRASTE : LE CALCUL RÉEL

Le ratio de contraste se calcule entre 1:1 (aucun contraste, même couleur) et 21:1 (contraste maximal, noir pur sur blanc pur).

```js
// Ce qui compte VRAIMENT à retenir : le calcul existe, il est précis, et le vert pèse plus
// que le rouge ou le bleu dans le résultat (l'oeil humain y est plus sensible).
// Tu n'écriras presque jamais cette formule à la main : un outil la fait pour toi.
// Voici la version honnête, pas édulcorée, pour comprendre ce qui se passe dessous :

function luminanceRelative(r, g, b) {
  const composantes = [r, g, b].map((canal) => {
    const ratio = canal / 255;
    // (chaque canal est "corrigé" selon une courbe non linéaire avant d'être pondéré)
    return ratio <= 0.03928
      ? ratio / 12.92
      : Math.pow((ratio + 0.055) / 1.055, 2.4);
  });
  const [r2, g2, b2] = composantes;
  return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2; // (vert > rouge > bleu dans le poids final)
}

function ratioContraste(luminanceA, luminanceB) {
  const plusClair = Math.max(luminanceA, luminanceB);
  const plusFonce = Math.min(luminanceA, luminanceB);
  return (plusClair + 0.05) / (plusFonce + 0.05); // (formule officielle WCAG, +0.05 évite la division par zéro)
}
```

Tu n'écriras presque jamais cette formule à la main en prod (les outils le font), mais comprendre QUE le vert pèse plus dans le calcul explique pourquoi deux couleurs qui "semblent" similaires en intensité peuvent avoir des ratios très différents.

## 2) LES SEUILS WCAG : AA ET AAA

```text
Texte normal, niveau AA  --> ratio minimum 4.5:1
Texte large (au moins 18 pt sans gras ou 14 pt gras, soit environ 24 px sans gras ou 18,7 px gras) --> ratio minimum 3:1
Niveau AAA (plus strict) --> ratio minimum 7:1 pour le texte normal
```

```js
// Exemple concret : ce gris passe ou pas ?
const grisClair = { r: 170, g: 170, b: 170 }; // #aaaaaa
const blanc = { r: 255, g: 255, b: 255 };
// Ratio calculé : environ 2.32:1
// Résultat : ÉCHEC, même pour le niveau AA le plus permissif
```

Walter White ne mélange jamais une formule "à peu près" : il calcule exactement. Le contraste, pareil : "ça a l'air lisible" n'est pas une mesure, c'est une impression. Utilise un outil (WebAIM Contrast Checker, ou l'inspecteur Chrome DevTools) qui calcule le ratio réel.

## 3) LE DALTONISME : QUAND LA COULEUR SEULE MENT

```js
// Piège classique : la couleur seule porte tout le sens
function afficherStatutMission(statut) {
  const couleur = statut === "reussie" ? "green" : "red";
  element.style.color = couleur; // (vert = ok, rouge = échec, mais pour un daltonique ?)
}
```

Un daltonique rouge-vert (le type le plus fréquent) voit ces deux couleurs presque identiques. S'il n'y a QUE la couleur pour distinguer "mission réussie" de "mission échouée", il ne peut pas savoir.

```js
// Correct : la couleur ACCOMPAGNE l'info, elle ne la PORTE pas seule
function afficherStatutMission(statut) {
  const config =
    statut === "reussie"
      ? { couleur: "green", icone: "", texte: "Réussie" }
      : { couleur: "red", icone: "", texte: "Échouée" };

  element.style.color = config.couleur;
  element.textContent = `${config.icone} ${config.texte}`; // (icône + texte : redondance volontaire et nécessaire)
}
```

## 4) LE TEST QUI CASSE (MAIS FUN)

```js
// Ça casse : un formulaire qui signale l'erreur UNIQUEMENT en rouge
champEmail.style.borderColor = "red"; // (et rien d'autre, aucun texte, aucune icône)

// Un utilisateur daltonique regarde le champ : bordure grise normale à ses yeux
// Il soumet le formulaire en boucle sans jamais comprendre ce qui ne va pas
```

```js
// Ça marche : le rouge accompagne un signal explicite
champEmail.style.borderColor = "red";
champEmail.setAttribute("aria-invalid", "true"); // (signal pour le lecteur d'écran, voir leçon 02)
document.querySelector("#email-erreur").textContent = "Format d'email invalide"; // (signal visuel textuel)
```

## 5) OUTILS RÉELS POUR VÉRIFIER

```text
Chrome DevTools --> inspecter un élément, l'onglet Contraste s'affiche directement sur la couleur
WebAIM Contrast Checker --> coller deux codes hex, ratio calculé instantanément
Lighthouse    --> audit automatique qui liste tous les contrastes insuffisants d'une page
Simulateurs de daltonisme --> voir la page "à travers les yeux" d'un daltonique
```

Risque réel : valider le contraste seulement sur le texte noir/blanc évident, et oublier les états secondaires (valeur d’exemple de formulaire, texte désactivé, bordures de focus). Ces éléments "discrets" sont justement ceux qu'on oublie de tester, et souvent les pires en contraste.

---

## EXERCICES

EXO 1 : Le procès du gris trop clair :
Prends les couleurs de texte secondaires de ton interface (souvent les placeholders, les sous-titres). Calcule leur ratio avec un outil en ligne. Identifie celles qui échouent au niveau AA.

EXO 2 : Daltonien pour de vrai :
Reprends ton système de statuts (succès/erreur/en attente) et vérifie qu'aucune info n'est portée UNIQUEMENT par la couleur. Ajoute icône ou texte partout où c'est le cas.

EXO 3 : Le bouton fantôme au focus :
Vérifie le contraste de la bordure de focus (l'anneau bleu qui apparaît au Tab) sur tous tes boutons. Beaucoup de designs la rendent quasi invisible : trouve si c'est ton cas.

## RÉSUMÉ

Le contraste se mesure avec un ratio précis, pas une impression visuelle. WCAG 2.2 niveau AA fixe 4,5:1 minimum pour le texte normal et 3:1 pour le grand texte (au moins 18 pt sans gras ou 14 pt gras, soit environ 24 px sans gras ou 18,7 px gras). La couleur seule ne doit jamais porter une information critique. Toujours tester avec un vrai outil de calcul, surtout sur les éléments discrets qu'on oublie (placeholders, focus et états de composants) ; les composants et graphiques informatifs relèvent aussi du critère de contraste non textuel.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « Contraste et couleurs : quand le design devient illisible » à une personne qui utilise clavier, contraste renforcé ou lecteur d’écran. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Contraste et couleurs : quand le design devient illisible** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « Contraste et couleurs : quand le design devient illisible » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.

---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, decision_organisationnelle]
anti_recipe_key: decision_inversee+decision_organisationnelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Auditer une page : les outils et la méthode

Temps de lecture ~7 min

T'as appris ARIA, le clavier, le contraste, les lecteurs d'écran. Maintenant : comment tu vérifies, sur une vraie page, que tout ça tient debout ? Un audit a11y (accessibilité) combine outils automatiques et tests manuels. Les outils automatiques repèrent certaines violations vérifiables dans le code et le rendu, mais ils ne couvrent pas tous les critères, peuvent produire des faux positifs et ne jugent pas seuls la qualité d'un parcours. Il n'existe pas de pourcentage de couverture universel valable pour tous les sites, outils et périmètres. Les contrôles manuels et le jugement humain restent nécessaires.

Référence de méthode : [W3C WAI : Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/).

## 1) AXE : LE SCANNER AUTOMATIQUE

axe-core (de Deque Systems) est un moteur d'analyse automatisée pour les interfaces HTML. Il scanne le DOM et signale les violations WCAG qu'il sait détecter ; son rapport ne remplace pas les contrôles manuels.

```js
// Utilisation en test automatisé (avec jest-axe par exemple)
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("la page de profil ninja est accessible", async () => {
  const { container } = render(<ProfilNinja nom="Sasuke" />);
  const resultats = await axe(container);
  expect(resultats).toHaveNoViolations(); // (échoue le test si une violation est détectée)
});
```

```text
Ce que axe DÉTECTE bien :
- contraste insuffisant
- attribut alt manquant
- label de formulaire manquant
- rôle ARIA invalide ou contradictoire

Ce que axe NE DÉTECTE PAS :
- un focus trap mal géré (logique trop complexe pour un scan statique)
- un ordre de lecture illogique pour un humain
- un texte d'erreur qui n'a aucun sens contextuel
```

## 2) LIGHTHOUSE : LE RAPPORT VISUEL RAPIDE

Lighthouse (intégré dans Chrome DevTools) génère un score sur 100 et une liste priorisée de problèmes, accessible en deux clics.

```text
Chrome DevTools --> onglet Lighthouse --> catégorie Accessibility --> Generate report
```

```js
// Exemple de ce que Lighthouse signale typiquement
// "Les éléments de formulaire n'ont pas de label associé" --> liste les inputs concernés
// "Les éléments d'image n'ont pas d'attribut [alt]" --> liste les images concernées
// "Le contraste de fond et de premier plan ne respecte pas le ratio seuil" --> liste les couleurs en cause
```

Risque réel : viser "100/100 sur Lighthouse" comme objectif final. Un score parfait sur un outil automatique ne garantit PAS une expérience réellement utilisable : Lighthouse ne teste jamais au clavier, jamais avec un vrai lecteur d'écran.

## 3) LE TEST MANUEL : LA PARTIE QUE PERSONNE NE PEUT AUTOMATISER

```text
Checklist manuelle minimale :
1. Débrancher la souris, naviguer toute la page au clavier (Tab, Entrée, Échap)
2. Activer un vrai lecteur d'écran, traverser les flux principaux (formulaire, navigation, modal)
3. Zoomer la page à 200% : rien ne doit casser ou se chevaucher
4. Réduire les animations (prefers-reduced-motion) : tout doit rester fonctionnel
```

```js
// Respecter la préférence "réduire les animations" de l'utilisateur
const motionReduite = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!motionReduite) {
  element.classList.add("animation-entree"); // (animation seulement si l'utilisateur ne l'a pas désactivée)
}
```

Certaines personnes ont des troubles vestibulaires : une animation de parallax ou un carrousel qui défile vite peut littéralement déclencher des vertiges ou des migraines. Ignorer `prefers-reduced-motion`, c'est ignorer un signal explicite que l'utilisateur t'envoie.

## 4) MÉTHODE COMPLÈTE D'AUDIT, ÉTAPE PAR ÉTAPE

```text
1. Lancer axe ou Lighthouse --> récupérer la liste des violations automatiques
2. Corriger les violations automatiques détectées --> labels, alt, contraste, rôles
3. Tester au clavier seul   --> tab order, focus trap, skip links
4. Tester avec lecteur d'écran --> noms accessibles, annonces dynamiques (aria-live)
5. Vérifier prefers-reduced-motion et le zoom 200%
6. Documenter les résultats  --> rapport avec gravité (bloquant / à corriger / acceptable)
```

Tu reconnais cette structure : c'est le même principe de gravité que le moteur d'audit du curriculum ce parcours lui-même (bloquant, à corriger, améliorable, acceptable). L'accessibilité s'audite avec la même rigueur que tu audites du code.

## 5) LE PIÈGE QUI CASSE (MAIS FUN)

```js
// Ça casse : corriger UNIQUEMENT ce que axe signale, fermer le ticket, passer à autre chose
// axe dit "0 violations" --> l'équipe pense "on est accessible, terminé"

// Réalité : un focus trap cassé, un aria-live qui spam les annonces,
// un ordre de tab illogique : RIEN de tout ça n'apparaît dans le rapport axe
```

Un audit qui s'arrête à l'outil automatique, c'est comme tester son code en lisant juste le linter sans jamais lancer les tests unitaires. Le linter (analyseur de style) attrape les fautes de syntaxe, pas les bugs de logique. Pareil ici : axe attrape les erreurs de balisage, pas les erreurs d'expérience réelle.

---

## EXERCICES

EXO 1 : Le scan complet de Fox River :
Lance Lighthouse sur une page de ton projet en cours. Liste les 3 violations les plus graves, corrige-les, relance le scan, compare le score avant/après.

EXO 2 : L'audit en 4 étapes :
Prends une page simple (formulaire de contact par exemple) et applique la checklist manuelle complète : clavier seul, lecteur d'écran, zoom 200%, prefers-reduced-motion. Note chaque échec avec son niveau de gravité.

EXO 3 : Piège axe lui-même :
Construit volontairement une modal avec un focus trap cassé (Tab qui sort de la modal). Lance axe dessus. Vérifie qu'axe ne détecte RIEN, et explique pourquoi ce type de bug échappe aux scanners automatiques.

## RÉSUMÉ

axe et Lighthouse détectent les violations de balisage automatiquement (alt manquant, contraste, labels), mais ratent les problèmes de comportement réel (focus trap, ordre de lecture, annonces incohérentes). Un audit complet combine toujours outil automatique et test manuel au clavier et au lecteur d'écran. Respecter `prefers-reduced-motion` n'est pas un détail cosmétique : ça évite des vrais malaises physiques à certains utilisateurs. Un score parfait sur un scanner ne garantit jamais une expérience réellement accessible.

<!-- AF-DIAGRAM:accessibility -->

## Repère visuel utile : Parcours de demande accessible

```text
action utilisateur
       |
       v
structure sémantique + nom
       |
  +----+-----+
  v          v
clavier   lecteur d'écran
  |          |
  +----+-----+
       v
état / erreur annoncé
       |
       v
parcours utilisable
```

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Auditer une page : les outils et la méthode** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « Auditer une page : les outils et la méthode » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.

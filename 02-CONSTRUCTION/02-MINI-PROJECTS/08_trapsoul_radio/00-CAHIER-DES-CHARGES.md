---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : trapsoul radio

Temps de lecture ~14 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
TypeScript   : v5+ (installé comme dépendance locale)
Variables env : aucune
Outils externes: axe-cli (pour les vérifications a11y), Lighthouse CLI

# Installation
$ npm install
$ npm install -g @axe-core/cli lighthouse  # outils de vérification

# Démarrer un serveur local (http-server ou équivalent)
$ npx http-server dist/ -p 3000

# Vérifier les types
$ npx tsc --noImplicitAny --noEmit

# Vérifier l'accessibilité
$ npx axe http://localhost:3000

# Audit Lighthouse
$ npx lighthouse http://localhost:3000 --only-categories=performance,accessibility

# Lancer les tests
$ npm test
```

Pas de framework (pas de React, pas de Vue). HTML + CSS + TypeScript natif compilé vers du JS. Le build step est `tsc` uniquement.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Une plateforme de radio web dédiée au trapsoul, au RnB et au country underground. Des artistes du monde entier. Des auditeurs en France, au Japon, à Madagascar, aux États-Unis. L'interface doit fonctionner au clavier, à la souris, aux lecteurs d'écran, en 4 langues, sans que le code parte en vrille. Elle doit passer les contrôles d'accessibilité WCAG AA (Web Content Accessibility Guidelines : référentiel international d'accessibilité web). Et elle doit être rapide. Si un auditeur aveugle ne peut pas naviguer jusqu'à la piste suivante au clavier, la radio ne sort pas.

Ce que tu dois voir à la fin :

```text
// Depuis le terminal (vérifications techniques)
$ npx tsc --noImplicitAny
  0 errors

$ npx axe http://localhost:3000
  0 violations

$ npx lighthouse http://localhost:3000 --only-categories=performance,accessibility
  Performance: 94
  Accessibility: 100

// Depuis l'interface (comportement visible)
- La track en cours change avec le nom, l'artiste, la durée
- En changeant la langue vers 日本語, tous les labels basculent
- Tab jusqu'au bouton "Piste suivante" : focus visible, espace pour déclencher
- Un lecteur d'écran annonce "En lecture : Bryson Tiller : Exchange"
```

Ce projet est le seul qui mixe TypeScript, accessibilité, et internationalisation ensemble. Ce n'est pas par accident : en prod, ces trois contraintes arrivent rarement séparément.

## POURQUOI CE PROJET EXISTE

Ce projet teste un réflexe que les devs n'ont pas naturellement : penser l'interface pour quelqu'un qui ne lui ressemble pas.

- **TypeScript n'est pas optionnel ici** : les clés de traduction typées garantissent qu'une clé manquante dans une locale est une erreur de compilation, pas un bug en production que quelqu'un remarque 3 mois plus tard.
- **l'accessibilité n'est pas un audit de fin de projet** : elle se construit dès le premier composant. Un `<button>` sans label, un focus invisible, un `div` cliquable à la place d'un vrai bouton interactif : chacun de ces choix ferme la porte à une partie des auditeurs.
- **l'i18n sans bibliothèque externe force à comprendre les vraies difficultés** : `Intl.DateTimeFormat` et `Intl.NumberFormat` existent. La pluralisation en malgache n'est pas la même qu'en anglais. Le faire sans library oblige à comprendre le problème avant de l'abstraire.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/12-TYPESCRIPT` : types stricts, generics, utility types

**Où ça se voit** : tous les fichiers `.ts`. Les clés de traduction typées dans `i18n/types.ts`. Les generics sur les playlists `Playlist<Track>`.
**Pourquoi c'est nécessaire ici** : `TranslationKey` est un type union de toutes les clés valides. Si tu écris `t('player.now_playing_typo')` et que la clé n'existe pas : erreur à la compilation.

### `02-CONSTRUCTION/18-WEB-CONCEPTS` : browser render pipeline, LCP, INP, CLS

**Où ça se voit** : les optimisations de performance dans `src/player/`, les metadata dynamiques dans `src/pages/`.
**Pourquoi c'est nécessaire ici** : un changement de track déclenche un re-render. Si ce re-render fait sauter le CLS (Cumulative Layout Shift : décalage cumulatif de la mise en page), les scores Lighthouse s'effondrent.

### `03-PILOTAGE/02-WEB-INCLUSIVE` : ARIA, navigation clavier, contraste WCAG

**Où ça se voit** : chaque composant HTML dans `src/components/`. Les ARIA roles, les skip links, le focus management dans les modals.
**Pourquoi c'est nécessaire ici** : les composants audio custom (bouton play, slider de progression, sélecteur de track) n'ont pas de comportement clavier natif. Il faut le construire explicitement.

### `03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n` : Intl, pluralisation, namespaces, locale detection

**Où ça se voit** : `src/i18n/` entier.
**Pourquoi c'est nécessaire ici** : 4 locales, pluralisation différente par langue, dates et durées formatées selon la locale, sans bibliothèque externe.

### Résumé visuel

```text
02-CONSTRUCTION/12-TYPESCRIPT  --> types stricts, TranslationKey typé, Playlist<Track>, Readonly<Config>
02-CONSTRUCTION/18-WEB-CONCEPTS --> LCP < 2.5s, CLS < 0.1, INP < 200ms, metadata dynamiques
03-PILOTAGE/02-WEB-INCLUSIVE --> ARIA roles, navigation clavier, skip links, contraste WCAG AA
03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n     --> Intl.DateTimeFormat, Intl.NumberFormat, pluralisation manuelle, 4 locales
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 25 à 40 heures de travail réel.

C'est le projet le plus exigeant en termes d'itération. TypeScript strict + accessibilité WCAG AA + i18n 4 locales : les trois contraintes s'additionnent et se frottent l'une contre l'autre. L'accessibilité ne se fait pas en une passe. Plan pour minimum 25h. Si c'est la première fois que tu fais de l'a11y sérieuse, plan pour 35-40h.

| Étape                           | Durée estimée | Zone de résistance                                                                                 |
| ------------------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| Types + i18n                    | 3h            | Moyenne : bien typer TranslationKey sans tout rigidifier                                           |
| player.ts                       | 2h            | Faible                                                                                             |
| Intl wrappers                   | 1h30          | Faible                                                                                             |
| ariaAnnouncer                   | 1h            | Faible                                                                                             |
| focusManager                    | 3-4h          | **Haute** : le focus trap dans une modal est subtil, surtout avec des éléments disabled            |
| keyboardNav                     | 2-3h          | **Haute** : gérer tab, shift+tab, escape, espace, et les edge cases (éléments hidden)              |
| Composants HTML                 | 3-4h          | Moyenne : ARIA correctement sur des contrôles custom audio                                         |
| i18n locales (4)                | 2h            | Faible mais répétitif                                                                              |
| Vérifications a11y              | 4-6h          | **Très haute** : faire passer axe à 0 violations sur un player audio custom est une vraie bataille |
| Optimisation perf (LCP/CLS/INP) | 2-3h          | Moyenne                                                                                            |

Le focus trap et les vérifications axe sont les deux points où la plupart des gens bloquent plus longtemps que prévu. La raison : les erreurs d'accessibilité se détectent seulement au runtime (axe, lecteur d'écran), pas à la compilation. Chaque correction peut en révéler une autre. C'est de l'itération, pas de la construction linéaire.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Clé de traduction manquante** : si une clé est dans `fr.ts` mais pas dans `ja.ts`, le compilateur TypeScript doit lever une erreur (pas un fallback silencieux).
2. **Pluralisation avec count = 0** : `t('playlist.track_count', { count: 0 })` doit retourner "0 titres" en français, pas "0 titre".
3. **Focus trap avec éléments désactivés** : si tous les boutons dans une modal sont `disabled`, le focus ne doit pas s'échapper de la modal.
4. **Changement de locale pendant la lecture** : la track en cours continue, seul le texte de l'interface change. L'`aria-live` annonce le changement de langue.
5. **Locale non supportée détectée** : si le navigateur est configuré en suédois, le localeDetector fall back sur `'en'` sans erreur.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Zéro `div` cliquable.** Si quelque chose est interactif, c'est un `<button>` ou un `<a>`. Pas de `div onClick`.
2. **Zéro clé de traduction en dur dans les composants.** Tout passe par `t('cle')`. Les composants ne connaissent pas la langue courante.
3. **Contraste WCAG AA partout.** Ratio minimum 4.5:1 pour le texte normal, 3:1 pour le texte large. Vérifié à la fin avec un outil (axe, Lighthouse).

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas de lecture audio réelle (l'`audioController.ts` simule la lecture sans `<audio>` réel).
- Pas de backend, pas d'API.
- Pas de React/Vue. HTML, CSS, TypeScript natif uniquement.
- Pas de bibliothèque i18n (pas de i18next, pas de FormatJS).

## LES ADR

```text
ADR/001-pourquoi-translationkey-type-union-plutot-que-string.md
ADR/002-pourquoi-intl-natif-plutot-que-library-i18n.md
ADR/003-pourquoi-aria-live-pour-les-changements-dynamiques.md
```

Micro-exemple de forme (contexte distinct du projet) :

Ce bloc sert seulement de modèle rédactionnel. Il ne donne aucune solution pour les choix du mini-projet.

```markdown
# ADR : Conserver les unités de mesure dans le domaine

## Contexte

Un système de laboratoire mélange des températures en Celsius et Fahrenheit et plusieurs intégrateurs alimentent les données.

## Décision

Stocker une unité explicite avec chaque mesure du domaine.

## Alternatives considérées

- Supposer Celsius partout : rejeté car certains fournisseurs externes livrent Fahrenheit.
- Convertir uniquement à l’interface : rejeté car les calculs internes resteraient ambigus.

## Conséquences

Les conversions deviennent explicites et vérifiables ; les payloads sont légèrement plus verbeux.
```

**Important : cet exemple est sans rapport avec les décisions réelles du projet.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] tsc --noImplicitAny retourne 0 erreurs
[ ] axe retourne 0 violations sur la page principale
[ ] Lighthouse accessibilité : 100
[ ] Lighthouse performance : > 90
[ ] les 4 locales fonctionnent (fr, en, ja, mg)
[ ] la navigation clavier complète est possible sans souris
[ ] le focus trap de la modal fonctionne (testé dans les tests)
[ ] les 5 cas limites ont chacun un test
[ ] zéro `div` cliquable dans le code HTML généré
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente la violation a11y la plus difficile à corriger
```

## SPEC VOLONTAIREMENT INCOMPLÈTE (obligatoire, à traiter en premier)

Ce cahier des charges est **volontairement incomplet sur 3 points** (format de sortie exact d'un
détail d'interface, un critère d'acceptation mesurable, un choix technique laissé implicite).
Contrairement au _spec drift_ (voir `../../../05-MAITRISE/06-ANNEXES/27_synthese_mini_projects/04-spec_drift.md`) qui simule une
spec qui **change** en cours de route, ici la spec est **floue dès le départ**, comme un vrai
ticket de jour 1 en entreprise.

Ta mission avant d'écrire une ligne de code :

1. Identifie les 3 zones de flou (elles sont réelles, pas piégeuses).
2. Écris dans `QUESTIONS_CLARIFICATION.md` les questions exactes que tu poserais à un vrai
   Product Owner. Utilise le protocole de `03-PILOTAGE/10-TEAM-CRAFT/09-how_to_ask.md`
   (question fermée > question ouverte, hypothèse explicite, coût du "je devine tout seul").
3. Fais ensuite des hypothèses raisonnables sur chaque point, et documente-les dans un ADR
   dédié (`ADR/000-hypotheses-spec-floue.md`) **avant** de coder.

Livrable de cette étape : `QUESTIONS_CLARIFICATION.md` + `ADR/000-hypotheses-spec-floue.md`,
commités **avant** le premier `feat:`.

---

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Validation d'upload/stream (OWASP A03) : valider le type et la taille des flux entrants.
- Rate limiting (OWASP A04) : borner les requêtes par client pour protéger le stream.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Le `97-CHECKPOINT-PACK` de ce projet contient un test de sécurité qui doit passer.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **au moins 1 décision architecturale documentée** (choix de structure, trade-off, alternative rejetée + pourquoi). Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

---

## CONTRAT ANTI-RECETTE

Tu choisis toi-même la découpe, les modules, l’ordre de construction et les tests. Aucun squelette d’architecture n’est fourni.

Avant de coder, produis :

- trois hypothèses vérifiables sur le système ;
- une première découpe que tu défends et une alternative rejetée ;
- un test falsifiant une hypothèse importante ;
- les critères qui te feront changer d’architecture en cours de route.

Ne cherche pas une architecture « correcte » dans le curriculum : le but est de reconstruire un modèle sous contrainte, puis de défendre pourquoi il tient.

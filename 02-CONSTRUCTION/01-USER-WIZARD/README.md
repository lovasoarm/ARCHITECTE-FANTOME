---
stability: intemporel
acte: comprendre
route: complete
---

# Module 02-CONSTRUCTION/01-USER-WIZARD : User Wizard

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../../01-CADRAGE/05-MVP-SPLIT/README.md) | [Niveau suivant](../08-DATA-SPELLS/README.md)

**Ce niveau réutilise :** [03-MVP-SPLIT](../../01-CADRAGE/05-MVP-SPLIT/02-slicing-value.md) : la tranche verticale, réutilisee ici pour livrer un parcours utilisateur complet plutôt qu'un ecran isole.

**Auto-test d'entrée :**

1. Qu'est-ce qu'une tranche verticale, par opposition a une couche horizontale ?
2. Pourquoi une estimation qui cache son incertitude derriere un chiffre unique est-elle malhonnete ?
3. Donne un exemple concret ou dire non a un ajout de perimetre protege la livraison.

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../../01-CADRAGE/05-MVP-SPLIT/90-grimoire.md) (20 minutes), puis refais son
[challenge](../../01-CADRAGE/05-MVP-SPLIT/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au 01-USER-WIZARD une difficulté qui vient du 05-MVP-SPLIT.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce niveau en une phrase

Construire des interfaces qui disent la vérité à l'utilisateur : ce qui se passe, ce qui a marché,
ce qui a raté, et ce qu'il peut faire maintenant.

## Pourquoi ce nom

"User Wizard" pas au sens assistant-en-5-étapes, au sens sorcier : celui qui manipule l'état d'un
écran sans jamais perdre le fil de ce que voit vraiment la personne en face. Un formulaire, une liste,
un bouton "enregistrer" : chacun cache dix états que le prototype ignore et que la prod te fait payer.

## Ce que tu sais déjà en arrivant ici

- Tu sais écrire un composant qui affiche des données.
- Tu as déjà branché un appel réseau et affiché le résultat "quand ça marche".
- Tu n'as jamais eu à gérer sérieusement : double-clic, perte de connexion, réponse partielle,
  liste de 40 000 lignes, ou un serveur qui répond deux fois à la même requête.

## Ce que tu sauras faire à la sortie

- Dessiner un parcours utilisateur avant l'écran, avec tous ses embranchements d'erreur.
- Lister et traiter les cinq états obligatoires de tout affichage de données : vide, chargement,
  erreur, partiel, trop plein.
- Écrire un formulaire dont la validation client et la validation serveur ne se contredisent jamais,
  et dont le double submit ne peut pas créer deux fois la même ressource.
- Choisir entre UI optimiste et UI pessimiste en connaissant le prix de chaque choix.
- Défendre des décisions d'accessibilité et de perception de vitesse avec des arguments mesurables,
  pas des impressions.

## Terrain de jeu

Toutes les leçons de ce niveau utilisent le même produit fil rouge : un logiciel de gestion de
créneaux pour un cabinet vétérinaire (prise de rendez-vous, dossiers animaux, plannings des
praticiens). Un domaine avec de la concurrence réelle (deux personnes qui réservent le même créneau),
des données sensibles (dossier médical), et des utilisateurs pressés (la salariée à l'accueil avec
trois personnes qui attendent).

## Plan du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : ce qui casse en prod quand personne n'a pensé aux états et aux flux.
- [02-flows-before-screens.md](02-flows-before-screens.md) : dessiner le parcours et ses erreurs avant de dessiner l'écran.
- [03-states-and-empty-cases.md](03-states-and-empty-cases.md) : les cinq états obligatoires de tout affichage.
- [04-forms-that-dont-lie.md](04-forms-that-dont-lie.md) : validation double, messages utiles, idempotence.
- [05-accessibility-and-speed.md](05-accessibility-and-speed.md) : a11y utile, perception de latence, UI optimiste et ses pièges.
- [95-challenge.md](95-challenge.md) : exercice appliqué et critères de réussite mesurables.
- [96-boss-fight.md](96-boss-fight.md) : situation adverse réaliste, avec grille d'évaluation.
- [90-grimoire.md](90-grimoire.md) : mémo dense à garder sous la main.

## Prérequis

Module `00-SOCLE/02-PROLOGUE` à 03 (ou équivalent) : bases HTTP, état de composant, notion de requête asynchrone.
Tu dois savoir ce qu'est une race condition, même vaguement, avant d'attaquer la leçon 2.

## Comment progresser

Lis une leçon, code la partie correspondante du cabinet vétérinaire, casse-la volontairement
(coupe le réseau, double-clique, envoie deux requêtes en parallèle), observe ce qui se passe
vraiment, corrige. Le challenge et le boss fight vérifient que tu as fait ce travail, pas que
tu as lu les mots.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `01-USER-WIZARD`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Dessiner le parcours avant l'écran](02-flows-before-screens.md)
- [Les cinq états obligatoires de tout affichage](03-states-and-empty-cases.md)
- [Formulaires qui ne mentent pas](04-forms-that-dont-lie.md)
- [Accessibilité utile, perception de vitesse, et les dangers de l'optimisme](05-accessibility-and-speed.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Boss Fight : La demande impossible du vendredi](96-boss-fight.md)
- [Challenge : Le planning du cabinet qui ne ment jamais](95-challenge.md)
- [Grimoire : Module 02-CONSTRUCTION/01-USER-WIZARD, User Wizard](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

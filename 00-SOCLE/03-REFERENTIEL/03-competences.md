---
stability: intemporel
acte: comprendre
cognitive_level: L1
perturbation_modes: [decision_organisationnelle, defaut_cache]
anti_recipe_key: decision_organisationnelle+defaut_cache
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Référentiel de compétences transversales

Temps de lecture ~2 min

Chaque compétence est reliée au module qui la forge. Ce référentiel sert de boussole : si une compétence te manque en entretien, tu sais où retourner.

> **Important pour la première passe : cette page est une carte, pas une liste de compétences à démontrer maintenant.** Les lignes du tableau indiquent où chaque compétence sera enseignée plus tard. Les mots « async », « API », « sécurité », « architecture », « tests » ou « transfert » peuvent rester inconnus sans bloquer la route. Aujourd'hui, il suffit de comprendre qu'une compétence se construit avec le temps et qu'une preuve est quelque chose que tu as réellement fait ou observé.

| Compétence transversale                            | Module associé                                           |
| -------------------------------------------------- | -------------------------------------------------------- |
| Raisonner avant de coder (hypothèses réfutables)   | `00-SOCLE/05-PROBLEM-SOLVING`, `01-CADRAGE/03-DEBUGGING` |
| Reproduire et isoler un bug de façon déterministe  | `01-CADRAGE/03-DEBUGGING`                                |
| Comprendre l'exécution asynchrone (event loop)     | `01-CADRAGE/02-ASYNC`                                    |
| Gérer les erreurs sans masquer la cause            | `01-CADRAGE/04-ERROR-HANDLING`                           |
| Tester une compétence, pas une syntaxe             | `02-CONSTRUCTION/03-TESTING`                             |
| Raisonner sur la mémoire et la performance         | `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`                  |
| Choisir la bonne structure de données              | `02-CONSTRUCTION/06-DATA-STRUCTURES`                     |
| Concevoir et comparer des algorithmes              | `02-CONSTRUCTION/07-ALGORITHMS`                          |
| Penser objets, prototypes et composition           | `02-CONSTRUCTION/17-OOP-JS`                              |
| Refactorer du code existant (SOLID)                | `02-CONSTRUCTION/11-REFACTORING`                         |
| Concevoir une architecture système                 | `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS`               |
| Sécuriser une application (OWASP)                  | `03-PILOTAGE/04-SECURITY`                                |
| Collaborer avec l'IA sans lui déléguer le jugement | `04-EPREUVE/04-BIG-APP-SNOOP`                            |
| Transférer sa pensée hors de JS                    | `05-MAITRISE/06-ANNEXES/30_transferability`              |
| Défendre ses choix à l'oral                        | `05-MAITRISE/06-ANNEXES/19_interview`                    |

Note : le debugging est traité dans son module dédié, `01-CADRAGE/03-DEBUGGING`.

## CHECKPOINT DE PROFONDEUR : différé après l’étude des compétences concernées

Ce checkpoint avancé n’appartient pas à la première passe et ne conditionne pas Fundamentals. Il ne fait pas partie de la sortie du Référentiel : laisse tout ce bloc en attente jusqu’à ce que les compétences nommées aient été enseignées.

### Variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Pratique autonome différée : production attendue

**Préconditions :** ne tente cette pratique qu’après avoir étudié Testing à l’étape 3 et API Craft / DDD Contracts à l’étape 4 de la Route 58. Si ces modules ne sont pas encore terminés, laisse l’exercice en attente ; il ne constitue ni une gate du Référentiel ni un prérequis à Fundamentals.

À partir de « Référentiel de compétences transversales », produis alors une variante indépendante du cas suivant : une documentation d’API change : sépare les concepts durables (HTTP, contrats, invariants) des détails périssables (version, commande, option fournisseur). Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:reference -->

## Repère visuel utile : Référentiel de compétences par preuves

```text
compétence -> tâche observable -> artefact
     ^                         |
     |                         v
révision datée <- verdict <- critère explicite
     |
     +-> remédiation ou nouvelle preuve
```

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Kintana est un cas d'étude fictif qui réutilisera certaines compétences plus tard. À ce stade, tu n'as pas à connaître son architecture, ses API, ses tests ou son fonctionnement. Cette page ne demande aucune activité technique Kintana.

## Mission utile : repérer une compétence sans la démontrer

**Livrable et critères d’acceptation :** une note d’une phrase indiquant une tâche déjà tentée, son résultat réel (ou « pas encore fait ») et sa limite. Aucune compétence avancée n’est à démontrer.

Choisis une chose très simple que tu as déjà faite dans Getting Started, par exemple lancer un fichier JavaScript qui affiche `Bonjour`.

- **Compétence observée :** lancer un fichier JavaScript préparé.
- **Tâche :** ouvrir le terminal, exécuter la commande déjà apprise et lire le résultat.
- **Preuve :** noter la commande utilisée et le texte affiché, ou écrire « pas encore fait » si tu ne l'as pas fait.
- **Limite :** cette preuve montre seulement que tu as réussi cette tâche dans ce contexte ; elle ne démontre pas la maîtrise de JavaScript.

### Transfert : plus tard, pas pour l'entrée

Le transfert vers une autre technologie ou un autre composant sera travaillé dans les modules qui l'enseignent. Tu n'as rien à produire sur ce point aujourd'hui.

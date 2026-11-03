---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L2
perturbation_modes: [premiere_execution, correction_erreur]
anti_recipe_key: premiere_execution+correction_erreur
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Challenge : `01-GETTING-STARTED`

> **Statut : auto-vérification facultative après la première passe.** Ce challenge ne définit pas la sortie obligatoire de Getting Started et ne bloque ni le Prologue ni Fundamentals. La Route 58 et [START HERE](01-START_HERE.md) définissent seuls le parcours requis.

Ce challenge reprend quelques éléments du **noyau de démarrage** pour t’aider à vérifier ce que tu as compris. Tu peux le faire, le différer ou l’ignorer sans perdre l’accès à la suite. Il ne demande ni application complète, ni projet personnel, ni dépôt Git. Le dossier local de travail et un éditeur de texte suffisent.

## Ressources à utiliser

1. [Installation](02-install.md) : Node.js répond à `node -v`.
2. [Shell : survie en territoire hostile](04-shell_survival.md) : ouvrir un terminal et naviguer vers un dossier.
3. [Day One](03-day_one.md) : créer, exécuter, casser puis corriger un fichier JavaScript.

La page [DevSec perso](07-devsec_perso.md) est une ressource à traiter avant de manipuler des clés, des secrets ou un compte de forge. Elle n'est pas une condition cachée pour réussir le premier fichier JavaScript ; elle devient nécessaire avant de manipuler réellement ces éléments.

## Preuve attendue

Dans un journal local ou `PREUVES/00-premiere-preuve.md`, note :

- la commande `node -v` et le fait qu'elle a répondu (ne copie pas d'information privée) ;
- le nom du fichier exécuté et la sortie observée ;
- l'erreur simple que tu as provoquée, ce que tu as repéré dans le message et la correction appliquée ;
- une question ou difficulté qui reste à clarifier.

Un fichier texte suffit. Git, GitHub et un dépôt distant ne sont pas requis.

## Auto-vérification facultative

Les cases ci-dessous servent uniquement à noter ce que tu as effectivement observé. Une case non cochée n’est pas une gate et ne bloque pas la suite du parcours. N’inscris `PASS` que si tu as réalisé l’action ; si l’environnement est indisponible, note le blocage sans inventer de preuve.

- [ ] Node.js répond à `node -v` ; si l'installation est bloquée, note le blocage sans prétendre avoir validé l'installation.
- [ ] Un fichier `.js` a été créé et exécuté ; la sortie observée est notée.
- [ ] Une erreur de syntaxe simple a été provoquée puis corrigée.
- [ ] Une trace locale décrit le résultat observé et la correction, sans prétendre avoir réalisé une livraison logicielle.

**Ne fais pas** les quatre actes Construire/Expliquer/Justifier/Défendre sur une application à ce stade. Ils seront demandés lorsqu'un module disposera d'un livrable qui les justifie.

Tu peux reporter le résultat dans [PROGRESSION.md](../../PROGRESSION.md) comme note facultative. `PASS` signifie que les actions cochées ont été réalisées ; un prérequis indisponible reste `BLOCKED`. Ce statut de suivi ne commande pas l’accès au module suivant.

## CHECKPOINT DE PROFONDEUR : facultatif

Quand le premier cycle devient facile, imagine une autre manière de créer le fichier. Compare les deux méthodes et explique laquelle tu choisirais sur ton poste. Ce défi ne conditionne pas la sortie de Getting Started.

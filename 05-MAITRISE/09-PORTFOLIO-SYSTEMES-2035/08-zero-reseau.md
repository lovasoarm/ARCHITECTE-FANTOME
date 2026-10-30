---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 08 : Zéro Réseau

> Application local-first hors ligne, synchronisation, résolution de conflits et modèle local optionnel.

**Place dans le parcours :** Avancé client/systèmes : continuité sans connexion.  
**Prérequis :** Stockage local, transactions, APIs, synchronisation asynchrone, tests de concurrence et gestion de conflits ; 02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER est une option d’interface, pas une obligation.

## Mission

Construire une application utile sans réseau, qui protège les données locales et se synchronise sans perte silencieuse. La question première est la sémantique des conflits, pas l’ajout automatique d’un CRDT.

## Version de départ : obligatoire

- [ ] Choisir un cas concret dont les opérations hors ligne ont un sens ; définir les invariants avant de choisir l’algorithme de synchronisation.
- [ ] Écrire et lire localement sans réseau, avec statut de synchronisation et historique minimal des opérations.
- [ ] Implémenter une outbox durable, idempotence, backoff et reprise après fermeture forcée.
- [ ] Définir trois conflits réalistes et choisir pour chacun : rejet, résolution utilisateur, fusion par domaine ou CRDT. Expliquer le coût de chaque stratégie.
- [ ] Protéger les données locales selon la menace, contrôler les sauvegardes, l’export, la suppression et la restauration.
- [ ] Tester les mises à jour simultanées, duplication de messages, événements reçus dans le désordre et perte de réseau pendant une écriture.

## Extensions Depth : une à la fois

- [ ] CRDT pour un type de donnée collaboratif qui le justifie ; décrire opérations, convergence et limites. Ne pas utiliser CRDT comme synonyme de “sync”.
- [ ] Chiffrement local avec stratégie de récupération de clé compréhensible par l’utilisateur ; tester perte de l’appareil et restauration.
- [ ] Modèle IA compact sur appareil en option : mesurer taille, latence, mémoire, batterie/CPU, confidentialité et comportement de fallback sans modèle.

## Tests d’acceptation

- [ ] L’usage de base reste possible hors ligne après redémarrage.
- [ ] Répéter une opération ou la recevoir en double ne corrompt pas l’état ; les conflits conservent la règle de domaine prévue.
- [ ] Une sync interrompue reprend sans perte silencieuse ni duplication d’effet.
- [ ] L’utilisateur peut exporter et restaurer ses données, et comprendre les conflits non résolus.

## Dossier de preuves attendu

Modèle d’état, politique de conflit, tests de réseau perturbé, journal de sync, preuve backup/restore, threat model et ADR sur CRDT ou stratégie alternative.

## Hors périmètre et limites

Ne pas promettre “100 % hors ligne” pour des fonctionnalités qui dépendent réellement d’un serveur. Le modèle local est facultatif et ne doit pas masquer la qualité du mode sans IA.

## Ponts vers AF

[Leçon : local-first et CRDT](LECONS-PONTS/05-local-first-crdt.md), [papier Local-first](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.

---
stability: intemporel
acte: comprendre
route_family: transfer
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : portage rasengan engine

<!-- AF-ADR-CONTRACT -->

**Contrat ADR de ce projet : 2 décision(s) réellement indépendante(s).** Détails et périmètre exact dans [`01-RULES.md`](01-RULES.md). La quantité ne justifie jamais de fractionner artificiellement une même décision. Les ADR fournis sont des contextes de départ, pas une revue humaine ni une preuve d'adoption.

Temps de lecture ~2 min

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Tu portes ton moteur JS en Python ou Go. C'est Goku qui apprend le kaioken après le super produit : même puissance, autre technique. Si tu as compris le fond, la langue change mais la pensée reste.

## OBJECTIF

Porter le contrat fonctionnel et les fonctionnalités retenues de `01_rasengan_engine` dans un seul langage cible : Python OU Go : puis écrire l’ADR de comparaison. Le périmètre exact des fonctionnalités et les exclusions doivent être listés avant le portage.

## CONTRAINTES NON NÉGOCIABLES

- Un seul langage cible au premier jet (Python OU Go).
- Refactor pour l'idiome cible, pas de traduction ligne à ligne.
- Tous les cas de test d'origine reproduits.

## LIVRABLE

Code dans le langage cible, tests verts, `ADR-COMPARAISON.md`, `08-POSTMORTEM.md`, dépôt Git local versionné ; publication publique facultative.

## SÉCURITÉ (gate obligatoire)

Avant de considérer le projet fini, tu dois traiter ces exigences OWASP contextuelles. Un projet qui marche mais qui est vulnérable n'est pas fini.

- Parité de validation (OWASP A03) : les mêmes validations d'entrée que la version JS doivent exister dans le portage ; un edge case bloqué en JS ne doit pas passer en Python/Go.
- Gestion d'erreurs (OWASP A09 - Logging) : ne pas logger d'infos sensibles ou de stack complète en prod dans le langage cible non plus.

Pour chaque exigence : écris dans le document final `SECURITY.md` du dépôt apprenant (copié depuis le modèle `03-SECURITY.md`) la menace, ta contre-mesure, et le test qui la prouve. Ajoute dans le dossier `tests/` de ce projet un test ciblé pour au moins une des menaces retenues. Documente dans le README la commande exacte qui exécute ce test. Aucun pack de correction séparé n’est fourni dans ce projet.

## AUTO-ÉVALUATION

- [ ] Livrable complet et fonctionnel
- [ ] Contraintes respectées et vérifiées
- [ ] Section Sécurité traitée et testée
- [ ] ADR rédigé et relu
- [ ] POSTMORTEM honnête écrit

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **2 décisions réellement distinctes** : (1) choix du langage cible ; (2) comparaison des modèles, conventions ou conséquences de portage. Chaque décision suit le template canonique ; une simple duplication du même choix dans deux fichiers ne compte pas.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

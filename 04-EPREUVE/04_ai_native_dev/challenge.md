# CHALLENGE : LE IA-EN-PROD.md DE TA BRIQUE IA

Ce challenge produit une pièce de preuve réelle, la famille S6 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md). Compte 40 minutes, chrono lancé, sans IA. Le modèle de référence rempli est [PREUVES-MODELES/S6-IA-EN-PROD.md](../../PREUVES-MODELES/S6-IA-EN-PROD.md) : ouvre-le seulement après avoir écrit ta première version, sinon tu recopieras ses chiffres au lieu de trouver les tiens.

## Le contexte narratif

Ta brique IA (celle de [11b_construire_un_pipeline_rag.md](11b_construire_un_pipeline_rag.md), ou celle que ton fil rouge embarque réellement) passe en production la semaine prochaine. Le commanditaire ne veut pas une démo qui marche sur ta machine : il veut savoir ce qu'elle coûtera à 10 000 utilisateurs, ce qu'elle fait quand elle est lente, et comment tu sauras qu'elle s'est mise à mentir après le prochain changement de modèle.

## Ce que tu produis

Un fichier `IA-EN-PROD.md` dans ton dépôt, avec exactement ces six sections, dans l'esprit de [90_ia_dans_le_livrable_staff.md](90_ia_dans_le_livrable_staff.md) :

1. **Ce que la brique fait, et ce qu'elle ne fait pas.** La frontière exacte de ce qu'elle a le droit de toucher (lecture seule, écriture, aucune des deux).
2. **Le coût par utilisateur actif**, avec l'hypothèse de volume, la source du prix (tarif fournisseur, daté), et le calcul entrée + sortie.
3. **Le plafond de dépense et le comportement au plafond** : montant, ce qui se passe à 80%, ce qui se passe à 100%, vérifié où (jamais côté client seul).
4. **Le timeout et la réponse dégradée** servie derrière : jamais une page blanche.
5. **Le SLO séparé de la brique IA**, distinct du SLO du reste du produit écrit au module [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md).
6. **Le jeu de 20 cas d'évaluation**, réparti par famille (clairs, ambigus, contradictoires, hors sujet, tentatives d'injection), rejouable à chaque changement de modèle, avec au moins une date de rejeu si tu as déjà changé de modèle une fois.

## Barème honnête

- Les six sections sont remplies, le coût cite sa source et sa date, la section 6 a réellement 20 cas répartis par famille : la preuve S6 est acquise.
- Un coût sans hypothèse de volume ni source datée : ce chiffre ne survivra pas à la première question d'un CTO. Refais la section 2.
- Un plafond annoncé sans dire ce qui se passe concrètement à 100% : ton plafond est décoratif, exactement le piège de la section 1 de [90_ia_dans_le_livrable_staff.md](90_ia_dans_le_livrable_staff.md).
- Moins de 20 cas, ou aucune famille "tentative d'injection" : ta brique IA n'a jamais été testée contre une entrée hostile, seulement contre des entrées gentilles. Retour obligatoire à [08_prompt_safety.md](08_prompt_safety.md).
- Si ton fil rouge n'a réellement aucune brique IA : ne simule pas. Écris-le noir sur blanc dans `PREUVES-STAFF-ENGINEER.md` et remplace cette famille par S4 ou S5, comme le fichier l'autorise explicitement.

## Où ça ressort

`IA-EN-PROD.md` est réouvert en section 8 du dossier unique de [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), pour au moins une des trois tensions exigées (le coût variable contre la qualité de réponse est un candidat direct).

## ET APRÈS

Le [boss fight](boss-fight.md) : ton modèle change de version un lundi matin, et personne ne t'a prévenu.

---
stability: stable
acte: apprendre
---

# Utiliser AF en autonomie : méthode de travail et critères de passage

## 1. Une séance de travail

1. **Préparer (5–10 min)** : rappeler le but, les prérequis, la preuve attendue et la contrainte de temps.
2. **Comprendre (20–40 min)** : lire une leçon, définir le problème, reformuler le mécanisme sans recopier.
3. **Prédire (5–10 min)** : écrire ce que le système devrait faire avant d'exécuter l'exemple.
4. **Pratiquer (30–90 min)** : écrire un test ou un cas concret avant de se lancer dans une solution importante.
5. **Diagnostiquer** : conserver l'erreur, isoler une hypothèse à la fois et expliquer la cause.
6. **Vérifier** : exécuter tests, critères ou grille ; noter les éléments qui restent non prouvés.
7. **Transférer** : appliquer la notion à un contexte différent ou expliquer quand elle ne convient pas.
8. **Journaliser** : décision, erreur, correction, preuve et question ouverte.

La durée est une indication, pas une mesure de maîtrise. Un sujet difficile peut demander plusieurs séances.

## 2. Passage au module suivant

Ne passe pas au module suivant simplement parce que tu as terminé les pages. Il faut pouvoir :

- définir le problème et les limites du concept ;
- expliquer le mécanisme étape par étape ;
- produire un exemple ou une implémentation ;
- identifier un cas d'échec et le diagnostiquer ;
- justifier au moins un compromis ;
- passer les tests ou critères annoncés ;
- fournir la preuve demandée et expliciter ce qui reste incertain.

Pour les noyaux durs, le seuil du challenge/boss fight s'applique en plus. Une note élevée ne compense pas un échec critique de sécurité, d'intégrité ou de reprise.

## 3. Gérer un blocage

Après une tentative : (1) écrire l'attendu et l'observé ; (2) reproduire le problème avec le plus petit cas ; (3) vérifier environnement et version ; (4) isoler une variable ; (5) lire la documentation officielle pertinente ; (6) demander une revue avec commande, sortie, code minimal et hypothèses. Ne pas copier une solution sans pouvoir la réexpliquer ni modifier un cas limite.

## 4. Honnêteté des preuves

Distinguer une simulation d'une expérience en production. Ne jamais transformer un scénario, une estimation ou un test local en preuve d'impact réel. Anonymiser les données, ne pas publier secrets ou données personnelles, et mentionner le rôle exact tenu dans un projet d'équipe.

## 5. Rythme et révision

Revenir sur les notions à distance : reformulation sans notes, exercice de transfert et revisite des décisions. Pour une connaissance périssable (outil, prix, API, politique de sécurité), vérifier version/source/date au lieu de mémoriser une commande comme vérité intemporelle.

**Preuve personnelle :** pour chaque module, garder une fiche « je sais faire / je sais diagnostiquer / je sais justifier / je ne sais pas encore » avec liens vers les tests, projets et décisions.

<!-- AF-DIAGRAM:learning -->

## Repère visuel utile : Rappel actif et transfert

```text
Lire -> masquer la leçon -> rappeler
                         |
                         v
                   pratiquer Kintana
                         |
                         v
                   comparer au test
                         |
                +--------+--------+
                v                 v
             corriger          expliquer
                |                 |
                +--------+--------+
                         v
                   transfert différé
```

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **Utiliser AF en autonomie : méthode de travail et critères de passage** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « Utiliser AF en autonomie : méthode de travail et critères de passage » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.

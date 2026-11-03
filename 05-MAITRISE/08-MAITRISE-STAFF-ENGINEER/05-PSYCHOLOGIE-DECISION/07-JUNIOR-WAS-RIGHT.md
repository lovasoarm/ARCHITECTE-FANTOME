---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [preuve_partielle, defaut_cache]
anti_recipe_key: preuve_partielle+defaut_cache
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# JUNIOR-WAS-RIGHT : laisser la meilleure idée gagner

Tu as présenté une architecture. Un ingénieur moins expérimenté trouve une contrainte que tu n'avais pas vue et propose une solution meilleure.

## Épreuve

Tu dois conserver la chronologie originale puis produire :

1. le point exact où ton modèle était incomplet ;
2. la preuve fournie par l'autre personne ;
3. la modification de décision ;
4. le crédit explicite donné à l'auteur de l'idée ;
5. le garde-fou ajouté à ton processus pour rechercher plus tôt ce type de signal.

## Anti-jeu

« J'avais déjà envisagé cette idée » invalide l'épreuve sauf preuve écrite datée antérieure à la proposition.

## Mesure

- temps avant reconnaissance de l'erreur ;
- nombre de justifications défensives avant acceptation ;
- qualité du crédit donné ;
- qualité du mécanisme de prévention ajouté.

Le but n'est pas l'humilité théâtrale : c'est de réduire la dépendance du système à ton statut d'expert.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une ingénieure junior remarque qu'un handler envoie deux fois le même événement après un retry. Le senior pensait que la file garantissait une livraison unique. Un test de rejeu démontre deux événements ; le senior reconnaît le point, donne le crédit à la junior et ajoute une clé d'idempotence ainsi qu'un test de non-régression. Le résultat attendu n'est pas une excuse de façade : le mécanisme de détection reste en place après la discussion.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « JUNIOR-WAS-RIGHT : laisser la meilleure idée gagner », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Faire gagner la meilleure preuve

```text
proposition junior
       |
       v
affirmation vérifiable
       |
       v
critères communs
       |
       v
épreuve / contre-exemple
       |
       v
décision mise à jour + crédit
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **JUNIOR-WAS-RIGHT : laisser la meilleure idée gagner** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Faire gagner la meilleure idée, quel que soit le grade

**Mission liée à « JUNIOR-WAS-RIGHT : laisser la meilleure idée gagner » :** Simule une revue de décision Kintana où une proposition junior corrige l’approche senior. Évalue les deux idées selon les mêmes critères et documente la mise à jour sans attribuer le mérite au seul rang.

**Livrable :** Comparaison des propositions, décision révisée et note de rétrospective sans blâme.

**Critères d’acceptation :** La proposition est jugée sur ses preuves ; le changement de décision est explicite ; aucune personne réelle n’est exposée.

**Transfert obligatoire :** La meilleure idée vient d’une personne en désaccord : précise comment tu protèges le signal dans la discussion.

---
stability: evolutif
acte: maitrise
noyau: oui
perishability_id: PER-0113
review_interval: "3 mois"
perishability_scope: "Pratiques et terminologie évolutives autour des spécifications destinées à des systèmes ou agents assistés ; aucune API fournisseur n’est certifiée dans cette leçon."
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "none"
canonical_resource: null
source_scope: "Contenu autonome tel que délimité dans le document ; réévaluer si une affirmation externe versionnée est ajoutée."
provenance_note: "Document déclaré autonome/fictif ; cette classification ne vaut pas validation d’une affirmation externe qui serait ajoutée ultérieurement."
---

# 07 : Ingénierie des spécifications : écrire pour un constructeur autonome

> **Périmètre de suivi (3 mois) :** Pratiques et terminologie évolutives autour des spécifications destinées à des systèmes ou agents assistés ; aucune API fournisseur n’est certifiée dans cette leçon.

Ce module ajoute une capacité à la chaîne existante ; il ne remplace ni `DDD ET CONTRATS`, ni
le capstone, ni la gouvernance IA. L'objectif est de passer de « décrire une intention » à
« écrire une spécification vérifiable par un humain, un assistant ou un agent qui va produire
une implémentation ».

## Principe

```text
intention humaine
      ↓
contraintes explicites
      ↓
invariants + non-objectifs
      ↓
critères d'acceptation
      ↓
tests / évaluations
      ↓
implémentation humaine ou agentique
      ↓
preuve
```

Une spécification n'est pas un ticket plus long. Elle fixe ce qui doit rester vrai lorsque
l'implémentation change.

## 1. Contrat minimal de spécification

Toute spécification Staff doit rendre explicites :

| Élément           | Question de contrôle                                     |
| ----------------- | -------------------------------------------------------- |
| But               | Quel résultat humain ou produit est recherché ?          |
| Périmètre         | Qu'est-ce qui est dedans ?                               |
| Non-objectifs     | Qu'est-ce qui est volontairement exclu ?                 |
| Contraintes       | Coût, latence, sécurité, conformité, équipe, délai ?     |
| Invariants        | Qu'est-ce qui ne doit jamais devenir faux ?              |
| Entrées / sorties | Quelles données entrent et qu'est-ce qui doit sortir ?   |
| Erreurs           | Quelles classes d'échec sont acceptables ou bloquantes ? |
| Validation        | Quelle observation prouve la conformité ?                |
| Changement        | Quel signal déclenche une révision de la spec ?          |

## 2. Test de dérive sémantique

Un agent peut respecter la forme tout en violant l'intention. Pour cette raison, le candidat
produit au minimum :

```text
SPEC.md
  + acceptance-tests/
  + invariants.md
  + threat-model.md (si risque sécurité)
  + decision-log.md
```

Puis il demande à l'outil de générer une implémentation **sans lui donner le corrigé**.
L'évaluation porte sur les garanties, pas sur la quantité de code généré.

## 3. Épreuve : la mauvaise réussite

Construis une tâche où un agent peut obtenir un résultat plausible mais faux :

- données cohérentes en nominal mais incorrectes après un retry ;
- autorisation correcte pour le rôle A mais fuite pour le rôle B ;
- cache performant mais stale au-delà du contrat ;
- migration réussie mais rollback impossible ;
- outil agentique autorisé à agir au-delà de son périmètre.

Le livrable doit montrer :

1. la spec initiale ;
2. l'implémentation produite ;
3. le test qui révèle la dérive ;
4. la correction de spec ou d'implémentation ;
5. la raison de la correction.

## 4. Défense orale

Réponds sans montrer le code :

- Quelle phrase de la spec empêchait le comportement erroné ?
- Quel invariant aurait dû casser en premier ?
- Quelle ambiguïté restait intentionnellement ouverte ?
- Pourquoi l'agent avait-il une chance raisonnable de mal interpréter la demande ?
- Quelle partie de cette spec restera stable si l'outil IA change demain ?

## 5. Critère de sortie

Passage uniquement si la preuve contient une chaîne complète :

**intention → contrainte → invariant → test → résultat → révision**.

Une spécification sans mécanisme de réfutation est une opinion structurée.

## 6. Portage vers le reste d'AF

- `02-CONSTRUCTION/16-DDD-CONTRATS` fournit les contrats et leur évolution.
- `04-EPREUVE/05-CAPSTONE-ARENA` fournit la perturbation et la décision complète.
- Les exercices de gouvernance du module mesurent la différence entre délégation humaine, assistance IA et workflow agentique.
- `06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/` fournit les artefacts réutilisables.

**Temps CORE ajouté : 45 min de consolidation**, en remplaçant une relecture passive du grimoire,
pas en créant un nouveau palier.

### Transfert : changer de contexte

Applique le mécanisme de « 07 : Ingénierie des spécifications : écrire pour un constructeur autonome » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **07 : Ingénierie des spécifications : écrire pour un constructeur autonome** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Écrire une spécification exécutable par un agent sans ambiguïté

**Mission liée à « 07 : Ingénierie des spécifications : écrire pour un constructeur autonome » :** Rédige une tâche pour un agent travaillant sur Kintana : périmètre, contexte autorisé, fichiers à ne pas toucher, invariants, critères observables, procédure de vérification et conditions d’arrêt.

**Livrable :** Spécification, jeux d’acceptation et consignes d’escalade.

**Critères d’acceptation :** Les critères sont testables ; les permissions sont bornées ; l’agent doit demander clarification en cas de conflit ; les résultats sont vérifiables indépendamment.

**Transfert obligatoire :** Une exigence manque ou se contredit : indique le point où l’agent doit s’arrêter et demander une décision.

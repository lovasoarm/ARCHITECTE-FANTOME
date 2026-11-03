---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: medium
assessment_role: project_mastery
---

# SPEC DRIFT TRIGGERS : 04 BREAKING CACHE

Active ces perturbations si `SPEC_DRIFT_MODE=on`. Le but n'est pas d'ajouter du code au hasard : il faut identifier ce qui change, mesurer l'impact et réviser le contrat sans casser les invariants.

## J+1 : La fraîcheur devient plus stricte

Le responsable produit demande que le résumé de stock ne reste pas visible plus de 5 secondes après une mise à jour réussie. Tu dois distinguer : durée de vie TTL, invalidation après commit et fenêtre de lecture concurrente. Un TTL de 5 secondes, seul, ne garantit pas une invalidation immédiate après écriture.

À produire : reformulation du contrat, test de frontière, conséquence sur le coût des appels loader et ADR révisé.

## J+3 : Le système devient multi-tenant

Deux boutiques de tenants différents ont les mêmes identifiants locaux. Une clé `stock-summary:<storeId>` devient dangereuse. Des identifiants peuvent aussi contenir `:` : une concaténation naïve peut faire collisionner deux couples distincts. Tu dois démontrer l'isolation de périmètre, choisir une sérialisation non ambiguë et décider où construire la clé.

À produire : deux clés réellement distinctes, tests croisés et note de sécurité. Ne prétends pas qu'un préfixe protège à lui seul si l'identité tenant n'est pas fiable.

## J+5 : La source de vérité devient lente ou échoue

Le loader prend plus de temps ou retourne une erreur. Décide ce qui est servi (erreur, dernière valeur connue, aucune valeur), pendant combien de temps et avec quel risque métier. Le comportement stale-if-error n'est pas implicitement autorisé par le cahier initial.

À produire : alternatives, critère de décision, test et ADR. Ne renvoie pas une valeur périmée sans politique explicite.

## Livrable obligatoire

Dans `08-POSTMORTEM.md`, ajoute `## Comment j'ai encaissé le drift` et une ligne par perturbation réellement activée : date, hypothèse modifiée, preuve, choix, coût et risque résiduel.

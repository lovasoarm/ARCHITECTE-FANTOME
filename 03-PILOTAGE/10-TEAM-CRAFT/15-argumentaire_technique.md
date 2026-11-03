---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, preuve_partielle]
anti_recipe_key: changement_contexte+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# Argumentaire technique : convaincre un pair en 1 page

Temps de lecture ~45 min

Un dev qui a raison mais qui ne sait pas convaincre reste seul. Ce drill, tu vas le refaire toute ta carrière.

---

## LA MISSION

Rédige UN document d'UNE page (600 mots max) pour convaincre ton équipe d'adopter une solution technique de ton choix. Exemples :

- Passer de REST à GraphQL sur l'API interne.
- Introduire TypeScript sur un projet JS.
- Remplacer Jest par Vitest.
- Refuser d'introduire un ORM.

---

## STRUCTURE IMPOSÉE

1. **Le problème** (2-3 phrases). Chiffré si possible.
2. **La solution** (2-3 phrases).
3. **Trois bénéfices concrets** (bullets, mesurables).
4. **Deux risques + mitigations** (honnête, sinon tu perds la salle).
5. **Alternative rejetée** + pourquoi.
6. **Décision demandée** : "On teste 2 semaines sur X ?" "GO/NO-GO d'ici vendredi ?"

---

## RÈGLE ABSOLUE

Zéro "je pense que…", "il me semble que…". Un pair convaincu, c'est un pair qui voit des faits, pas des opinions.

## AUTO-ÉVAL

- [ ] Tu peux le lire à voix haute en < 3 min.
- [ ] Un non-dev comprend au moins le problème et la décision.
- [ ] Zéro jargon non défini.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Transfert : changer de contexte

Applique le mécanisme de « Argumentaire technique : convaincre un pair en 1 page » à une équipe qui conteste la décision avec des preuves contraires. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Construire un argumentaire équilibré

```text
critères de décision
       |
       v
alternatives crédibles
       |
       v
preuves et incertitudes
       |
       v
recommandation motivée
       |
       v
condition de révision
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Argumentaire technique : convaincre un pair en 1 page** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Construire un argumentaire technique équilibré

**Mission liée à « Argumentaire technique : convaincre un pair en 1 page » :** Pour un choix Kintana, défends une recommandation à partir de contraintes explicites, compare une alternative et expose les conditions dans lesquelles ton choix deviendrait mauvais.

**Livrable :** Argumentaire d’une page, matrice d’options et condition de réexamen.

**Critères d’acceptation :** Les faits sont séparés des estimations ; les coûts différés sont nommés ; une objection solide est traitée sans caricature.

**Transfert obligatoire :** Un nouvel élément invalide ton hypothèse centrale : précise comment tu révises la recommandation.

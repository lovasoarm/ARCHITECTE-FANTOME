---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# RFC simulation : soumets une décision technique

Temps de lecture ~5 min

> **INTEMPOREL** : la capacité à écrire, défendre et amender une RFC survit
> aux frameworks, aux langages et aux tendances managériales.

## Rappel : c'est quoi une RFC ?

_Request For Comments_. Un document court (2-5 pages) qui propose un
changement significatif : nouvelle dépendance, refonte d'un module, migration
d'infra. Publié pour être **commenté avant** l'implémentation.

Différence avec un ADR (`03-adr_writing.md`) :

- RFC = **proposition ouverte au débat**, avant décision.
- ADR = **décision figée**, après débat, pour la mémoire.

## Structure imposée

```md
# RFC XXX : <titre>

- Auteur, date, statut (Version de travail / Under Review / Accepted / Rejected)
- Contexte (2 §)
- Problème (1 §, précis, mesurable)
- Proposition (schéma + description)
- Alternatives considérées (2 minimum) + pourquoi rejetées
- Impact (perf, sécurité, coûts, DX, migration)
- Risques + plan de mitigation
- Décision demandée (Go / No-Go / More data)
```

## Exercice (obligatoire)

### Round 1 : propose

Choisis un vrai sujet (ex: "Passer de Express à Fastify", "Ajouter Redis",
"Introduire TypeScript strict"). Rédige la RFC selon la structure ci-dessus.
Contrainte : **2 alternatives obligatoires**, une doit être "ne rien faire".

### Round 2 : challenge

Trouve un pair (ou un dev senior sur Discord, Twitter, IRL). Il joue
l'opposant : il doit trouver **3 objections sérieuses**. Note-les.

### Round 3 : amende

Réécris la RFC en intégrant les objections : soit tu les réfutes avec
données, soit tu ajustes la proposition. **Ne les cache pas.**

### Round 4 : décision

Écris la section "Décision demandée" comme si tu la présentais à un CTO :

- 3 chiffres qui appuient,
- 1 risque assumé,
- 1 sortie de secours si ça casse.

## Livrable

- `rfc/001-<titre>.md` (rounds 1 → 3 en `git diff` visibles),
- `DECISION.md` (round 4, 1 page).

## (attention) Ce que l'analogie "documenter c'est perdre du temps" cache

Une RFC bien écrite **remplace** 5 réunions. Le temps investi à l'écrit est
gagné en aval : moins d'ambiguïtés, moins de re-débats, plus rapide à
onboarder les nouveaux.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Vérification observable : critères de réussite

Fournis une preuve observable : critère mesurable avant exécution, résultat attendu, résultat obtenu et seuil d’échec. Teste aussi une condition dégradée. Une affirmation sans mesure ne valide pas « RFC simulation : soumets une décision technique ».

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Faire d’une RFC une décision contestable

```text
problème et périmètre
        |
        v
options + conséquences
        |
        v
recommandation
        |
        v
objections et commentaires
        |
        v
décision + statut + propriétaire
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **RFC simulation : soumets une décision technique** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Soumettre une RFC contestable et décidable

**Mission liée à « RFC simulation : soumets une décision technique » :** Rédige une RFC Kintana sur une évolution qui traverse API, données et exploitation. Présente le problème, les options, les contraintes, la migration, les risques et les questions ouvertes ; sollicite une critique réelle ou étiquette clairement une simulation.

**Livrable :** RFC, tableau d’objections/réponses, plan de migration et décision de sortie.

**Critères d’acceptation :** Les objections changent éventuellement la proposition ; le statu quo est une option ; approbateurs, délais et critères de décision sont explicites.

**Transfert obligatoire :** Une objection révèle un coût oublié : révise le choix ou explique pourquoi le coût est accepté.

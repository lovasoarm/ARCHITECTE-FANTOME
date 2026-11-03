---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, transmission]
anti_recipe_key: solution_concurrente+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# DÉSACCORD AVEC LE CTO (jeu de rôle écrit, puis oral)

Temps de lecture ~3 min

Objectif : t'entraîner à défendre une décision technique face à un supérieur qui pousse dans l'autre sens. En entreprise, avoir raison ne suffit pas : il faut convaincre sans se braquer ni se coucher. Ce drill se joue seul, en deux temps : tu écris, puis tu oralises.

## LE CONTEXTE

Tu as livré `05_prison_break_api`. Tu as choisi SQLite + un cache Map en mémoire, une auth JWT, et une architecture en couches (routes / services / db). Le CTO débarque en revue et conteste. Tu dois tenir ta position OU céder de façon argumentée : les deux sont acceptables si c'est raisonné.

## RÈGLE DU JEU

Pour chaque objection : (1) écris ta réponse en 4-6 lignes, factuelle, sans agressivité ; (2) ensuite, oralise-la à voix haute, enregistrée, comme si le CTO était en face. Le passage écrit -> oral est le cœur du drill.

## LES 5 OBJECTIONS DU CTO

### Objection 1 : "SQLite en prod ? C'est un jouet. On met PostgreSQL, point."

Ta réponse écrite : ...
(Pistes : périmètre du projet, coût opérationnel, chemin de migration si la charge grimpe, quand SQLite devient effectivement insuffisant. Ne dis pas "SQLite c'est mieux" en absolu : dis "pour CE besoin, voilà le compromis".)

### Objection 2 : "Ton cache en mémoire va exploser en cluster multi-instance. Rejette."

Ta réponse écrite : ...
(Pistes : il a partiellement raison. Que fais-tu ? Redis partagé ? Cache local + TTL court accepté ? Documente le trade-off au lieu de nier le problème.)

### Objection 3 : "Pourquoi JWT et pas des sessions serveur ? Tu compliques pour rien."

<!-- AF-DIAGRAM:jwt -->

```text
Login ─► Issue token ─► Request + token ─► Verify ─► Allow / Reject
                                      │
                                      └────► Expired / Invalid
```

Le token traverse un cycle de création, transport, validation et expiration.

Ta réponse écrite : ...
(Pistes : stateless vs stateful, révocation, taille du token, contexte API. Aucune réponse n'est universelle : montre que tu connais les deux et pourquoi tu as tranché.)

### Objection 4 : "Trois couches routes/services/db pour cette taille de projet ? C'est de la sur-ingénierie."

Ta réponse écrite : ...
(Pistes : coût de la structure vs coût du désordre, testabilité, quand une couche devient du bruit. Sois prêt à admettre si c'est effectivement trop pour ce périmètre.)

### Objection 5 : "On n'a pas le temps pour tes tests de sécurité. On shippe, on verra après."

Ta réponse écrite : ...
(Pistes : le coût d'un incident sécurité vs le coût du test, ce qui est non négociable vs ce qui peut attendre. Ne moralise pas : chiffre le risque.)

## GRILLE D'AUTO-ÉVALUATION

- [ ] J'ai reconnu quand le CTO avait (partiellement) raison, sans m'écraser.
- [ ] J'ai chiffré ou concrétisé au moins un trade-off (coût, temps, risque).
- [ ] Je n'ai jamais répondu "c'est mieux" sans "pour ce contexte, parce que".
- [ ] J'ai proposé un chemin de migration/repli au lieu d'une position figée.
- [ ] À l'oral, ton calme : pas de défensive, pas de soumission.

## (attention) CE QUE LE DRILL RÉVÈLE

Deux échecs classiques : le dev qui se couche à la première pression (et livre une archi qu'il sait mauvaise), et le dev qui campe sur sa position par ego (et se grille). Le bon ingénieur, comme un négociateur de Prison Break, sait quelle porte tenir et laquelle laisser passer. Ta valeur en réunion, c'est ça : décider quoi défendre.

## APRÈS

Réécoute-toi. Repère où ta voix a tremblé, où tu as concédé trop vite, où tu t'es braqué. Refais le drill avec un désaccord tiré d'un de tes propres mini-projets.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Transfert : changer de contexte

Applique le mécanisme de « DÉSACCORD AVEC LE CTO (jeu de rôle écrit, puis oral) » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **DÉSACCORD AVEC LE CTO (jeu de rôle écrit, puis oral)** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Traiter un désaccord technique avec un CTO

**Mission liée à « DÉSACCORD AVEC LE CTO (jeu de rôle écrit, puis oral) » :** Simule un désaccord sur une évolution Kintana. Reformule la contrainte du CTO, présente les données disponibles, propose une option de compromis et indique le seuil qui te ferait changer d’avis.

**Livrable :** Dialogue écrit, matrice d’options et note de décision finale.

**Critères d’acceptation :** Tu réponds à l’argument et non au statut ; les données manquantes sont signalées ; la décision et le désaccord résiduel sont consignés.

**Transfert obligatoire :** Le CTO conserve son choix : décris comment tu sécurises l’exécution sans feindre l’accord.

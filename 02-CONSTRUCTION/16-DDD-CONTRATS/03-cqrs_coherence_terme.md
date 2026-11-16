---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# CQRS et cohérence à terme : deux leçons, un seuil

<!-- AF-DIAGRAM:cqrs -->

```text
                 ┌────────────┐
Command ────────►│ Write side │────► state
                 └────────────┘

Query ──────────►┌────────────┐
                 │ Read side  │────► view
                 └────────────┘
```

CQRS sépare le chemin des mutations du chemin des lectures afin de leur permettre des modèles et contraintes différents.

Temps de lecture ~3 min

Temps de lecture ~20 min, puis un exercice chiffré sur le fil rouge.

CQRS n'est **pas** l'event-driven. L'event-driven a son fichier :
[06-event_driven.md](../14-ARCHITECTURE-PATTERNS/06-event_driven.md) (mécanisme
d'émission/écoute) et
[04-b_event_driven_distinct.md](04-b_event_driven_distinct.md) (frontière Staff :
quand l'événement n'est pas une projection de lecture). Ici : **deux modèles**,
écriture et lecture, et ce que l'utilisateur voit pendant le retard.

---

## Leçon 1 : modèle de lecture séparé, sans mentir

CQRS sépare le modèle qui **accepte une commande** du modèle **optimisé pour lire**.
Cela n'impose ni deux bases, ni event sourcing, ni broker. Commence par deux
modèles dans la **même** transaction. Ne passe à une projection asynchrone
qu'après une mesure.

### Flux (ASCII)

```text
  utilisateur
       |
       |  commande (écrire)
       v
 +-----------+     transaction      +------------------+
 |  modèle   | ------------------>  |  état d'écriture |
 | d'écriture|                      +--------+---------+
 +-----------+                               |
       |                                     |  (marche 1 : même TX, 0 lag)
       |  événement de domaine               |
       v                                     v
 +-----------+                        +------------------+
 |  worker   |  projection asynchrone | modèle de lecture|
 | (marche 3)| ---------------------> | (requêtes UI)    |
 +-----------+                        +--------+---------+
                                               |
                                               v
                                         utilisateur
                                         (lire)
```

Trois marches, une seule à la fois :

| Marche | Technique                                 | Cohérence   | Quand l'ouvrir                     |
| -----: | ----------------------------------------- | ----------- | ---------------------------------- |
|      1 | deux modèles, une transaction             | immédiate   | défaut                             |
|      2 | lecture dédiée synchrone (vue SQL, index) | immédiate   | dès que la lecture gêne l'écriture |
|      3 | projection asynchrone                     | **à terme** | seulement après mesure             |

À la marche 3, la cohérence devient une **promesse métier**. Fixe un délai
maximum **mesuré**, exemple d'exercice : **30 s au p95**, **2 min au p99**.

### Que voit l'utilisateur pendant le retard ?

L'utilisateur qui vient d'écrire doit :

- soit **lire son propre écrit** depuis le modèle d'écriture (read-your-writes) ;
- soit voir une copie locale étiquetée « publication en cours ».

Une vue **vide** ou **ancienne sans explication** est un bug de confiance, pas un
détail UX. Si la projection dépasse le seuil : alerte avec le **lag en secondes** ;
le produit conserve le dernier état connu ; il n'invente pas une fraîcheur.

Latence de projection = `t_lecture_disponible - t_commit_ecriture`. Journalise-la.
Sans cet histogramme, tu n'as pas de CQRS : tu as un espoir.

---

## Leçon 2 : contre-exemple CRUD chiffré

Mesure la page du fil rouge **avant** de proposer CQRS.

Exemple d'exercice (remplace par tes mesures) :

- trafic : 20 req/s en pointe ;
- table : 200 000 lignes ;
- requête liste : **180 ms** sans index, **35 ms** avec l'index métier ;
- projection asynchrone : worker **60 €/mois**, **2 Go de stockage** dont le tarif mensuel par Go est noté `s` (€/Go/mois), **4 h/mois**
  d'exploitation (à 45 €/h d'exercice = 180 €/mois de temps humain).

Le coût connu est donc `60 + 180 = 240 €/mois`, auquel il faut ajouter `2 × s` pour le stockage : le total est `240 + 2s €/mois`. Le tarif `s` n'est pas fourni dans cet exemple.

Les données disponibles ne suffisent pas à conclure que CRUD + index est économiquement supérieur : les requêtes mensuelles réellement concernées, la distribution de latence, le coût du stockage et la valeur économique d'une milliseconde ne sont pas tous renseignés. Les **145 ms** d'écart sont une différence de latence observée dans l'exemple, pas à eux seuls une valeur monétaire. La décision reste donc **indéterminée** jusqu'à collecte des données manquantes. Le seuil de décision se calcule :

```text
cout_cqrs_mois = worker + stockage + heures_ops × taux
cout_cqrs_mois = 60 + 2 × s + 4 × 45
cout_crud_mois = infra_crud + exploitation_crud
gain_mensuel_estime = req_mois × gain_ms_pondere × valeur_economique_par_ms
si gain_mensuel_estime <= cout_cqrs_mois - cout_crud_mois : refuser la marche 3
```

Tant que l'index, la pagination ou une lecture dédiée synchrone suffisent,
**choisis-les**. CQRS asynchrone n'est pas un thème « déjà couvert » parce qu'on
a vu un EventEmitter : le sujet se traite ici,
en deux leçons, avec un chiffre.

### Exercice fil rouge (livrable)

Dans `PREUVES/ADR/` (ou équivalent), une page :

1. trafic p50 / p95 de la lecture concernée ;
2. coût mensuel CRUD (infra + rien d'autre) ;
3. coût fixe + variable de la marche 3 ;
4. délai de cohérence accepté **par le métier** (phrase d'un humain, pas de toi) ;
5. la marche que tu **refuses** ou la décision « données insuffisantes », et le seuil qui ferait rouvrir.

Ne transforme pas les millisecondes économisées en euros sans expliciter le volume de requêtes concerné et la méthode qui valorise ce gain. Sans ces mesures, le calcul sert à identifier les données à collecter, pas à prouver un gagnant.

La décision est révisable quand un chiffre franchit le seuil. Pas avant.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « CQRS et cohérence à terme : deux leçons, un seuil », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CQRS et cohérence à terme : deux leçons, un seuil** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission Kintana : décider si une lecture séparée paie son coût

Choisis une page de Kintana qui lit des demandes ou des interventions. Mesure un cas de lecture représentatif avant optimisation, puis compare trois marches : modèle commun, lecture synchrone dédiée (index/vue), projection asynchrone. Définis la tolérance métier au retard et le comportement read-your-writes.

**Livrable :** tableau des mesures, calcul de coûts avec hypothèses explicites, seuil de réexamen et décision argumentée. Tu peux conclure « données insuffisantes » si les mesures manquent.

**Acceptation :** le stockage et l'exploitation sont comptés ; la latence est associée à un volume ; le délai de cohérence est validé par le métier ; aucun bénéfice monétaire n'est inventé.

**Transfert :** un pic de lecture disparaît mais un export mensuel devient critique. Réévalue la solution sans présumer que CQRS reste utile.

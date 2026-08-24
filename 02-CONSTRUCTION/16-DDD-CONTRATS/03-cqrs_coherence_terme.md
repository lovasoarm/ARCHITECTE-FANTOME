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
- projection asynchrone : worker **60 €/mois**, 2 Go de stockage, **4 h/mois**
  d'exploitation (à 45 €/h d'exercice = 180 €/mois de temps humain).

À ce volume, le CRUD + index **rapporte plus** que CQRS : tu gagnes 145 ms pour
~240 €/mois de coût total de la marche 3. Le seuil de décision se calcule :

```text
cout_cqrs_mois = worker + stockage + heures_ops × taux
gain = (latence_avant - latence_apres) × req_mois × valeur_ms
si gain < cout_cqrs_mois : refuser la marche 3
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
5. la marche que tu **refuses**, et le seuil qui ferait rouvrir.

La décision est révisable quand un chiffre franchit le seuil. Pas avant.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

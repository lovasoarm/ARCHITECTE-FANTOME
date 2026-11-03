---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [changement_echelle, solution_concurrente]
anti_recipe_key: changement_echelle+solution_concurrente
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# CHAOS INSTRUCTIONS : casser un projet volontairement pour s'entraîner

Temps de lecture ~2 min

Si tu n'as pas de "vrai" bug historique, tu peux fabriquer ton propre terrain
d'entraînement en 15 min. Le but : t'entraîner à lire du code inconnu.

## Protocole

1. Clone un projet que tu ne connais pas (starter Rust, exemple asyncio Python).
2. Fais `git checkout -b sabotage`.
3. Applique **UNE** des 5 mutations ci-dessous, en aveugle (choisi par un tiers).
4. Attends 24h (tu oublieras ce que tu as fait).
5. Redébugge comme si c'était un legacy inconnu.

## Les 5 mutations calibrées

- **M1** : inverser un opérateur (`>` → `<`) dans une fonction non couverte par les tests.
- **M2** : supprimer un `await` sur une fonction async.
- **M3** : passer un `Arc<Mutex<T>>` par valeur au lieu d'une référence (Rust).
- **M4** : capturer une variable de boucle dans une closure (JS/Python) au lieu de la copier.
- **M5** : changer un `==` en `is` (Python, catastrophe sur les entiers > 256).

## Livrable

Un `SABOTAGE_REPORT.md` où tu compares ton hypothèse initiale, le vrai bug, et le
temps qu'il t'a fallu. C'est là que tu vois si ta méthode tient hors terrain connu.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Pratique autonome : production attendue

À partir de « CHAOS INSTRUCTIONS : casser un projet volontairement pour s'entraîner », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:transfer -->

## Repère visuel utile : Transférer un invariant entre écosystèmes

```text
principe abstrait / invariant
          |
     +----+----+
     v         v
 runtime A   runtime B
     |         |
 implémenter implémenter
     |         |
     +----+----+
          v
    mêmes fixtures
          |
          v
 comparer traces + limites
```

<!-- AF-LESSON-PROFILE: transfer -->

## Repères de décision

- **Pourquoi :** Le transfert vérifie que tu as compris un principe et pas seulement mémorisé une syntaxe ou une recette liée à un outil.
- **Quand l’utiliser / quand l’éviter :** Utilise-le quand tu changes de langage, de runtime, de framework ou de contexte métier. Évite de transposer mot à mot une abstraction qui n'existe pas dans l'écosystème cible.
- **Limites :** Les sémantiques de mémoire, concurrence, erreurs et bibliothèques diffèrent. Une analogie entre langages ne prouve pas l'équivalence de leur comportement.

## Mécanisme : la version sans magie

Identifie l'invariant, lis le modèle du langage cible, implémente une version minimale, puis compare les traces et les cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CHAOS INSTRUCTIONS : casser un projet volontairement pour s'entraîner** se rattache à ce cas concret : Kintana peut être implémenté ou instrumenté dans plusieurs technologies. Les garanties d'idempotence et d'ordre doivent rester les mêmes même si la syntaxe change.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Transférer un invariant entre écosystèmes

> **Arc One Piece / Grand Line :** si tu changes de navire, le principe doit encore naviguer. Le but n'est pas de réciter JavaScript dans un autre langage, mais de reconnaître le même mécanisme.

**Mission liée à « CHAOS INSTRUCTIONS : casser un projet volontairement pour s'entraîner » :** Prends le mécanisme de la leçon et reconstruis-le dans un langage ou runtime différent. Utilise une fixture commune, compare les traces et note ce qui ne se transpose pas directement.

**Livrable :** deux implémentations ou une implémentation et un modèle de référence, tests partagés, tableau de sémantique et note de divergence.

**Critères d’acceptation :** les mêmes entrées sont utilisées ; les divergences sont expliquées ; aucune équivalence n'est revendiquée sans test ; les différences du runtime sont explicites.

**Transfert obligatoire :** Change l'hypothèse de concurrence ou d'erreur du second environnement. Révise ton modèle plutôt que de forcer la première solution.

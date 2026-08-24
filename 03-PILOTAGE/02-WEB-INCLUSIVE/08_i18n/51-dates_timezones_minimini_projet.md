---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les années et dates de projets doivent s'afficher selon la locale, sans écart entre rendu serveur et client : cause classique d'erreur d'hydratation. Le mécanisme est précis : l'erreur survient quand une valeur dépendant de la locale ou du fuseau horaire est calculée différemment côté serveur et côté client. Règle : ne génère pas une telle valeur différemment des deux côtés.

## APPLICATION

- Remplace tout formatage de date manuel par `Intl.DateTimeFormat` avec une locale explicite.
- Vérifie qu'aucun `new Date()` sans argument n'est utilisé pendant le rendu.
- Identifie explicitement, pour chaque date affichée : la donnée source, la locale, le fuseau, le moment du formatage.
- Teste une date autour de minuit ou d'un changement de fuseau pour rendre le bug observable.
- Recharge la page plusieurs fois : aucun avertissement d'hydratation ne doit apparaître.

## Critère de réussite

- [ ] Remplace tout formatage de date manuel par `Intl.DateTimeFormat` avec une locale explicite.
- [ ] Vérifie qu'aucun `new Date()` sans argument n'est utilisé pendant le rendu.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi une date formatée sans locale explicite peut-elle différer entre serveur et navigateur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes dates sont stables et localisées.

Un bug d'hydratation classique est évité dans les cas testés ici. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

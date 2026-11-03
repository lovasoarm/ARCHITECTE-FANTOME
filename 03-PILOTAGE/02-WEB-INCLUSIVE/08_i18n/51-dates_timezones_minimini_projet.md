---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Dates et timezones : le cauchemar et comment le résoudre

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

## Livraison produit : Kintana : distinguer instant, date civile et heure locale

> **Fil rouge :** Kintana conserve le même parcours de demande. Cet incrément porte sur la signification métier des dates et des heures avant leur stockage ou leur affichage ; ne convertis pas toutes les valeurs en UTC sans identifier ce qu'elles représentent.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Dates et timezones : le cauchemar et comment le résoudre » :** dans le parcours demande, distingue au minimum :

- `created_at` : un instant précis déterminé par le serveur, persisté dans une représentation UTC non ambiguë ;
- une date de visite sans heure : une date civile (`YYYY-MM-DD`) qui ne doit pas changer de jour lorsqu'on l'affiche dans un autre fuseau ;
- un créneau saisi comme heure locale : une date, une heure et un identifiant de fuseau IANA explicite, à résoudre selon la règle métier avant de confirmer l'instant correspondant.

Formate les instants avec `Intl.DateTimeFormat` en fixant explicitement la locale et le fuseau. Rends les valeurs déterministes entre rendu serveur et premier rendu client ; ne dépends pas de l'horloge locale implicite pendant le rendu.

**Livrable :** note de modèle qui classe chaque champ (`instant / date civile / heure locale / durée`), exemples de données synthétiques, fonction de formatage et tests reproductibles pour deux fuseaux et un cas de frontière (minuit ou changement d'heure).

**Gate : la preuve porte sur la sémantique temporelle :**

- le même instant `created_at` conserve le même instant et s'affiche correctement dans deux fuseaux nommés ;
- la date civile sans heure conserve le même `YYYY-MM-DD` dans les deux contextes d'affichage et n'est pas décalée par une conversion UTC implicite ;
- un créneau local indique le fuseau qui donne son sens ; les heures ambiguës ou inexistantes lors d'un changement d'heure ont une règle de rejet ou de résolution explicitée, jamais un choix silencieux ;
- les appels de formatage fixent locale et fuseau ; aucun `new Date()` implicite pendant le rendu ne rend le résultat variable entre serveur et client ;
- le test de frontière montre le résultat attendu et observé, y compris la limite de ce que le test ne couvre pas.

**Contre-épreuve :** prends une date civile au voisinage de minuit UTC et montre qu'une conversion naïve peut afficher la veille ou le lendemain ; corrige le modèle sans transformer cette date en instant fictif. Une fixture déterministe prouve le comportement du code, pas la validité de tous les fuseaux et de leurs règles futures.

Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après déploiement et observation réels.

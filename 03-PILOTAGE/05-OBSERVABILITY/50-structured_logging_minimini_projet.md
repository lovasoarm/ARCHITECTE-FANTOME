---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Arrête d'écrire des logs que personne ne peut chercher

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

## TYPE

<!-- AF-DIAGRAM:secrets -->

```text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

<!-- AF-DIAGRAM:observability -->

```text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Projet fil rouge

## Niveau

[OK] Avancé

## CONTEXTE

En production, tu ne peux pas ouvrir un débogueur. Ce que tu as consigné au moment de l'incident est tout ce qu'il te reste : les logs de ton portfolio doivent donc être structurés et pas décoratifs.

## OBJECTIF

Les logs de ton portfolio permettent de reconstituer un appel qui a échoué.

## APPLICATION

- Remplace les `console.log` restants de ton code serveur par un log structuré (objet avec niveau, message, contexte).
- Ajoute systématiquement un identifiant de requête, la route et la durée de l'appel.
- Provoque une erreur sur ton appel externe (GitHub injoignable) et vérifie que le log seul suffit à comprendre ce qui s'est passé.
- Note dans `docs/observability.md` ce que tu ne dois jamais consigner (données personnelles, secrets, jetons).

## Critère de réussite

- [ ] Fait : un seul log suffit à identifier route, durée et cause de l'échec.
- [ ] Fait : aucun secret ni donnée personnelle n'apparaît dans les logs.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'apporte un identifiant de requête que l'horodatage seul ne permet pas de reconstituer ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : un échec de ton portfolio est reconstituable à partir des logs.

Tu as rendu ton propre site observable. Commit `docs/observability.md`.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Parcours observable

> **Fil narratif : Walking Dead :** Quand le camp est sous pression, le joli plan ne nourrit personne : il faut savoir qui agit, quel signal surveiller et comment revenir d’une panne. Bienvenue côté exploitation.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-structured_logging_minimini_projet » :** Dans Kintana, instrumente une requête de bout en bout, injecte une panne et rédige le diagnostic avec les seuls signaux autorisés.

Instrumente un parcours complet de création de demande : identifiant de corrélation, métrique utile et signal d’erreur. Déclenche une panne simulée puis utilise uniquement les signaux collectés pour la localiser.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un opérateur retrouve le parcours sans lire de secret ; le signal a un seuil ou une action associée ; la charge de télémétrie est justifiée. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.

---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : REST CRUD complet

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le portfolio expose déjà des données : liste de projets, fiche par slug. Les servir via une petite API REST oblige à décider des URL, des codes de statut et de la forme des réponses.

## OBJECTIF

Tes projets sont accessibles via une API dont les contrats sont explicites.

## APPLICATION

- Expose `GET /api/projects` et `GET /api/projects/:slug` pour lire la collection et une ressource.
- Expose `POST /api/projects` pour créer un projet avec un slug unique et les champs requis.
- Expose `PUT /api/projects/:slug` pour remplacer la représentation complète et `PATCH /api/projects/:slug` pour modifier uniquement les champs autorisés.
- Expose `DELETE /api/projects/:slug` pour supprimer une ressource existante.
- Valide les champs et l'unicité du slug ; refuse les propriétés non autorisées (mass assignment).
- Utilise des données en mémoire pour cet exercice si aucune persistance n'est fournie, et précise qu'elles sont perdues au redémarrage ; ne prétends pas livrer une persistance durable.
- Documente les cinq routes HTTP dans `docs/api.md` : URL, paramètres, corps, réponse, codes et erreurs possibles.

## Critère de réussite

- [ ] Fait : les cinq opérations CRUD (GET collection, GET détail, POST, PUT/PATCH, DELETE) sont testées sur des cas nominaux.
- [ ] Fait : slug absent, doublon, champ invalide, champ interdit et corps vide donnent des erreurs stables ; aucun champ comme `role` ne peut être injecté.
- [ ] Fait : `docs/api.md` décrit toutes les opérations et leurs erreurs.
- [ ] Fait : la limite de persistance (mémoire locale ou stockage réellement implémenté) est déclarée honnêtement.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi le code de statut ne doit-il pas dépendre de la mise en forme du message d'erreur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que les opérations de création, lecture, remplacement, modification partielle et suppression respectent un contrat explicite, avec des erreurs prévisibles.

Tu as écrit un contrat, pas seulement du code. Commit `docs/api.md`.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Contrat API utile

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-rest_crud_complete_minimini_projet » :** Dans Kintana, expose une capacité via un contrat stable, documente erreurs et idempotence puis teste un client ancien et un utilisateur non autorisé.

Expose une capacité Kintana avec contrat d’entrée/sortie, codes d’erreur stables, validation, autorisation et stratégie de retry/idempotence si l’opération écrit des données.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le contrat est testé côté serveur ; les erreurs sont prévisibles ; un client peut évoluer sans deviner le comportement. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.

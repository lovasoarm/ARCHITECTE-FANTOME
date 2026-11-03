---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : CSRF et CORS

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Le portfolio appelle au moins une API (GitHub, formulaire de contact). Qui peut appeler quoi, depuis quelle origine, avec quelles informations d'authentification : c'est ce que règlent CORS et les protections anti-CSRF.

## OBJECTIF

Tu sais quelle origine peut appeler ton API et pourquoi une requête écrite doit être protégée.

## APPLICATION

- Liste les appels sortants et entrants de ton portfolio : URL, méthode, données envoyées, secret éventuel.
- Depuis une page servie sur une autre origine (ou un simple `fetch` dans la console d'un autre site), tente d'appeler ta route d'API et lis le message d'erreur obtenu.
- Vérifie que les en-têtes CORS de ta route n'autorisent que les origines dont tu as besoin.
- Pour toute route qui écrit (formulaire de contact), note quelle protection empêche une soumission déclenchée par un site tiers.

## Critère de réussite

- [ ] Fait : l'appel depuis une origine non autorisée est refusé et tu sais lire le message.
- [ ] Fait : chaque route qui écrit a une protection identifiée par écrit.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

En quoi CORS protège-t-il le navigateur plutôt que ton serveur, et pourquoi une protection anti-CSRF reste-t-elle nécessaire ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton API n'accepte que les origines prévues et que tes routes d'écriture sont protégées.

Tu as transformé deux acronymes en propriétés observables de ton propre projet. Commit tes notes.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Livraison produit obligatoire : Kintana : Frontière de confiance

> **Fil narratif : Walking Dead :** Quand le camp est sous pression, le joli plan ne nourrit personne : il faut savoir qui agit, quel signal surveiller et comment revenir d’une panne. Bienvenue côté exploitation.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-csrf_cors_minimini_projet » :** Dans Kintana, teste la frontière entre deux rôles et deux tenants : l’accès interdit doit échouer côté serveur sans fuite de données.

Applique la notion à une route Kintana utilisée par demandeur, agent ou superviseur. Définis la menace, impose le contrôle côté serveur et écris des tests négatifs avec deux comptes distincts.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un utilisateur ne lit/modifie pas la ressource d’un autre ; le refus ne révèle pas de donnée privée ; l’événement sensible est auditable. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.

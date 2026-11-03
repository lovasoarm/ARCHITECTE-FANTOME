---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, preuve_partielle]
anti_recipe_key: changement_echelle+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Stocker un mot de passe : Argon2id et compatibilité bcrypt

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Si ton portfolio ajoute un espace protégé (page admin, section privée), il manipule un mot de passe. Un mot de passe ne se chiffre pas et ne se compare pas en clair : il se hache avec un algorithme lent et salé.

## OBJECTIF

Un mot de passe de ton projet n'est jamais stocké en clair. Pour le vérifier, utilise la fonction `verify` de l'algorithme retenu ; ne compare jamais le mot de passe ni deux chaînes de hash avec `===`. Pour un nouveau stockage, utilise Argon2id.

## APPLICATION

- Dans un fichier isolé, hache la même chaîne deux fois avec Argon2id (bibliothèque `argon2`) et compare les deux empreintes obtenues.
- Explique pourquoi les deux empreintes diffèrent alors que le mot de passe est identique.
- Écris la vérification correcte avec `argon2.verify(hash, password)`, jamais avec `===`.
- Note les paramètres mémoire/itérations/parallélisme et l'arbitrage sécurité / temps de réponse.
- Explique dans quel cas un projet existant peut devoir conserver bcrypt et pourquoi ce n’est pas le choix par défaut d’une nouvelle application.
- Installe `argon2` avec `npm install argon2` si nécessaire.

## Critère de réussite

- [ ] Fait : deux hachages du même mot de passe donnent des empreintes différentes.
- [ ] Fait : la comparaison passe par la fonction dédiée de la bibliothèque.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

À quoi sert le sel, et pourquoi un algorithme volontairement lent est-il un avantage ici ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : le hachage produit une empreinte salée et non réversible, comparable seulement via la fonction dédiée.

Tu sais désormais reconnaître un stockage de mot de passe incorrect dans n'importe quel code que tu liras. Commit tes notes.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Livraison produit obligatoire : Kintana : Frontière de confiance

> **Fil narratif : Walking Dead :** Quand le camp est sous pression, le joli plan ne nourrit personne : il faut savoir qui agit, quel signal surveiller et comment revenir d’une panne. Bienvenue côté exploitation.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-hashing_bcrypt_minimini_projet » :** Applique la notion à une route Kintana utilisée par demandeur, agent ou superviseur. Définis la menace, impose le contrôle côté serveur et écris des tests négatifs avec deux comptes distincts.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un utilisateur ne lit/modifie pas la ressource d’un autre ; le refus ne révèle pas de donnée privée ; l’événement sensible est auditable. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.

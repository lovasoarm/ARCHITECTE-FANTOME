---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, preuve_partielle]
anti_recipe_key: fausse_piste+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 05 : Devsec perso : protège ton chakra avant d'affronter les ninjas renégats du net

Temps de lecture ~5 min

Ton laptop dev, c'est un coffre. Dedans : tes clés SSH, tes tokens de forge (GitHub par exemple), tes `.env` avec des vraies clés API. Le premier vol de compte dev, c'est presque toujours l'auteur qui a merdé.

## Le socle

1. **SSH keys** : `ssh-keygen -t ed25519 -C "toi@mail"`. Passphrase **obligatoire**.
2. **2FA de ta forge** (GitHub par exemple) : app authenticator, pas SMS. Backup codes stockés hors ligne.
3. **`.gitignore` global** :

```bash
git config --global core.excludesfile ~/.gitignore_global
```

Dedans : `.env`, `.env.*`, `*.pem`, `.DS_Store`, `node_modules/`. 4. **Jamais de secret dans un commit.** Si ça arrive : révoque immédiatement, `git filter-repo` ensuite. L'ordre compte. 5. **`npm audit`** régulièrement. `npm audit fix` avec parcimonie (peut casser).

## Le piège assistant de code

Une IA peut te générer du code sous licence GPL sans te prévenir. Voir `05-MAITRISE/06-ANNEXES/08-ethics_and_licenses.md`.

## Détecteur maison

```bash
# pre-commit hook basique
grep -rE "(api[_-]?key|secret|password)\s*=\s*['\"]" --include="*.js" .
```

## Mission

Configure `.gitignore` global, protège le compte de forge que tu utilises avec 2FA, et régénère une clé SSH ed25519 avec passphrase. En mode local/offline, documente simplement la protection attendue pour le jour où une forge distante sera utilisée.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

<!-- AF-DIAGRAM:setup -->

## Repère visuel utile : Environnement reproductible et livraison

```text
clone propre
    |
    v
versions épinglées -> dépendances déclarées
    |                     |
    +----------+----------+
               v
       contrôle des prérequis
               |
       +-------+-------+
       v               v
    démarrage       blocage utile
       |               |
       v               v
    smoke test     diagnostic clair
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** Un environnement non reproductible transforme un bug logiciel en chasse au trésor. Le but est que deux machines puissent exécuter le même projet avec des versions et des étapes connues.
- **Quand l’utiliser / quand l’éviter :** Prépare ou répare l'environnement avant une modification, un onboarding ou une livraison. N'ajoute pas d'outil si une commande native et documentée suffit.
- **Limites :** Un setup reproductible ne garantit pas que le service fonctionne en production ; il réduit seulement les différences d'environnement. Les secrets et données personnelles ne doivent jamais entrer dans le dépôt.

## Mécanisme : la version sans magie

Épingle les versions, déclare les dépendances, sépare configuration et secrets, puis vérifie les commandes depuis un clone propre.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **05 : Devsec perso : protège ton chakra avant d'affronter les ninjas renégats du net** se rattache à ce cas concret : Kintana doit pouvoir être repris par un autre développeur sur une machine modeste. Une commande absente, un runtime différent ou une variable cachée doit être détectable avant de toucher aux données.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Environnement reproductible et livraison

> **Arc Konoha / Naruto :** avant de partir en mission, l'équipe vérifie les outils, les accès et le plan. Sinon, tu découvres le problème au pire moment.

**Mission liée à « 05 : Devsec perso : protège ton chakra avant d'affronter les ninjas renégats du net » :** Prépare un clone propre du projet Kintana : vérifie le runtime, installe seulement les dépendances déclarées, ajoute un contrôle de configuration sans afficher les secrets et documente le démarrage ainsi que le nettoyage.

**Livrable :** un `SETUP.md`, un fichier de versions, un contrôle automatisé de prérequis et une capture de commandes réellement exécutées.

**Critères d’acceptation :** un autre poste suit la procédure sans deviner ; une version incorrecte échoue avec un message utile ; aucun secret n'est commité ; les commandes décrites existent.

**Transfert obligatoire :** Rejoue la procédure sur une machine différente ou avec un runtime manquant. Documente ce qui change sans prétendre tester un environnement que tu n'as pas utilisé.

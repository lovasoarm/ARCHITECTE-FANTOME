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

Ton laptop dev, c'est un coffre. Dedans : tes clés SSH, tes tokens GitHub, tes `.env` avec des vraies clés API. Le premier vol de compte dev, c'est presque toujours l'auteur qui a merdé.

## Le socle

1. **SSH keys** : `ssh-keygen -t ed25519 -C "toi@mail"`. Passphrase **obligatoire**.
2. **2FA GitHub** : app authenticator, pas SMS. Backup codes stockés hors ligne.
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

Configure `.gitignore` global, active 2FA GitHub, régénère une clé SSH ed25519 avec passphrase.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

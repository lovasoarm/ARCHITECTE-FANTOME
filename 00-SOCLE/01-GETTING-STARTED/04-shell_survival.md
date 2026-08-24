---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, constraints_injectees]
anti_recipe_key: defaut_cache+constraints_injectees
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 02 : Shell : survie en territoire hostile

Temps de lecture ~5 min

Ton terminal, c'est ton katana. Pas d'IDE qui te tient la main. Dix commandes couvrent déjà une grande partie des situations courantes.

## Le kit minimum

```text
pwd        # où suis-je
ls -la       # qui vit ici (fichiers cachés inclus)
cd dossier     # entrer
cd ..       # sortir
mkdir -p a/b/c   # créer une arbo
rm -rf poubelle  # supprimer (attention: pas de corbeille)
cp -r src dst   # copier
mv old new     # renommer/déplacer
cat fichier    # afficher
less fichier    # afficher gros fichier (q pour quitter)
```

## Chercher : `find` + `grep`

```bash
find . -name "*.md"      # tous les .md sous ici
grep -rn "" .       # chercher "" récursif avec n° ligne
find . -name "*.js" | xargs grep -l "eval"  # combo
```

## Pipe et redirection

```text
cmd1 | cmd2    # sortie de 1 devient entrée de 2
cmd > fichier   # écraser
cmd >> fichier   # ajouter à la fin
cmd 2> err.log   # rediriger les erreurs
```

## Piège

`rm -rf /` détruit ta machine. `rm -rf $VAR/` détruit ta machine si `$VAR` est vide. Vérifie **avant** d'appuyer sur Entrée.

## Mission

1. Crée `/tmp/mission/{a,b,c}`.
2. Trouve tous les `.md` dans le ce parcours qui contiennent le mot "closure".
3. Compte-les. Sans utiliser d'IDE.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

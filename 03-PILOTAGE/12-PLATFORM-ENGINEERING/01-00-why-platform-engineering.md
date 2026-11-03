---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** si chaque régiment construit son propre mur, sa propre porte et sa propre alarme, la bataille n’est pas contre les titans : elle est contre la duplication.

# Pourquoi Platform Engineering existe

Une plateforme interne doit réduire la charge cognitive et le toil sans retirer le contrôle aux équipes.

Question Staff :

> « Qu’est-ce que nous pouvons standardiser une fois pour éviter que cinquante équipes répètent cinquante fois la même erreur ? »

Le produit de la plateforme est le **chemin de travail des équipes**, pas Kubernetes lui-même.

<!-- AF-DIAGRAM:runtime -->

## Repère visuel utile : Service Kintana reproductible et arrêtable

```text
processus démarre
      |
      v
valider config / secrets
      |
  +---+---+
  v       v
ready   échec explicite
  |
  v
traiter requêtes
  | SIGTERM
  v
drain -> fermer ressources -> exit
```

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi Platform Engineering existe** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Pourquoi Platform Engineering existe » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.

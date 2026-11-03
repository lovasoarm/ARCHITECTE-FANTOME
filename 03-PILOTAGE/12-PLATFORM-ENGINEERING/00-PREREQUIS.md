---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Naruto :** avant d'organiser un village entier, comprends le rôle de ses chemins, de ses portes et de ses règles. Ce module enseigne justement comment rendre la livraison répétable et sûre.

# Prérequis : Platform Engineering

Ce diagnostic ne bloque pas la lecture du module. Aucune expérience préalable en Kubernetes, cloud payant ou plateforme interne n'est requise. Tu peux étudier les schémas et le cas fil rouge avant d'avoir un environnement d'exploitation.

## Repères de vocabulaire

- **Image** : paquet immuable utilisé pour créer un conteneur ; **conteneur** : processus isolé qui exécute ce paquet.
- **CI/CD** : étapes automatisées qui vérifient puis livrent un changement.
- **Configuration versionnée** : configuration conservée dans un historique révisable.
- **Secret** : donnée confidentielle (mot de passe, token, clé) qui ne doit pas être codée en dur.
- **Déploiement progressif** : exposer une nouvelle version par étapes.
- **Health check** : signal technique indiquant si le service peut fonctionner.
- **Rollback** : revenir de façon contrôlée à une version précédente.

## Remédiation ciblée

- Git et historique : [Git core](../../00-SOCLE/04-FUNDAMENTALS/02A-git_core.md).
- Runtime, processus et configuration : [Runtime Environment](../../02-CONSTRUCTION/13-RUNTIME-ENV/README.md).
- Secrets et autorisations : [Security](../04-SECURITY/README.md).
- Logs, métriques et traces : [Observability](../05-OBSERVABILITY/README.md).
- Conteneurs, déploiement et coûts : commence par [Cloud Foundations](../07-CLOUD-FOUNDATIONS/README.md) et ses exemples locaux/simulés.

## Verdict

- **Repères compris** → poursuis le module et réalise le cas fil rouge.
- **Repères nouveaux** → commence la lecture ; ouvre les ressources de remédiation avant le challenge qui demande de concevoir le chemin de livraison. Le challenge doit être justifié par un schéma, une procédure et des preuves, pas par le simple fait de posséder un cluster.

Les exemples locaux et simulés suffisent pour apprendre les mécanismes. N'ouvre pas de compte cloud payant et ne déploie pas de cluster réel uniquement pour franchir ce diagnostic.

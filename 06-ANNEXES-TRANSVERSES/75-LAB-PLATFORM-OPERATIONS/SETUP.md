# SETUP : Platform Operations Lab

## Vérifier les outils

```bash
python --version
docker --version
docker compose version
```

Le plancher de compatibilité annoncé est Python 3.12+. Pour une nouvelle installation apprenant au 31 octobre 2026, préfère Python 3.15.x, branche la plus récente en correctifs réguliers. Python 3.12 est en correctifs de sécurité uniquement ; vérifie les artefacts disponibles pour ton système sur le site officiel avant installation. Vérifie la [passerelle Python débutant](../../00-SOCLE/07-PYTHON-PASSERELLE/README.md) avant le laboratoire. Docker Engine et le plugin Compose sont uniquement nécessaires aux exercices de conteneurisation.

Sous Windows, `py -3.15 --version` peut être utilisé ; sur macOS/Linux, utilise `python3 --version` si la commande `python` n’est pas configurée. Remplace alors `python` dans les exemples par le lanceur de ton système. Le tag `python:3.12-slim` du Dockerfile est une référence de conteneur distincte ; ne le confonds pas avec le runtime hôte recommandé.

## Ne pas installer par anticipation

Aucun package Python tiers n'est requis. N'exécute pas `pip install` pour ce laboratoire. La partie Cloud/Kubernetes est une extension avec compte sandbox, budget et validation séparés.

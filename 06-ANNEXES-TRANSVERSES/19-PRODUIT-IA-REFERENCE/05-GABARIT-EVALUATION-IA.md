---
stability: stable
acte: preuve
noyau: oui
route_family: transversal-g8
---

# 05 : Gabarit de preuve : évaluation IA (G8)

Copie ce fichier dans ton dépôt de projet sous `PREUVES/EVALUATION-IA.md`. Complète-le après
avoir exécuté `node eval/run.mjs` dans le laboratoire de référence. Les résultats doivent être
réels, datés et reproductibles ; ne remplace pas une sortie manquante par une valeur inventée.

## 1. But et périmètre

- Date / commit du laboratoire :
- Version de l'ensemble de cas :
- Fonction évaluée :
- Hypothèse à tester :
- Ce qui est hors périmètre :

## 2. Méthode

- Commande exécutée :
- Nombre de cas :
- Critères de réussite / seuils :
- Cas adversariaux ou limites représentés :
- Référence déterministe de comparaison :

## 3. Résultats observés

| Mesure                                          | Résultat réel | Seuil / comparaison | Interprétation |
| ----------------------------------------------- | ------------- | ------------------- | -------------- |
| Exactitude / pertinence selon le critère choisi |               |                     |                |
| Cas échoués ou refusés                          |               |                     |                |
| Latence (si mesurée)                            |               |                     |                |
| Coût ou proxy de coût (si applicable)           |               |                     |                |

Joins le résultat brut ou un lien vers le rapport généré. Indique les versions, l'environnement
et les conditions pour qu'une autre personne puisse rejouer l'évaluation.

## 4. Reproductibilité et livraison

- Hash SHA-256 du corpus et du jeu d'évaluation :
- Runtime exact et OS/architecture :
- Image/conteneur (tag et digest réellement observé, si utilisé) :
- Commande de démarrage et configuration non secrète :
- Test unitaire/intégration et commit testé :
- Volume/concurrence de charge, p50/p95/max et codes HTTP :
- Résultat health/readiness et méthode de rollback :

Ne joins jamais la valeur de `API_TOKEN`, `LLM_API_KEY` ou un dump contenant des données confidentielles.

## 5. Erreurs et limites

- Une erreur plausible observée :
- Un cas non couvert par les tests :
- Un biais ou risque de fuite de données identifié :
- Ce que le benchmark ne prouve pas :

## 6. Décision d'ingénierie

- Décision : utiliser / limiter / revoir / refuser la brique IA.
- Cas où l'IA doit être refusée ou remplacée par une réponse déterministe :
- Contrôle humain ou mécanisme de vérification :
- Condition d'arrêt / fallback :
- Condition qui ferait changer la décision :

## 7. Sécurité, données et coût

- Données envoyées à un modèle externe : aucune / description précise :
- Permissions accordées à l'outil ou agent :
- Données personnelles ou secrets :
- Budget maximal / limite d'appel ou raison d'absence de coût réel :
- Risque résiduel et mitigation :

## 8. Conclusion honnête

Écris en quelques lignes ce qui a été démontré, ce qui n'a pas été démontré et quelle preuve serait
nécessaire avant de mettre la brique en production. **Un benchmark local T0 ne constitue pas une
preuve de production ni une expérience professionnelle.**

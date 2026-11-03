---
stability: intemporel
acte: construire
artefact: gabarit-apprenant
---

# SECURITY : préparation propre à 04 BREAKING CACHE

Ce document est un gabarit à compléter par l'apprenant. Il ne certifie pas une sécurité déjà obtenue.

## 1. Actifs et frontières

- Donnée mise en cache : snapshot de résumé de stock non sensible.
- Source de vérité : repository/source qui persiste le stock.
- Périmètre d'isolation : tenant + boutique.
- Processus : une instance Node.js locale, pas de cache partagé.
- Données interdites dans ce cache pédagogique : secrets, tokens, mots de passe et données personnelles.

À compléter pour ton implémentation :

- Entrées et valeurs réellement acceptées :
- Identifiants de tenant/boutique validés par :
- Composants autorisés à construire la clé :
- Endroits où les données peuvent être journalisées :

## 2. Menaces pertinentes

| Menace                                                                   | Conséquence possible                                                    | Contrôle / preuve à produire                                                                    |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Clé tenant incomplète ou collision de sérialisation (ex. séparateur `:`) | fuite du résumé d'une autre boutique                                    | tuple JSON ou sérialisation injective + test des couples ambigus                                |
| Clé libre contrôlée par un appelant                                      | accès à une entrée hors de son périmètre                                | construire la clé dans le service à partir d'identifiants validés                               |
| TTL invalide ou horloge non monotone                                     | valeur qui reste trop longtemps ou expire immédiatement                 | validation du TTL, horloge monotone par défaut et tests avec horloge injectée                   |
| donnée périmée après mise à jour                                         | résumé de stock faux                                                    | invalider après commit réussi ; test de non-invalidation si commit échoue                       |
| loader en erreur puis valeur partielle cachée                            | donnée incorrecte servie sur les lectures suivantes                     | test : erreur du loader → aucune entrée                                                         |
| journal contenant la valeur cache                                        | exposition de données inutiles                                          | ne journaliser ni payload ni secret ; inspecter les logs produits                               |
| croissance de clés sans borne                                            | consommation mémoire croissante ; entrée expirée jamais relue conservée | cardinalité bornée dans la fixture ; expliciter qu'une politique de capacité est hors périmètre |

## 3. Dépendances et secrets

- Dépendances runtime : aucune prévue.
- `package.json` créé par l'apprenant ? :
- Dépendances ajoutées et justification :
- Secrets ou variables d'environnement réellement nécessaires :
- Commande exécutée et résultat daté (ou `NON EXÉCUTÉ`) :

N'ajoute pas de scan `npm audit` artificiel si tu n'as aucune dépendance. Si tu en ajoutes, documente leur nécessité, leur version et le résultat du contrôle adapté.

## 4. Limites connues

Ce projet ne prouve pas la sécurité d'un système multi-instance ou distribué. Une lecture concurrente commencée avant l'invalidation peut éventuellement réinsérer une ancienne valeur ; l'expiration borne une partie du risque mais ne supprime pas toutes les courses. Décris ce risque et la stratégie qui serait étudiée avant une mise en production.

## 5. Décision

- Risques effectivement testés :
- Risques non testés / hors périmètre :
- Risque résiduel accepté :
- Preuves (fichier, test, ligne, résultat réel) :
- Décision et justification :
- Seuil de réouverture :

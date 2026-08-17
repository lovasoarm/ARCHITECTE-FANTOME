---
stability: perissable_2027
acte: restituer
---

# Grimoire : Niveau 07, API Dojo

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Mémo à ouvrir avant d'exposer ou de modifier un endpoint. Sert à vérifier le contrat, pas à
réviser la liste des verbes HTTP.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Contrat d'API | L'ensemble des garanties sur lesquelles un client a le droit de s'appuyer sans risquer une casse au prochain déploiement. | `openapi: 3.1.0\npaths:\n  /reservations:\n    get: {}` | menu affiché qui engage la cuisine sur ce qui est réellement servi / carte marine qui engage sur les hauts-fonds réellement présents | Cette analogie casse quand le message se perd ou arrive deux fois : l'image suppose un canal fiable, le reseau ne l'est pas. |
| Compatibilité ascendante | Un client ancien continue de fonctionner face à un serveur nouveau. | `// champ ajoute, jamais retire : ancien client ignore le nouveau champ` | un vieux ticket de commande reste lisible même avec la nouvelle carte / un vieux plan de route reste valide même avec les nouvelles balises | « un vieux ticket de commande reste lisible même avec la nouvelle carte » a une frontière visible à l'oeil ; sur Compatibilité ascendante, la validation côté client ne protège rien, l'appel direct existe toujours. Valide l'entrée côté serveur, systématiquement. |
| Compatibilité descendante | Un client nouveau continue de fonctionner face à un serveur ancien. | `// le nouveau client tolere l'absence du nouveau champ cote serveur` | la nouvelle recrue sait encore lire l'ancien système de tickets / le nouveau matelot sait encore lire le vieux livre de bord | « la nouvelle recrue sait encore lire l'ancien système de tickets » suppose que quelqu'un surveille ; sur Compatibilité descendante, la validation côté client ne protège rien, l'appel direct existe toujours. Valide l'entrée côté serveur, systématiquement. |
| Idempotence | Une opération répétée produit le même résultat que l'exécution unique. | `if (dejaTraite(cle)) return reponsePrecedente(cle);` | un même bon de commande renvoyé deux fois ne fait pas deux plats / une même manœuvre rejouée ne double pas le nœud | « un même bon de commande renvoyé deux fois ne fait pas deux plats » s'arrête à la première surprise ; sur Idempotence, l'idempotence n'est pas gratuite : il faut une clé et un stockage pour la garantir. Versionne et annonce une date d'extinction dès la publication. |
| Idempotency key | Identifiant généré côté client à l'intention, pas à chaque tentative réseau. | `const cle = crypto.randomUUID(); // genere une fois, avant tout retry` | numéro de ticket pris une fois en salle, pas à chaque passage en cuisine / numéro de manœuvre décidé une fois par le skipper, pas à chaque essai | « numéro de ticket pris une fois en salle, pas à chaque passage en... » s'arrête à la première surprise ; sur Idempotency key, la validation côté client ne protège rien, l'appel direct existe toujours. Écris le contrat avant l'implémentation, et teste-le des deux côtés. |
| Authn / Authz | Authn vérifie qui appelle ; Authz vérifie ce que cet appelant a le droit de faire. | `if (!user) throw 401; if (!user.peut("annuler")) throw 403;` | badge du personnel vs droit d'accès à la réserve du chef / identité du matelot vs droit de toucher à la barre | Cette analogie casse face a un adversaire actif : l'image decrit un usage normal, la securite se juge sur l'usage hostile. |
| Rate limiting | Limitation du débit d'appels d'un client. | `if (compteur(clientId) > seuilParSeconde) throw 429;` | cuisine qui refuse de prendre plus de commandes que sa cadence / port qui limite le nombre de bateaux entrant en même temps | « cuisine qui refuse de prendre plus de commandes que sa cadence » raconte le cas nominal ; sur Rate limiting, un champ retiré ou renommé casse silencieusement à l'appel suivant du consommateur. Mesure la latence de bout en bout, dépendances comprises. |
| Latence perçue | Le temps d'attente ressenti, distinct du temps de réponse mesuré côté serveur. | `afficherAccuseReception(); await requeteReelle();` | accusé de réception immédiat en salle pendant que la cuisine prépare / retour radio immédiat pendant que la manœuvre s'exécute | Cette analogie casse quand le message se perd ou arrive deux fois : l'image suppose un canal fiable, le reseau ne l'est pas. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Tableau des codes HTTP et de leur "retryabilite"

```text
400 non-retryable   401 non-retryable   403 non-retryable   404 non-retryable
409 retryable apres relecture d'etat    422 non-retryable
429 retryable apres Retry-After         500 retryable avec prudence + idempotence
503 retryable avec backoff
```

## Checklist avant d'exposer un endpoint a un deuxieme appelant

- [ ] Le contrat de réponse est écrit (schéma ou document), pas seulement implicite dans le
      code du serveur.
- [ ] Chaque erreur possible a un `code` machine stable, en plus d'un message humain.
- [ ] Tout `POST`/`PATCH` a effet accepte une cle d'idempotence et la vérifie réellement.
- [ ] Tout endpoint de liste est pagine, avec une taille de page maximale imposee.
- [ ] Le token d'un appelant porte un scope et un perimetre de ressources explicites, jamais
      un acces admin reutilise par facilite.
- [ ] Chaque frontiere de confiance revalide ce qui la traverse, sans supposer qu'une
      verification faite plus haut suffit.
- [ ] Un timeout explicite existe sur chaque appel réseau sortant.
- [ ] Les retries automatiques utilisent un backoff exponentiel avec jitter, jamais une
      boucle serree.
- [ ] Aucun secret n'apparait dans le code source, une URL, ou un log.

## Strategie de versionnage : arbre de décision

```text
Le changement retire, renomme ou change le type d'un champ existant ?
  OUI --> rupture. Nouvelle version, ou report du changement a une refonte annoncee.
  NON |

Le changement ajoute une valeur a une enumeration existante ?
  OUI --> a risque pour les clients avec switch exhaustif. Documenter, annoncer, surveiller.
  NON |

Le changement ajoute un champ optionnel ou un nouvel endpoint ?
  OUI --> additif, safe. Pas de nouvelle version necessaire.
```

## Formule mentale pour la pagination

```text
Volume de la liste borne et petit (< quelques milliers, croissance lente) --> offset acceptable
Volume non borne ou en forte croissance, ou insertions/suppressions frequentes --> curseur
```

## Heuristique de secours

Avant de livrer un endpoint, demande-toi : "si cet appelant retente cette requete trois fois
d'affilee a cause d'un réseau instable, qu'est-ce qui se passe exactement dans mon système ?"
Si la réponse n'est pas "rien de plus qu'une seule tentative", l'idempotence n'est pas
réglée : indépendamment de ce que dit le reste du code.

## Si tu rates le boss-fight

Relis d'abord le critère qui a plafonne ta note : refus argumente des raccourcis, solution
livrable en trois jours, ou mecanisme anti-recidive. Reprends la scene en listant separement
ce qui touche un scope mal defini et ce qui est un détail acceptable. Relis la checklist
ci-dessus. Attends 48 h avant de retenter le boss-fight pour juger la scene a froid. Si
l'echec se reproduit sur le meme critère, redescends au niveau 06 relire "frontiere de
confiance" : un scope mal pose est souvent une frontiere jamais revalidee.

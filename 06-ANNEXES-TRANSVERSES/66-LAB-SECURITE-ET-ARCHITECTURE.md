---
stability: evolutif
acte: pratiquer
noyau: renfort
route: formation-complete
prerequis:
  - 03-PILOTAGE/04-SECURITY/README.md
  - 02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/README.md
  - 02-CONSTRUCTION/19-API-CRAFT/README.md
---

# 66 : Laboratoire sécurité et architecture : les frontières comptent

> Ce laboratoire apprend à prouver une propriété de sécurité, pas à cocher une liste de mécanismes. Un contrôle d'entrée, un token ou une clé de cache ne suffisent pas sans définition de l'identité, de la ressource, de l'action et du contexte de confiance.

## Scénario commun

Une application héberge des dossiers appartenant à plusieurs organisations. Les utilisateurs peuvent lire ou modifier certains dossiers selon leur rôle et leur relation avec l'organisation. L'application utilise une API, un stockage persistant et éventuellement un cache. Le même raisonnement s'applique à des documents de recherche, des résultats RAG ou aux données d'un tableau de bord.

## Atelier A : Modèle de menace avant le correctif

Construis un schéma des composants, des flux de données et des frontières de confiance. Liste les actifs, acteurs, surfaces d'entrée et impacts. Inclus au minimum : utilisateur authentifié malveillant, identifiant de dossier modifié, rôle révoqué, cache partagé, journal trop bavard, service externe lent ou compromis.

Pour chaque menace, écris :

- précondition et capacité de l'attaquant ;
- actif et impact potentiel ;
- contrôle préventif ;
- détection observable ;
- test négatif ;
- risque résiduel et hypothèse restante.

**Correction de référence :** l'identité prouve qui formule la requête ; elle ne prouve pas qu'elle a accès à chaque ressource. L'autorisation doit prendre en compte la relation utilisateur-action-ressource et s'appliquer au moment où la donnée est exposée ou modifiée. Les contrôles en interface améliorent l'expérience mais ne remplacent pas une décision côté serveur.

## Atelier B : IDOR / contrôle d'accès au niveau objet

### Version défectueuse

```js
async function getDocument(request, repository) {
  return repository.findById(request.params.documentId);
}
```

Le code utilise une identité de document fournie par le client mais n'applique aucune politique d'accès visible.

### Travail

1. Écris deux organisations A et B avec deux utilisateurs et un document de chacune.
2. Teste lecture, mise à jour et suppression d'un document par le propriétaire autorisé.
3. Répète exactement les mêmes opérations avec l'identifiant valide mais l'utilisateur d'une autre organisation.
4. Teste un document inexistant et un document dont l'autorisation a été révoquée.
5. Corrige la frontière serveur pour appliquer une autorisation vérifiable avant de retourner les données.

### Correction de référence

La requête du dépôt doit être liée au périmètre autorisé ou suivie d'un contrôle d'accès explicite fiable ; le contrôle doit se trouver sur la frontière serveur qui protège la donnée. Les scénarios négatifs doivent prouver qu'aucun contenu sensible n'est retourné, modifié ou transmis à un composant aval. Le comportement public peut volontairement rendre « absent » et « interdit » indiscernables pour réduire l'énumération ; cette décision doit être cohérente et testée.

**Échec éliminatoire :** le test ne vérifie que le code HTTP et ignore qu'un extrait ou une donnée sensible est présent dans le corps, les logs, le cache ou une citation.

## Atelier C : Révocation et cache

### Situation

Un utilisateur perd l'accès à un dossier, mais une réponse en cache reste valide pendant dix minutes. Le cache est indexé uniquement par `documentId`.

### Travail

Compare les options suivantes : TTL seul ; invalidation à la révocation ; cache incluant le principal et le contexte d'autorisation ; vérification d'accès avant livraison ; absence de cache pour cette ressource. Évalue coût, latence, complexité, fenêtre d'exposition et comportement en cas d'indisponibilité du service d'autorisation.

### Correction de référence

Un TTL borne parfois l'ancienneté mais ne garantit pas la révocation immédiate. Une clé incluant l'identité peut prévenir certains partages de réponse, sans prouver que les droits de cette identité n'ont pas changé. Pour une donnée protégée, choisir et démontrer une propriété explicite de révocation. En cas de panne du service d'autorisation, la stratégie sûre par défaut pour une ressource sensible est de ne pas exposer la donnée tant qu'une décision valide n'est pas obtenue, sauf politique de dégradation formellement justifiée.

**Transfert :** applique le même modèle aux embeddings, résultats de retrieval, extraits cités, résumés générés et réponses conservées.

## Atelier D : Entrées, requêtes et erreurs

Conçois les tests de sécurité suivants pour une route de consultation :

- identifiant mal formé et longueur excessive ;
- tentative d'injection dans un filtre ;
- utilisateur absent, expiré ou révoqué ;
- accès cross-tenant ;
- dépendance indisponible ;
- données sensibles dans une erreur ou un log ;
- donnée ayant changé d'autorisation entre retrieval et réponse.

**Correction de référence :** valider le format à la frontière n'est pas la même chose que décider des permissions. Les valeurs de requête doivent être transmises par des paramètres et non concaténées dans du SQL ; le choix d'une table/colonne dynamique nécessite une liste blanche lorsqu'il ne peut pas être paramétré comme une valeur. Les erreurs publiques doivent rester utiles sans révéler secrets, requêtes, tokens ou contenu sensible. Les logs doivent être structurés et minimisés.

## Atelier E : Décider une frontière d'architecture

Deux solutions sont proposées :

- **A :** un service modulaire, une base, une politique d'accès commune et une livraison simple ;
- **B :** plusieurs services et stockages, avec responsabilités séparées et appels réseau supplémentaires.

L'équipe est petite, le domaine change souvent et deux intégrations pourraient arriver, sans demande confirmée de mise à l'échelle indépendante.

Rédige une ADR courte avec : contexte, exigences/non-objectifs, options, décision, alternatives rejetées, risques, métriques, plan de migration, condition de révision et « preuve qui me ferait changer d'avis ».

**Correction de référence :** la solution simple est souvent un bon point de départ si elle satisfait les besoins et conserve des frontières utiles. Le choix ne doit pas être fondé uniquement sur l'équipe actuelle ou sur l'éventualité d'un trafic futur ; il doit expliciter le coût de coordination et le coût d'une future extraction. Une architecture distribuée apporte des pannes réseau, des contrats et une complexité opérationnelle qu'il faut justifier par un besoin mesurable.

## Épreuve adverse obligatoire

Une fois le système corrigé, fais l'une des modifications suivantes sans modifier à l'avance les tests :

1. révoquer un droit après le chargement de la page mais avant l'appel d'API ;
2. changer le tenant tout en conservant un documentId valide ;
3. servir une entrée de cache après changement d'autorisation ;
4. supprimer le service d'autorisation ou lui faire retourner une erreur.

Prédiction écrite avant exécution. Le système doit soit préserver la propriété de sécurité, soit échouer fermé d'une manière documentée et observable. Ajoute une seconde variante différente pour le test de transfert.

## Grille de sortie

| Dimension        | Gate obligatoire                                                          |
| ---------------- | ------------------------------------------------------------------------- |
| Modèle de menace | Au moins 4 menaces reliées aux actifs, frontières et effets               |
| Autorisation     | Cas autorisé et non autorisé prouvés sur l'API, pas seulement l'interface |
| Révocation       | Fenêtre de révocation déclarée, mesurée ou justifiée par une garantie     |
| Données dérivées | Cache, logs et sorties aval traités dans les tests                        |
| Architecture     | Deux options plausibles, coûts et signaux de révision écrits              |
| Transfert        | Au moins deux dimensions changées et nouvelle preuve                      |

**Échec éliminatoire :** fuite cross-tenant, dépendance à la seule validation côté client, fail-open involontaire ou revendication de sécurité sans test négatif. Une moyenne n'annule jamais une faille critique.

## Livrable

Schéma de flux annoté, matrice identité-action-ressource, tests négatifs, décisions de cache/révocation, ADR, résultat de l'épreuve adverse et risques résiduels. Références : [Route apprenant cohérente](58-ROUTE-APPRENANT-COHERENTE.md), [Lab service IA](60-LAB-SERVICE-IA-END-TO-END.md), [Lab cycle de vie](59-LAB-DEVOPS-LIFECYCLE.md).

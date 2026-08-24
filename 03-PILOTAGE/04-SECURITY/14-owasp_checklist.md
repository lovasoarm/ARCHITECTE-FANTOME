## perishability_id: PER-0044

stability: perissable
last_reviewed: 2026-08
depends_on_vendor: true
cognitive_level: L4

---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n’est jamais vérifiée est juste un costume brillant. Chaque garde-fou doit être testable et attaquable.

# OWASP TOP 10:2025 : CHECKLIST OPÉRATIONNELLE

Temps de lecture ~15 min

L’OWASP Top 10:2025 est la taxonomie de référence de ce module. Elle distingue dix grandes familles de risques : contrôle d’accès, configuration, chaîne d’approvisionnement, cryptographie, injection, conception, authentification, intégrité logiciel/données, journalisation/alerting et gestion des conditions exceptionnelles.

Source primaire : https://owasp.org/Top10/2025/

> **Règle pédagogique :** une catégorie n’est pas une preuve de sécurité. Pour chaque risque, identifie le mécanisme, le garde-fou, le test et le signal d’échec.

## A01:2025 : Broken Access Control

Question : un utilisateur peut-il faire quelque chose que son identité, son rôle ou sa ressource ne l’autorise pas à faire ?

À vérifier :

- autorisation côté serveur, jamais seulement dans l’interface ;
- propriété de la ressource (`user_id`, tenant, rôle) ;
- séparation des actions sensibles ;
- tests d’accès positif **et** négatif.

Exemple IDOR : un endpoint `/api/orders/:orderId` doit vérifier que la commande appartient bien à l’utilisateur authentifié.

## A02:2025 : Security Misconfiguration

Cherche : debug actif, CORS trop large, stack traces exposées, routes d’administration publiques, secrets dans le dépôt, services inutiles activés, configuration différente entre local et production.

Le bon contrôle est répétable : une configuration attendue + un test qui échoue lorsque cette configuration dérive.

## A03:2025 : Software Supply Chain Failures

La surface d’attaque ne s’arrête pas au code maison. Vérifie :

- versions et provenance des dépendances ;
- lockfile ;
- scripts d’installation ;
- dépendances transitives critiques ;
- exposition de secrets dans CI ;
- mises à jour et capacité de rollback.

Un package « populaire » n’est pas une preuve de sûreté.

## A04:2025 : Cryptographic Failures

Vérifie :

- secrets et mots de passe correctement protégés ;
- chiffrement approprié au besoin réel ;
- gestion des clés séparée des données ;
- TLS correctement configuré ;
- absence de secrets ou tokens en clair dans les logs et URLs.

Exemple : un mot de passe doit être dérivé avec un algorithme adapté au stockage de mots de passe, pas chiffré comme une donnée récupérable.

## A05:2025 : Injection

Les familles d’injection restent nombreuses : SQL, commande système, template, DOM/XSS, etc.

Règle : les données contrôlées par l’utilisateur restent des données jusqu’au moment précis où elles doivent être interprétées, et cette frontière doit être contrôlée.

Exemple dangereux :

```js
exec(`cat ${filename}`, callback);
```

Préférer une API qui sépare clairement programme et arguments lorsque c’est possible.

## A06:2025 : Insecure Design

Ici, le problème précède souvent le bug d’implémentation : le système autorise une règle métier dangereuse.

Questions :

- quelle menace le design accepte-t-il ?
- quelle hypothèse est implicite ?
- quel abus est économiquement intéressant pour un attaquant ?
- quel garde-fou doit exister avant le code ?

Utilise un scénario d’abus, un diagramme de flux ou un ADR pour rendre l’hypothèse falsifiable.

## A07:2025 : Authentication Failures

Vérifie :

- gestion du cycle de vie des sessions ;
- protections contre le brute force ;
- vérification de l’identité côté serveur ;
- expiration / révocation selon le risque ;
- séparation claire entre authentification et autorisation.

Le rate limiting du login est un contrôle complémentaire, pas un remplacement de l’authentification correcte.

## A08:2025 : Software or Data Integrity Failures

Cette famille couvre notamment les mises à jour, artefacts et données dont l’intégrité ne peut pas être supposée.

Vérifie :

- provenance des artefacts ;
- intégrité des fichiers ou paquets critiques ;
- contrôles de déploiement ;
- validation des données avant traitement ;
- protection des chaînes CI/CD.

## A09:2025 : Security Logging and Alerting Failures

Un système sûr doit aussi être observable. Cherche :

- événements de sécurité pertinents ;
- contexte suffisant pour enquêter ;
- absence de secrets dans les logs ;
- alertes actionnables ;
- seuils et canaux documentés ;
- tests des scénarios d’incident.

Un dashboard plein de métriques mais sans décision associée est du bruit.

## A10:2025 : Mishandling of Exceptional Conditions

Les systèmes deviennent dangereux lorsqu’ils traitent mal :

- erreurs réseau ;
- timeouts ;
- entrées invalides ;
- ressources indisponibles ;
- états partiels ;
- retries sans borne ;
- fallbacks contradictoires ;
- erreurs non observées.

Question Staff : que se passe-t-il lorsque l’hypothèse nominale devient fausse ?

## Drill : transformer la checklist en preuve

Choisis un endpoint ou un composant réel du projet fil rouge. Pour **trois** catégories OWASP, produis :

1. le scénario d’abus ou de panne ;
2. le garde-fou choisi ;
3. le test qui démontrerait son absence ou sa présence ;
4. le signal à observer en production ;
5. la condition qui te ferait changer de stratégie.

### Rappel important

OWASP Top 10 est un cadre de sensibilisation, pas une checklist exhaustive de sécurité. Une décision de sécurité doit combiner le contexte de l’application, le modèle de menace, les contraintes métier et les contrôles réellement vérifiés.

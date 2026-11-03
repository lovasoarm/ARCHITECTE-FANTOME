---
stability: evolutif
acte: maitriser
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/01-00-why-client-systems.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/01-00-why-client-systems.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** le mur tombe, le trafic monte et le dernier build ne parle plus exactement au backend. Tu ne reçois pas la solution. Tu reçois la catastrophe.

# Boss fight : deux appareils, token révoqué et données en concurrence

## Scénario chronologique

Une agente de terrain utilise deux appareils. Les deux ont chargé la commande `ORD-42` à la version serveur 7. L'appareil A passe hors ligne et modifie l'adresse. L'appareil B passe hors ligne et change l'adresse de livraison vers un autre point. A se reconnecte, envoie son opération et obtient la version 8. La réponse de synchronisation est perdue ; l'application se ferme. Pendant ce temps, un administrateur révoque la session. À la reconnexion, B reçoit un 401, puis son refresh token est refusé. Un retry mal conçu risque de dupliquer la commande ou d'envoyer les changements de B sous le mauvais compte.

## Rôle

Tu es le responsable client. Tu dois préserver les données locales, protéger l'identité, éviter tout effet en double et rendre le conflit compréhensible à l'utilisateur. Tu ne peux pas résoudre le problème par un « last write wins » arbitraire.

## Acte 1 : Reconstituer l'état

Dresse l'état de chaque appareil : valeur locale, version de base, opération en attente, ID d'opération, identité active, état token, résultat serveur connu/inconnu. Distingue le timeout d'un refus métier : l'absence de réponse ne signifie pas que le serveur n'a rien fait.

## Acte 2 : Gérer l'idempotence

L'appareil A redémarre et rejoue l'opération avec le même `operationId`. Le serveur doit retourner le résultat déjà enregistré, sans appliquer une seconde mutation. Si le client génère un nouvel ID, le scénario échoue.

## Acte 3 : Gérer auth et compte

Arrêter le refresh si le token est révoqué. Demander une réauthentification et conserver l'opération locale sous l'identité d'origine, sans la transmettre sous un autre utilisateur. Définir si l'opération peut être conservée, annulée ou soumise à confirmation après reconnexion.

## Acte 4 : Résoudre le conflit

L'appareil B se reconnecte avec une base version 7, alors que le serveur est version 8. Le serveur répond conflit et retourne l'état courant. Définir la règle métier : comparer les modifications, préserver les deux valeurs, demander une décision explicite ou escalader si la commande est déjà en préparation. Définir comment la nouvelle décision produit une version 9.

## Diagramme de séquence

```text
Appareil A                Serveur                 Appareil B
    |                       |                         |
  edit A                    |                       edit B
  base v7                   |                       base v7
    |                       |                         |
  sync op-1 --------------->|                         |
    |                       | enregistre v8           |
  timeout / fermeture       |                         |
    |                       |<--------------- 401 -----|
    |                       |                         |
  restart                   |                    refresh refusé
    |                       |                         |
  sync même op-1 ---------->|                         |
    |<---- résultat v8 -----|                         |
    |                       |<----- sync base v7 -----|
    |                       |------ conflit v8 ------>|
    |                       |                         |
    |                 réauth / décision métier        |
    |                       |<----- résolution --------|
    |<------------ nouvel état version 9 ------------|
```

## Acte 5 : Diagnostic et communication

Écrire ce que voit l'utilisateur et ce qui est conservé localement. Ne pas afficher « synchronisé » avant confirmation. Produire un log corrélé sans token, adresse complète ni contenu sensible. Prévoir un support opérationnel si l'utilisateur ne peut pas résoudre le conflit.

## Évaluation /40

| Critère                            | Points |
| ---------------------------------- | -----: |
| Reconstitution exacte des états    |      6 |
| Idempotence après réponse perdue   |      7 |
| Gestion de révocation/compte       |      7 |
| Détection et résolution du conflit |      8 |
| UX et communication d'incertitude  |      4 |
| Observabilité/confidentialité      |      4 |
| Tests et preuve de reprise         |      4 |

Seuil : 32/40. Échec automatique si une opération peut être envoyée sous le mauvais compte, si un retry peut produire un double effet, ou si une valeur concurrente est perdue sans décision explicite.

## Réponse faible et forte

**Faible :** « On reconnecte, on refresh le token et on réessaie la dernière requête. » Elle ne distingue ni révocation d'expiration, ni opération acceptée sans accusé, ni version périmée.

**Forte :** le client garde l'ID stable, demande l'état de l'opération si le protocole le permet ou la rejoue de façon idempotente, suspend le flux lorsque l'identité est révoquée, conserve les opérations sous le compte propriétaire, puis ouvre une résolution de conflit versionnée après réauthentification. La décision finale est persistée et auditée.

## Preuve de maîtrise

Tests automatisés du scénario, journal de séquence, règles de compte/outbox, écran de conflit ou protocole documenté, et explication des limites du protocole serveur. Une maquette sans tests d'état ni authentification ne valide pas le boss fight.

## Perturbations complémentaires conservées

Traiter aussi une réponse serveur partielle, une action répétée, une nouvelle contrainte de coût et la montée du trafic pendant le changement de contrat. Défendre état, sécurité, résilience, UX, coût et observabilité ; préciser quel signal déclenche une limitation ou un arrêt.

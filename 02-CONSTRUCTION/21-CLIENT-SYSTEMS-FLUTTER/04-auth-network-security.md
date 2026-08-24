---
stability: evolutif
acte: appliquer
---

> **SCÈNE CRAZYDEVS : Naruto :** le clone de l’identité n’est pas Naruto. Un token valide ne donne pas automatiquement tous les droits.

# Auth, réseau et sécurité côté client

Vérifie :

- durée de vie des tokens ;
- stockage ;
- rotation ;
- autorisation serveur ;
- fuite de secrets ;
- retries ;
- timeouts ;
- pinning ou contrôles adaptés au contexte ;
- messages d’erreur sans fuite d’information.

## Exercice

Donne au client un token expiré, un endpoint lent et un endpoint qui retourne 403. Le résultat UX doit distinguer les trois cas sans inventer une cause.

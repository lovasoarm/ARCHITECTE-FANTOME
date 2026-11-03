---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 12 : Fondations réseau : IP, ports, DNS, TCP et TLS

> **Arc Naruto :** avant de protéger la porte du village, comprends comment un visiteur trouve le village, rejoint la porte et prouve qu’il parle au bon interlocuteur.

Cette leçon commence au niveau débutant. Tu n’as pas besoin d’avoir déjà configuré un routeur, un serveur ou un cloud. Elle prépare notamment le projet **07 : Coffre Imprenable** ; elle ne remplace pas les cours Cloud et sécurité qui viennent ensuite.

<!-- AF-DIAGRAM:network -->

## Repère visuel utile : le trajet d’une requête

```text
Nom saisi : api.exemple.test
          |
          v
DNS : quel adresse correspond à ce nom ?
          |
          v
IP + port : quelle machine / quel service joindre ?
          |
          v
TCP : établir une connexion fiable (HTTP/1.1 et HTTP/2 usuels)
          |
          v
TLS : protéger le transport et vérifier le certificat du serveur
          |
          v
HTTP : envoyer une requête et recevoir une réponse
          |
          v
Application : authentifier puis autoriser l'action
```

<!-- AF-LESSON-PROFILE: systems -->

## Résultat attendu

À la fin, tu dois pouvoir dessiner à la main le trajet simplifié d’une requête Web, définir avec tes mots IP, port, DNS, TCP, TLS et HTTP, et expliquer ce que chaque mécanisme fait **et ne fait pas**. Tu dois aussi distinguer un port public d’un service qui devrait rester privé.

## Pourquoi ces notions viennent avant le Cloud et Zero Trust

Une application ne reçoit pas magiquement une requête. Le client doit trouver une adresse, atteindre un service, établir un transport, protéger l’échange et respecter le protocole applicatif. Les architectures Cloud et les contrôles Zero Trust s’appuient sur ces mécanismes ; les lire sans connaître leur rôle rend les diagrammes difficiles à comprendre.

## Mécanisme : le trajet en six étapes

### 1. IP : une adresse pour acheminer les paquets

Une adresse IP identifie une interface réseau dans un contexte de routage. Les familles courantes sont IPv4 (par exemple `192.0.2.10`) et IPv6 (par exemple `2001:db8::10`). Ces adresses d’exemple sont réservées à la documentation : elles ne désignent pas un serveur public à contacter.

Une adresse privée sert généralement aux communications internes d’un réseau ; une adresse publique peut être routée sur Internet. « Privée » ne veut pas dire « sûre », et « publique » ne veut pas dire « accessible à tous » : les routes, pare-feu et règles d’accès comptent aussi. Une IP n’est pas une identité humaine ou une permission.

### 2. Port : sélectionner un service sur une machine

Une machine peut exécuter plusieurs services. Pour TCP ou UDP, le port aide à diriger le trafic vers le bon point de terminaison. Les numéros 80 (HTTP) et 443 (HTTPS) sont des conventions fréquentes, pas des garanties de sécurité. Une API peut écouter sur 3000 ou 8080 ; une base PostgreSQL utilise souvent 5432 par défaut.

Un port ouvert n’accorde pas un droit métier. Il signifie seulement qu’un chemin réseau peut atteindre un service qui écoute, selon les règles réseau. Les contrôles d’identité et d’autorisation restent nécessaires.

### 3. DNS : retrouver une adresse à partir d’un nom

DNS est un système distribué de noms. Quand un programme doit joindre `api.exemple.test`, il demande au résolveur DNS les informations nécessaires ; pour un site Web, des enregistrements A (IPv4) ou AAAA (IPv6) peuvent fournir des adresses. Les réponses peuvent être mises en cache pendant une durée appelée TTL.

DNS aide à trouver une destination. Il ne chiffre pas à lui seul la requête HTTP et ne prouve pas que le serveur est légitime. La vérification du certificat TLS apporte une preuve différente.

### 4. TCP : établir un transport fiable

TCP fournit un flux d’octets ordonné et fiable entre deux extrémités. L’établissement classique d’une connexion utilise un échange en trois temps : SYN, SYN-ACK, ACK. TCP s’occupe du transport ; il ne comprend pas les routes HTTP, ne sait pas si un utilisateur a le droit de lire un dossier et ne chiffre pas à lui seul les données.

Pour le cas Web classique, HTTP/1.1 et HTTP/2 sont généralement transportés par TCP. HTTP/3 est différent : il utilise QUIC, qui fonctionne au-dessus d’UDP et intègre les mécanismes de sécurité TLS. Ne mémorise donc pas « tout HTTP passe par TCP » : ce serait faux.

### 5. TLS : protéger le transport et authentifier le serveur

TLS protège les échanges en transit contre la lecture et la modification par un tiers sur le trajet, lorsque la configuration et la validation sont correctes. Pour HTTPS, le client vérifie notamment que le certificat est valide pour le nom demandé, que sa chaîne mène à une autorité reconnue par le client et qu’il est dans sa période de validité. Le serveur prouve également qu’il possède la clé privée associée au certificat.

TLS ne prouve pas que le code du serveur est sans vulnérabilité, que la base est protégée, ni que l’utilisateur a le droit d’effectuer une action. mTLS ajoute l’authentification du client par certificat, mais ne remplace toujours pas les permissions métier.

### 6. HTTP : le protocole de la requête et de la réponse

HTTP décrit l’échange applicatif : une requête contient notamment une méthode (`GET`, `POST`…), un chemin, des en-têtes et parfois un corps. La réponse contient un code de statut, des en-têtes et parfois un corps. L’application décide ensuite comment authentifier le demandeur et autoriser l’action.

```text
Client
  |  GET /documents/42
  |  Host: api.exemple.test
  |  (protégé par TLS dans le cas HTTPS)
  v
Point d'entrée public / reverse proxy
  |
  v
API privée : port applicatif 8080
  |
  v
Base de données privée : port 5432
```

Le schéma est conceptuel : un proxy, un load balancer, un pare-feu, un service mesh ou un fournisseur Cloud peuvent ajouter des étapes. Il faut documenter le trajet réel de chaque projet au lieu de supposer que le dessin générique est sa topologie exacte.

## Quand utiliser ces distinctions

- Pour diagnostiquer « le nom ne résout pas » : examiner DNS avant d’accuser l’application.
- Pour diagnostiquer « connexion refusée » : vérifier l’adresse, le port, l’écoute du service et les règles réseau.
- Pour diagnostiquer un problème de certificat : vérifier le nom demandé, la chaîne et la validité, sans désactiver la vérification pour faire disparaître l’erreur.
- Pour dessiner une architecture : exposer seulement les points d’entrée nécessaires et garder les dépendances internes sur des chemins privés contrôlés.
- Pour attribuer les droits : ne jamais confondre présence sur le réseau privé, authentification et autorisation.

## Limites : ce que cette leçon ne certifie pas

Ce cours donne le modèle mental de base ; il ne t’apprend pas à administrer un réseau d’entreprise, à concevoir un plan d’adressage complet, à configurer un pare-feu de production ou à auditer une PKI. Les réseaux réels comportent routage, NAT, VPN, sous-réseaux, proxies, certificats, politiques et comportements spécifiques au fournisseur. Une capture réseau ou un test de connectivité doit être interprété avec son contexte.

## Ancrage produit / terrain : Kintana

Dans Kintana, imagine une application de gestion de documents. Le navigateur contacte `api.kintana.example`, un point d’entrée public relaie la demande à l’API, puis l’API interroge une base privée. Le nom, le transport, le chiffrement, l’identité et le droit d’accès sont des étapes distinctes. Le domaine `.example` est un nom d’illustration réservé à la documentation.

## Mission utile : dessiner un trajet vérifiable

Sur papier ou dans un fichier Markdown, dessine le trajet d’une requête `GET /documents/42`. Étiquette l’adresse IP, le port, la résolution DNS, le transport, TLS, HTTP, le point d’entrée public, l’API et la base privée. Pour chaque étape, écris une phrase « fait » et une phrase « ne fait pas ».

**Livrable :** `NETWORK-REQUEST-JOURNEY.md`, contenant le diagramme, le vocabulaire expliqué avec tes mots, les hypothèses, les frontières publiques/privées et au moins trois questions de diagnostic.

**Critère de sortie :** une autre personne peut suivre le dessin et identifier où le nom est résolu, où la connexion est établie, où le chiffrement s’applique, où HTTP est traité et où l’autorisation métier doit être décidée.

## Transfert obligatoire

On te dit : « l’API est sur le réseau privé, donc elle est sécurisée ». Réponds avec un diagramme et identifie au moins trois contrôles encore nécessaires : par exemple identité du service, autorisation sur la ressource, chiffrement du trafic interne, filtrage des flux, secrets et journaux sans données sensibles.

## Références normatives et techniques

- [RFC 1034 : Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034) : introduction aux concepts DNS. C’est un texte fondateur, complété par RFC 1035 et de nombreux RFC de mise à jour ; ne le traite pas comme l’inventaire complet des règles DNS actuelles.
- [RFC 1035 : Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035) : détails de mise en œuvre et du protocole DNS ; lui aussi a reçu de nombreuses mises à jour.
- [RFC 9293 : Transmission Control Protocol (TCP)](https://www.rfc-editor.org/rfc/rfc9293) : spécification de référence TCP qui rassemble les changements normatifs apportés depuis RFC 793.
- [RFC 9846 : The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc9846) : spécification TLS 1.3 publiée en juillet 2026 ; elle remplace RFC 8446 tout en conservant le numéro de version TLS 1.3.
- [RFC 9110 : HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) : sémantique commune aux versions HTTP.
- [RFC 9112 : HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112) : syntaxe des messages, parsing et gestion des connexions HTTP/1.1 ; cette spécification est mise à jour par RFC 9931.
- [RFC 9931 : Security Considerations for Optimistic Protocol Transitions in HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9931) : précautions de sécurité lors d’un changement de protocole anticipé sur une connexion HTTP/1.1 ; met à jour RFC 9112 et RFC 9298.
- [RFC 9113 : HTTP/2](https://www.rfc-editor.org/rfc/rfc9113) : spécification HTTP/2.
- [RFC 9114 : HTTP/3](https://www.rfc-editor.org/rfc/rfc9114) : mapping de la sémantique HTTP sur QUIC.

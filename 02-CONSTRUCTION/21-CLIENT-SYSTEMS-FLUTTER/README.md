---
stability: evolutif
acte: construire
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/01-00-why-client-systems.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/01-00-why-client-systems.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 21 : CLIENT SYSTEMS / FLUTTER : LE FRONT N’EST PAS UNE TÉLÉCOMMANDE

> **SCÈNE CRAZYDEVS : Prison Break :** Scofield ne construit pas juste un tunnel. Il connaît les murs, les rondes, les portes, le plan B et ce qui se passe si le téléphone disparaît. Un client sérieux, c’est pareil : réseau, état, identité, offline, reprise et observabilité font partie du système.

Ce module ne cherche pas à transformer l’apprenant en collectionneur de widgets Flutter. Il lui apprend à traiter le mobile/client comme une pièce d’un système distribué.

## Place dans le cerveau AF

```text
JS/TS + HTTP + API
      ↓
client Flutter
      ↓
état / cache / offline / auth
      ↓
contrats backend
      ↓
observabilité / sécurité / coût
      ↓
arbitrage architecture
```

Flutter est ici un **terrain d’application**. Les mécanismes durables restent : état, réseau, contrats, résilience, sécurité, observabilité et transfert.

## Parcours

- `00-PREREQUIS.md` : vérifier HTTP, async, API et états.
- `01-00-why-client-systems.md` : pourquoi un client est un système distribué miniature.
- `02-flutter-mental-model.md` : widgets, arbre, état, cycle de rendu et frontière UI/domain.
- `03-offline-sync.md` : cache local, synchronisation et conflits.
- `04-auth-network-security.md` : auth, tokens, retries et surfaces d’attaque côté client.
- `05-observability-performance.md` : latence perçue, traces, erreurs et budget de performance.
- `06-client-architecture.md` : frontières UI/domaine/cas d’usage/repository/cache/API et stratégie de test.
- `07-case-fil-rouge-client.md` : application mobile de commandes avec reprise, tokens, outbox et conflits.
- `50-client-systems-minimini-projet.md` : construire un client survivant ; les tests doivent être créés selon les étapes du projet.
- `95-challenge.md` : défendre la stratégie client.
- `96-boss-fight.md` : incident mobile sous changement de contrat API.
- `90-grimoire.md` : les invariants à retenir.
- `99-PORTAGE-MENTAL.md` : porter le raisonnement vers web/mobile natif.
- `99A-PONT.md` : rejoindre Platform Engineering / Pilotage.

## Comment utiliser le module

Lire les leçons 02 à 06, réaliser le cas fil rouge 07, puis construire l’extension 50. Les scénarios de perte réseau, redémarrage, expiration de session et conflit doivent être testés séparément. Le challenge vérifie la défense des choix ; le boss fight vérifie le diagnostic et la reprise. Ne déclarer le module maîtrisé que lorsque les tests d’idempotence, de conflit et de sécurité passent et que les décisions sont justifiées.

## Règle anti-copie

Le mini-projet fournit des contraintes, un terrain de départ et des critères. Il ne fournit ni solution, ni branche `_solutions`, ni implémentation de référence.

## Préparer l'environnement

Lire [`SETUP.md`](SETUP.md) avant toute commande ou installation. Les prérequis locaux de l'activité priment sur les indications générales.

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Prérequis : Client Systems / Flutter](00-PREREQUIS.md)
- [Pourquoi Client Systems existe](01-00-why-client-systems.md)
- [Modèle mental Flutter : arbre, état et reconstruction](02-flutter-mental-model.md)
- [Offline-first et synchronisation : considérer le réseau comme intermittent](03-offline-sync.md)
- [Authentification, tokens et réseau : protéger le client sans lui confier les secrets métier](04-auth-network-security.md)
- [Observabilité et performance client : mesurer ce que l'utilisateur subit](05-observability-performance.md)
- [Architecture client : séparer présentation, domaine, cas d'usage et données](06-client-architecture.md)
- [Cas fil rouge : application mobile de commandes utilisable hors ligne](07-case-fil-rouge-client.md)
- [Mini-projet : Client survivant](50-client-systems-minimini-projet.md)
- [Grimoire : Client Systems](90-grimoire.md)
- [Challenge : prouver qu'un client mobile survivra aux pannes ordinaires](95-challenge.md)
- [Boss fight : deux appareils, token révoqué et données en concurrence](96-boss-fight.md)
- [Portage mental](99-PORTAGE-MENTAL.md)
- [Pont : vers Platform Engineering](99A-PONT.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission précise de sa ligne dans la section **Missions ciblées par sous-module** de cette carte ; le challenge local reste la consigne et le critère de validation. Cette référence ne crée ni prérequis ni gate supplémentaire.

---
stability: evolutif
acte: parcours
noyau: oui
route: survie
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/04-SECURITY/01-00-why-security.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/04-SECURITY/01-00-why-security.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 04 SECURITY

> Palier : Pilotage. Les durées historiques sont des repères, pas un contrat de maîtrise. Suis la séquence et les critères de preuve ci-dessous ; prolonge la pratique tant que les invariants ne sont pas démontrés.

## Séquence pédagogique : comprendre → tester → intégrer

La table ci-dessous décrit l'ordre d'étude, pas une promesse de durée totale. Les fichiers de support, grimoire, transfert, challenges et validations ont des rôles différents ; ne les additionne pas comme s'ils étaient des leçons indépendantes. La maîtrise est décidée par les preuves du projet et du challenge.

| Étape                            | Ressources                                                                                                                                                                    | Ce qu'il faut démontrer                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 0. Prérequis et menace           | `00-PREREQUIS.md`, `01-00-why-security.md`                                                                                                                                    | Définir les actifs, frontières de confiance et conséquences d'une faille                                          |
| 1. Entrées hostiles              | `02-xss_injection.md`, `50-xss_injection_minimini_projet.md`, `03-csrf_cors.md`, `51-csrf_cors_minimini_projet.md`, `04-prototype_pollution.md`                               | Reproduire un cas vulnérable contrôlé, puis prouver que la correction bloque le scénario                          |
| 2. Identité et données sensibles | `05-auth_flows.md`, `06-hashing_bcrypt.md`, `52-hashing_bcrypt_minimini_projet.md`, `11-secrets_et_rotation.md`, `12-chiffrement_repos_transit.md`, `13-autorisation_rbac.md` | Distinguer authentification/autorisation, secrets/chiffrement et rôles/permissions objet ; tester un accès refusé |
| 3. Vie privée et supply chain    | `07-privacy_and_data_regulation.md`, `08-supply_chain_sbom.md`, `09-audit_your_supply_chain.md`, `14-owasp_checklist.md`                                                      | Relier une menace à un contrôle, une preuve et un risque résiduel explicite                                       |
| 4. Vérification et transfert     | `10-EXO_LECTURE.md`, `12A-EXO-VERIFICATION.md`, `97-EXO-VERIFICATION.md`, `98-EXO-VERIFICATION.md`, `99-PORTAGE-MENTAL.md`, `99A-PONT.md`                                     | Détecter les affirmations fausses, transférer le contrôle à un autre contexte/langage et expliquer la limite      |
| 5. Restitution                   | `95-challenge.md`, puis `90-grimoire.md` après la pratique                                                                                                                    | Réaliser un audit ciblé, garder les tests négatifs et restituer les invariants sans s'appuyer sur la fiche        |

Le `SETUP.md` local décrit les outils et l'exécution. L'installation ne vaut jamais résultat de sécurité : une application lancée sans test négatif n'a pas démontré qu'elle refusait un accès non autorisé.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Termine le challenge puis les exercices de vérification. Le module est « acquis » seulement quand tu peux expliquer les invariants, obtenir les refus attendus et transférer les contrôles à un cas nouveau. Un exercice échoué déclenche une reprise ciblée, pas le passage automatique à la suite.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Security](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : security](01-00-why-security.md)
- [XSS et injection SQL](02-xss_injection.md)
- [50-xss_injection_minimini_projet.md](50-xss_injection_minimini_projet.md)
- [CSRF et CORS](03-csrf_cors.md)
- [51-csrf_cors_minimini_projet.md](51-csrf_cors_minimini_projet.md)
- [Prototype pollution](04-prototype_pollution.md)
- [OAUTH, sessions, JWT](05-auth_flows.md)
- [Stocker un mot de passe : Argon2id, paramètres et compatibilité bcrypt](06-hashing_bcrypt.md)
- [52-hashing_bcrypt_minimini_projet.md](52-hashing_bcrypt_minimini_projet.md)
- [Les 10 vulnérabilités OWASP](14-owasp_checklist.md)
- [Page verrouillée](90-grimoire.md)
- [RGPD et IA ACT : ce que tu n'as pas le droit de logger](07-privacy_and_data_regulation.md)
- [09 : Supply chain & SBOM](08-supply_chain_sbom.md)
- [Exercice : auditer ta propre supply chain](09-audit_your_supply_chain.md)
- [EXO LECTURE : ~20 minutes : un cycle (Securite)](10-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/04-security](12A-EXO-VERIFICATION.md)
- [13 : Secrets : stockage, rotation, fuite](11-secrets_et_rotation.md)
- [14 : Chiffrement : au repos, en transit, et les clés](12-chiffrement_repos_transit.md)
- [15 : Autorisation : RBAC, ABAC, IDOR](13-autorisation_rbac.md)
- [EXO IA MENTEUSE : module 03-PILOTAGE/04-SECURITY](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Pont : de sécuriser du code humain à sécuriser du code IA puis le développement natif IA](99A-PONT.md)
- [Challenge : `04-SECURITY`](95-challenge.md)
- [Grimoire : `04-SECURITY`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [98 EXO VERIFICATION](98-EXO-VERIFICATION.md) : exercice de vérification associé au module.

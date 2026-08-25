---
stability: evolutif
acte: parcours
noyau: oui
route: survie
---

# MODULE 04 SECURITY

> Palier `03-PILOTAGE`. Duree estimee : **14 h 15** (20 fichiers de travail).

## Sommaire du module

| Fichier                                                                        | Objet                                                                                 | Duree  |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                           | 00 : Prereq check : Security                                                          | 15 min |
| [`01-00-why-security.md`](01-00-why-security.md)                               | POURQUOI CE MODULE MÉRITE TON TEMPS : SECURITY                                        | 45 min |
| [`02-xss_injection.md`](02-xss_injection.md)                                   | XSS ET INJECTION SQL                                                                  | 45 min |
| [`50-xss_injection_minimini_projet.md`](50-xss_injection_minimini_projet.md)   | 01 xss injection minimini projet                                                      | 45 min |
| [`03-csrf_cors.md`](03-csrf_cors.md)                                           | CSRF ET CORS                                                                          | 45 min |
| [`51-csrf_cors_minimini_projet.md`](51-csrf_cors_minimini_projet.md)           | 02 csrf cors minimini projet                                                          | 45 min |
| [`04-prototype_pollution.md`](04-prototype_pollution.md)                       | PROTOTYPE POLLUTION                                                                   | 45 min |
| [`05-auth_flows.md`](05-auth_flows.md)                                         | OAUTH, SESSIONS, JWT                                                                  | 45 min |
| [`06-hashing_bcrypt.md`](06-hashing_bcrypt.md)                                 | HASHER UN MOT DE PASSE : BCRYPT, SALT, COÛT                                           | 45 min |
| [`52-hashing_bcrypt_minimini_projet.md`](52-hashing_bcrypt_minimini_projet.md) | 05 hashing bcrypt minimini projet                                                     | 45 min |
| [`14-owasp_checklist.md`](14-owasp_checklist.md)                               | LES 10 VULNÉRABILITÉS OWASP                                                           | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                             | Page verrouillée                                                                      | 30 min |
| [`07-privacy_and_data_regulation.md`](07-privacy_and_data_regulation.md)       | RGPD ET IA ACT : CE QUE TU N'AS PAS LE DROIT DE LOGGER                                | 45 min |
| [`08-supply_chain_sbom.md`](08-supply_chain_sbom.md)                           | 09 : Supply chain & SBOM                                                              | 45 min |
| [`09-audit_your_supply_chain.md`](09-audit_your_supply_chain.md)               | EXERCICE : AUDITER TA PROPRE SUPPLY CHAIN                                             | 45 min |
| [`10-EXO_LECTURE.md`](10-EXO_LECTURE.md)                                       | EXO LECTURE : 15-25 minutes (Securite)                                                | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                             | EXO [JEUNE IA] : 03-PILOTAGE/04-SECURITY                                              | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                             | EXO IA MENTEUSE : module 03-PILOTAGE/04-SECURITY                                      | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                 | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                               | 45 min |
| `99A-PONT.md`                                                                  | PONT : de sécuriser du code humain à sécuriser du code IA à le développement natif IA | 45 min |

Total : **14 h 15**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Le challenge, puis le boss fight, cochent le module. Sans eux, le module est lu, pas acquis.

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
- [Hasher un mot de passe : bcrypt, salt, coût](06-hashing_bcrypt.md)
- [52-hashing_bcrypt_minimini_projet.md](52-hashing_bcrypt_minimini_projet.md)
- [Les 10 vulnérabilités OWASP](14-owasp_checklist.md)
- [Page verrouillée](90-grimoire.md)
- [RGPD et IA ACT : ce que tu n'as pas le droit de logger](07-privacy_and_data_regulation.md)
- [09 : Supply chain & SBOM](08-supply_chain_sbom.md)
- [Exercice : auditer ta propre supply chain](09-audit_your_supply_chain.md)
- [EXO LECTURE : 15-25 minutes (Securite)](10-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/04-security](12A-EXO-VERIFICATION.md)
- [13 : Secrets : stockage, rotation, fuite](11-secrets_et_rotation.md)
- [14 : Chiffrement : au repos, en transit, et les clés](12-chiffrement_repos_transit.md)
- [15 : Autorisation : RBAC, ABAC, IDOR](13-autorisation_rbac.md)
- [EXO IA MENTEUSE : module 03-PILOTAGE/04-SECURITY](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- PONT : de sécuriser du code humain à sécuriser du code IA à le développement natif IA
- [Challenge : `04-SECURITY`](95-challenge.md)
- [Grimoire : `04-SECURITY`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

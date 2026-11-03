---
stability: evolutif
acte: maitrise
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/06-zero-trust-et-supply-chain.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/06-zero-trust-et-supply-chain.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 07 : Le Coffre Imprenable

> Zero trust, mTLS, policy-as-code, secrets, SBOM, artefacts signés et exploration PQC.

**Place dans le parcours :** Avancé sécurité : contrôles applicables à toutes les applications.  
**Prérequis :** HTTP, fondations IP/ports/DNS/TCP/TLS étudiées, trajet de requête documenté, architecture réseau/flux publics-privés Cloud, TLS/mTLS, authentification et autorisation, threat modeling, CI/CD, dépendances et gestion de secrets.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

- [HTTP/REST](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md), puis [Leçon-pont 12 : Fondations réseau](LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md) et son livrable `NETWORK-REQUEST-JOURNEY.md` ; ensuite [architectures réseau, DNS, flux publics/privés et identités Cloud](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md), puis [TLS/chiffrement et certificats](../../03-PILOTAGE/04-SECURITY/12-chiffrement_repos_transit.md), [auth flows](../../03-PILOTAGE/04-SECURITY/05-auth_flows.md) et [autorisation RBAC/ABAC/IDOR](../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md).
- [TLS/chiffrement et certificats](../../03-PILOTAGE/04-SECURITY/12-chiffrement_repos_transit.md), [secrets/rotation](../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md), [SBOM](../../03-PILOTAGE/04-SECURITY/08-supply_chain_sbom.md), [audit supply chain](../../03-PILOTAGE/04-SECURITY/09-audit_your_supply_chain.md).
- [Quality Shield / CI](../../03-PILOTAGE/03-QUALITY-SHIELD/04-review-and-ci.md), [Lab 66 : sécurité et architecture](../../06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md), puis [Leçon-pont 06](LECONS-PONTS/06-zero-trust-et-supply-chain.md).

**Gate d'entrée :** tu peux remettre `NETWORK-REQUEST-JOURNEY.md` et dessiner le trajet d'une requête depuis le client en expliquant IP, port, résolution DNS, transport TCP ou QUIC selon le cas, TLS, HTTP, point d'entrée, réseau public/privé, service et dépendance. Tu distingues TLS de mTLS et décris ce qu'un certificat vérifie. Tu démontres aussi la différence authentification/autorisation, testes un refus cross-tenant, protèges et fais tourner un secret et expliques ce qu'une SBOM ou une signature prouve : et ne prouve pas. Le réseau et le TLS ne sont pas validés par le seul fait de lire leurs noms. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-1--systèmes-en-production).

## Mission

Montrer que la confiance est vérifiée à chaque frontière. L’identité, les droits, les artefacts et les décisions doivent être explicites ; “nous sommes dans le réseau privé” n’est pas une politique de sécurité.

## Version de départ : obligatoire

- [ ] Dessiner actifs, menaces, trust boundaries et abuse cases ; définir un modèle d’identité utilisateur et service-to-service.
- [ ] Mettre en place mTLS entre deux services dans un environnement de labo, avec rotation/expiration des certificats et test de rejet d’un client non autorisé.
- [ ] Écrire des règles policy-as-code pour au moins trois opérations (lecture, écriture, admin) et tester explicitement le refus par défaut.
- [ ] Mettre les secrets hors du dépôt et des images, contrôler leur accès, les faire tourner et vérifier l’absence de divulgation dans les logs.
- [ ] Produire SBOM/rapport de dépendances et scanner ; signer un artefact et vérifier sa provenance et sa signature dans la chaîne CI.
- [ ] Ajouter un scénario de compromission dépendance ou token, documenter détection, blast radius, révocation et récupération.

## Extensions Depth : une à la fois

- [ ] Utiliser les profils SLSA/provenance pour qualifier le niveau réellement atteint ; ne pas déclarer un niveau d’assurance non démontré.
- [ ] Planifier une migration cryptographique : inventaire de protocoles/données à longue durée de vie, crypto-agilité, contraintes de clé/certificat et stratégie de retour arrière.
- [ ] PQC : laboratoire séparé utilisant des implémentations maintenues et des standards en vigueur au moment de l’exercice ; mesurer interopérabilité et overhead. Ne jamais inventer sa propre primitive ni la vendre comme audit de sécurité.

## Tests d’acceptation

- [ ] Le client sans identité valide et le service avec permission insuffisante sont refusés par le serveur.
- [ ] Révoquer ou tourner une identité invalide les accès dans le délai défini ; il n’existe pas de secours silencieux non audité.
- [ ] Une modification d’artefact après signature, ou une provenance attendue absente, fait échouer le gate de release.
- [ ] Les secrets canaris placés dans les données de test n’apparaissent ni dans le repo, ni dans les logs, ni dans les traces exportées.

## Dossier de preuves attendu

Threat model, matrice identité-action-ressource, policy-as-code, runbook de rotation/révocation, SBOM, provenance/signature, tests négatifs et rapport de migration crypto.

## Hors périmètre et limites

Ne jamais écrire sa propre cryptographie. “Zero trust” n’est pas l’installation de mTLS seule. La PQC est un approfondissement d’agilité cryptographique, pas un prérequis universel du parcours.

## Ponts vers AF

[Leçon : supply chain et zero trust](LECONS-PONTS/06-zero-trust-et-supply-chain.md), [Sécurité](../../03-PILOTAGE/04-SECURITY/README.md), [NIST SSDF / SLSA](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.

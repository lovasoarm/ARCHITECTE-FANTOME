---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 07 : Le Coffre Imprenable

> Zero trust, mTLS, policy-as-code, secrets, SBOM, artefacts signés et exploration PQC.

**Place dans le parcours :** Avancé sécurité : contrôles applicables à toutes les applications.  
**Prérequis :** Réseaux/HTTP/TLS, authentification et autorisation, threat modeling, CI/CD, dépendances et gestion de secrets.

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

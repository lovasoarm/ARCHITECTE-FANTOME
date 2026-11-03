---
perishability_id: PER-0070

stability: "perissable"
acte: epreuve
noyau: oui
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_url: "https://owasp.org/Top10/2025/"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "OWASP Top 10:2025 : noms et ordre des dix catégories contrôlés sur la page officielle. Cela ne valide pas le capstone, la checklist locale, les mesures de sécurité ou une conformité applicative."
provenance_note: "V6.4, 2026-11-03 : vérification limitée au périmètre décrit. Aucun contrôle indépendant de l'application ni des snippets locaux n'est impliqué."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OWASP_TOP10_2025_CATEGORIES_AND_ORDER_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Security gate : fil rouge (cloud + brique IA)

<!-- AF-DIAGRAM:capstone -->

```text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

<!-- AF-DIAGRAM:fil_rouge -->

```text
S1 ─┐
S2 ─┤
S3 ─┤
S4 ─┼──► même système ─► décision ─► impact
S5 ─┤
S6 ─┘
```

Le fil rouge fait converger les six familles sur un même système plutôt que sur six mini-cours isolés.

Temps de lecture ~2 min

`SECURITY_GATE_FILLED.md` est connu côté mini-projets ; ici il change d'échelle. Ce fichier
est le gate **du produit**, pas d'un kata.

Copie-le dans `PREUVES/SECURITY_GATE_FILLED.md` de **ton** fil rouge. Chaque ligne :
preuve (fichier:ligne, test, capture) ou `N/A` + une phrase. Un `N/A` non motivé échoue.

Déclencheurs : [01-BONUS-VAULT](../01-BONUS-VAULT/01-01-why-this-level.md), boss fights Staff,
[06-addendum-staff-engineer.md](06-addendum-staff-engineer.md),
90_preuve de vérification dans le livrable staff.md.

## Métadonnées

- Projet fil rouge :
- SHA :
- Date :
- Palier d'utilisateurs visé (100 / 10 000 / 1 000 000) :

## Comment lire la grille de contrôle

Les identifiants `A01` à `A10` de la table ci-dessous sont des **identifiants locaux à cet exercice**. Ils ne correspondent pas automatiquement aux catégories homonymes de l’OWASP Top 10 et ne constituent pas une copie ou une couverture exhaustive de ce référentiel. Pour chaque contrôle, le candidat doit indiquer le risque, la preuve et le périmètre réellement vérifié. OWASP Top 10 est un document de sensibilisation aux risques ; OWASP ASVS est un catalogue d’exigences de vérification que l’on peut sélectionner et tracer. Remplir cette grille ne certifie ni conformité OWASP ni sécurité globale du produit.

## OWASP + cloud + IA

| #   | Item                                                       | Preuve | Statut |
| --- | ---------------------------------------------------------- | ------ | ------ |
| A01 | Contrôle d'accès (créneaux, rôles)                         |        | [ ]    |
| A02 | Secrets hors dépôt, TLS                                    |        | [ ]    |
| A03 | Injection (SQL / NoSQL / consigne)                         |        | [ ]    |
| A04 | Conception : l'IA n'écrit pas sans validation              |        | [ ]    |
| A05 | Config (CORS, headers, debug off en prod)                  |        | [ ]    |
| A06 | Dépendances scannées (date du scan)                        |        | [ ]    |
| A07 | Auth (session, lockout)                                    |        | [ ]    |
| A08 | Intégrité CI / lockfile                                    |        | [ ]    |
| A09 | Logs sans PII ; alerte sécu                                |        | [ ]    |
| A10 | SSRF / URL fetch borné                                     |        | [ ]    |
| C1  | IAM : rayon d'impact d'une clé volée                       |        | [ ]    |
| C2  | Egress et données : qui peut extraire quoi                 |        | [ ]    |
| I1  | Plafond IA côté serveur (pas le client)                    |        | [ ]    |
| I2  | Sortie modèle validée (schéma) ; cas 8, 9, 11 du jeu de 20 |        | [ ]    |
| I3  | Disjoncteur quota : zéro appel payant                      |        | [ ]    |

Signature : je l'ai vérifié dans le code, pas de mémoire. `<nom> : <date>`

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OWASP ASVS 5.0](https://asvs.owasp.org/)
- [OWASP : Application Security Verification Standard downloads](https://asvs.owasp.org/downloads/)

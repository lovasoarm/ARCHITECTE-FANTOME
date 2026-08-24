## perishability_id: PER-0070

stability: perissable
acte: epreuve
noyau: oui
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Security gate : fil rouge (cloud + brique IA)

<!-- AF-DIAGRAM:capstone -->

```text
text
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
text
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

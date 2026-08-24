---
stability: intemporel
acte: pilotage
noyau: oui
route: survie
---

# 06 : FIABILITÉ ET SLO : PROMETTRE UN CHIFFRE, PUIS LE TENIR

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

> Palier 3 : Pilotage. Durée estimée : 10 h 15.
> Frontière : `05-OBSERVABILITY` t'apprend à **voir**. Ce module t'apprend à **promettre** et à
> **arbitrer** avec ce que tu vois. Voir sans promettre, c'est du dashboard décoratif.

## Ce que tu sauras faire

1. Écrire un SLI mesurable, un SLO daté, et le budget d'erreur qui en découle.
2. Décider ce qui réveille un humain à 3 h du matin : et surtout ce qui ne le réveille pas.
3. Chiffrer RPO et RTO, puis les **mesurer** chronomètre en main sur une restauration réelle.
4. Encaisser une panne subie sur ton fil rouge et en sortir un post-mortem sans coupable.

## Parcours

| Fichier                           | Objet                                     | Durée  |
| --------------------------------- | ----------------------------------------- | ------ |
| `01-00-why-fiabilite-slo.md`      | pourquoi                                  | 45 min |
| `02-sli_slo_budget_erreur.md`     | SLI, SLO, budget d'erreur                 | 45 min |
| `03-alerting_astreinte.md`        | alertes utiles, astreinte soutenable      | 45 min |
| `04-reprise_rpo_rto.md`           | sauvegarde, restauration, RPO/RTO mesurés | 45 min |
| `05-post_mortem_sans_coupable.md` | post-mortem                               | 45 min |
| `06-panne_subie_sur_fil_rouge.md` | exercice de panne tirée au sort           | 45 min |
| `07-injection_panne.md`           | panne **injectée** (geste, pas texte)     | 45 min |
| `90-grimoire.md`                  | lignes à retenir                          | 30 min |
| `95-challenge.md`                 | mise en pratique                          | 1 h 30 |
| `96-boss-fight.md`                | épreuve de passage                        | 3 h    |

## Livrable

`SLO.md` dans ton fil rouge : famille S3 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Prereq check : fiabilité / SLO](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : fiabilité et SLO](01-00-why-fiabilite-slo.md)
- [SLI, SLO, budget d'erreur](02-sli_slo_budget_erreur.md)
- [Alertes et astreinte : ce qui réveille un humain](03-alerting_astreinte.md)
- [Reprise : RPO, RTO, et la restauration que tu n'as jamais faite](04-reprise_rpo_rto.md)
- [Post-mortem sans coupable](05-post_mortem_sans_coupable.md)
- [Exercice : la panne subie (et non choisie)](06-panne_subie_sur_fil_rouge.md)
- [Injection de panne : la résilience se joue au geste](07-injection_panne.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [BOSS FIGHT : MODULE 06 : LE BUDGET EST VIDE, LE MÉTIER VEUT LIVRER](96-boss-fight.md)
- [CHALLENGE : LE `SLO.md` QUI TIENT DEBOUT](95-challenge.md)
- [Grimoire : fiabilité et SLO](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

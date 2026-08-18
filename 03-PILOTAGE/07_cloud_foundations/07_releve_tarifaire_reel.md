---
stability: perissable_2027
acte: produire
---

# 07 : RELEVÉ TARIFAIRE RÉEL, OBLIGATOIRE ET CONTREDISIBLE

Temps de travail 60 min chrono, exercice **obligatoire** du module.

Tout ce que ce module t'a appris sur la forme d'un budget cloud ne vaut rien tant que tu n'as
pas un seul prix que tu puisses défendre devant quelqu'un qui te contredit. Un Staff Engineer
n'est pas jugé sur le tableau : il est jugé sur le nombre qu'il avance, la source qu'il cite,
et la date de cette source. « Environ 7 € » sans URL ni date est une opinion déguisée en
chiffre.

## Ce que tu produis

Un fichier `RELEVE-TARIFAIRE.md` à la racine de ton fil rouge, contenant les trois sections
ci-dessous, entièrement remplies avec **tes** relevés. Il devient la source de tout montant
en euros que tu écriras dans le reste du parcours, y compris dans ton `BUDGET-CLOUD.md`.

## Section 1 : le relevé, trois fournisseurs nommés, quatre lignes

Tu ouvres les pages tarifaires publiques de **trois fournisseurs que tu nommes** (un
hyperscaler généraliste, un fournisseur européen, un fournisseur à tarification simple : le
choix t'appartient, la diversité est imposée). Pour chacun, tu relèves quatre lignes et
quatre seulement.

| Ligne | Unité imposée | Ce que tu notes |
| --- | --- | --- |
| Calcul | 1 vCPU + 2 Go de RAM, 730 h/mois | prix mensuel |
| Base managée | instance la plus petite, 20 Go de disque | prix mensuel |
| Stockage objet | 100 Go stockés, 1 mois | prix mensuel |
| Egress | 1 Go sortant vers Internet | prix au Go |

Le tableau à remplir, une ligne par couple fournisseur/ligne, douze lignes au total :

```text
| Fournisseur | Ligne | Unité | Prix relevé | Devise | URL complète | Date du relevé |
| --- | --- | --- | --- | --- | --- | --- |
| <nom réel>  | Calcul | 1 vCPU / 2 Go / 730 h | ... | EUR | https://... | 2026-08-.. |
```

Trois règles de recevabilité, non négociables :

1. **URL complète**, jusqu'à la page qui porte le nombre : pas la page d'accueil du
   fournisseur, pas « pages tarifaires publiques ».
2. **Date du jour du relevé**, au format `AAAA-MM-JJ`, écrite à la main, pas déduite.
3. **Devise et unité explicites** : un prix à l'heure et un prix au mois ne se comparent pas
   sans conversion écrite.

**Repli hors ligne, si et seulement si tu ne peux pas relever toi-même** : le dépôt fournit
12 lignes réellement sourcées (fournisseur, poste, prix, devise, unité, date, URL complète) dans
[RELEVE-REFERENCE-2026.md](RELEVE-REFERENCE-2026.md). Elles servent de garde-fou d'ordre de
grandeur, jamais de réponse : un montant recopié de là sans avoir ouvert l'URL ne se défend pas
en soutenance, et l'exercice reste non validé.

Protocole de sourçage complet :
[../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

## Section 2 : l'écart avec le modèle du dépôt

Le dépôt fournit un exemplaire rempli :
[06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S1-BUDGET-CLOUD.md](../../06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S1-BUDGET-CLOUD.md). Ses montants
sont des ordres de grandeur relevés le 2026-08-14 : ils illustrent la forme, ils ne font pas
autorité sur ton budget.

Pour chacune des quatre lignes, tu calcules l'écart en pourcentage entre le montant du modèle
et **le moins cher de tes trois relevés** :

```text
ecart = (ton_prix - prix_du_modele) / prix_du_modele * 100
```

```text
| Ligne | Modèle S1 | Ton meilleur relevé | Écart % | Pourquoi cet écart existe (une phrase) |
| --- | --- | --- | --- | --- |
```

## Section 3 : une phrase par écart, et elle doit être vérifiable

Pour chaque ligne, **une phrase** qui explique l'écart par une cause nommée, pas par « les
prix ont changé ». Les causes recevables sont peu nombreuses et se reconnaissent :

- une **région** différente (le même service ne coûte pas le même prix à Paris et en Iowa) ;
- un **engagement de durée** (paiement à la demande contre réservation 1 an) ;
- un **palier gratuit** inclus par le fournisseur, qui masque une partie du coût réel ;
- une **unité de facturation** différente (à la seconde, à l'heure, à la requête) ;
- une **date** : le relevé du modèle a un an de retard sur le tien.

Une phrase du type « c'est moins cher chez X » n'explique rien : elle répète le tableau.

## Le piège de l'egress, à ne pas rater

L'egress est la seule des quatre lignes dont le prix unitaire est petit et la facture grande.
Fais le calcul une fois, avec ton propre trafic :

```text
Hypothèse fil rouge : 50 000 réponses par jour, 40 Ko en moyenne par réponse.

50 000 x 40 Ko = 2 000 000 Ko/jour = ~1,9 Go/jour
1,9 Go x 30 = ~57 Go/mois de sortie

facture egress = 57 x <ton prix au Go relevé en section 1>
```

Compare ce montant à ta ligne « calcul ». Chez plusieurs fournisseurs, la sortie coûte plus
cher que la machine qui l'a produite : c'est le nombre qui surprend un comité, et c'est celui
que tu dois pouvoir sortir de mémoire.

## Preuve à livrer

- `RELEVE-TARIFAIRE.md` : douze lignes sourcées, URL complète et date pour chacune.
- Le tableau d'écarts, quatre lignes, quatre pourcentages, quatre phrases de cause.
- Le calcul d'egress mensuel de ton fil rouge, avec l'hypothèse de trafic écrite au-dessus.

## Verdict

Binaire, par le critère de
[verification_pack/criteres.md](verification_pack/criteres.md) : **un seul montant sans URL
complète ou sans date rend l'exercice non réussi**. Aucune auto-notation, aucune moyenne : ce
n'est pas une note sur douze lignes, c'est un refus sur la première ligne non sourcée.

## Où ce relevé ressert

- Ton `BUDGET-CLOUD.md` : tous ses montants viennent d'ici, jamais du modèle.
- Le prix de la neuvième : [04_rayon_impact_zones.md](04_rayon_impact_zones.md), section 3 bis.
- Le choix de fournisseur : [05_choisir_fournisseur.md](05_choisir_fournisseur.md).
- L'écart de coût entre deux fournisseurs, au moment du portage :
  [06_portage_multicloud.md](06_portage_multicloud.md).
- La tension n°1 imposée du capstone :
  [04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md](../../04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md).

## RÉSUMÉ

Trois fournisseurs nommés, quatre lignes, douze prix avec URL et date : c'est le socle
chiffré de tout ce que tu diras sur le coût de ton système. L'écart avec le modèle du dépôt
n'est pas une erreur à corriger, c'est l'objet même de l'exercice : il t'apprend qu'un prix
appartient à une région, une unité, un engagement et une date, et que sans ces quatre
attributs il n'est pas défendable.

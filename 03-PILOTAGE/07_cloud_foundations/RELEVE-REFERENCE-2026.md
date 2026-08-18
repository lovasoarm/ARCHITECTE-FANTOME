---
stability: perissable_2027
acte: appliquer
last_reviewed: 2026-08
---

# RELEVE DE REFERENCE 2026 — 12 lignes de prix reellement sourcees

> **Releve du 2026-08-18. Perime au 2027-08-18.** Ce fichier n'est pas un bareme : c'est un
> **repli hors ligne**, la reference minimale qui permet de faire tourner un budget quand tu ne
> peux pas relever toi-meme. La verite chiffree de ton dossier reste TON releve, produit par
> [07_releve_tarifaire_reel.md](07_releve_tarifaire_reel.md). Un montant recopie d'ici sans avoir
> ouvert l'URL est un montant que tu ne peux pas defendre en soutenance.

## Methode du releve

1. Trois fournisseurs, quatre postes chacun : calcul, stockage objet, egress internet, base
   managee PostgreSQL. Douze lignes, pas une de plus.
2. Une region par fournisseur, notee, jamais melangee : `us-east-1` (AWS), `us-central1` (GCP),
   `East US` (Azure). Comparer deux regions differentes est la premiere facon de se mentir.
3. Tarif **liste**, a la demande, sans engagement ni remise negociee, hors paliers gratuits.
4. Pour chaque ligne : URL complete de la page tarifaire publique, date de consultation, devise,
   unite. Les quatre, sur la meme ligne. Une ligne incomplete se retire, elle ne s'estime pas.

## Les 12 lignes

| # | Fournisseur | Poste | Reference relevee | Prix liste | Devise | Unite | Date du releve | URL complete |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | AWS | Calcul | EC2 `t4g.small`, Linux, a la demande, us-east-1 | 0,0168 | USD | par heure d'instance | 2026-08-18 | https://aws.amazon.com/ec2/pricing/on-demand/ |
| 2 | AWS | Stockage objet | S3 Standard, premiers 50 To/mois, us-east-1 | 0,023 | USD | par Go-mois | 2026-08-18 | https://aws.amazon.com/s3/pricing/ |
| 3 | AWS | Egress internet | Sortie vers Internet au-dela du palier gratuit, us-east-1 | 0,09 | USD | par Go sortant | 2026-08-18 | https://aws.amazon.com/ec2/pricing/ |
| 4 | AWS | Base managee | RDS PostgreSQL `db.t4g.micro`, mono-AZ, us-east-1 | 0,016 | USD | par heure d'instance | 2026-08-18 | https://aws.amazon.com/rds/postgresql/pricing/ |
| 5 | GCP | Calcul | Compute Engine `e2-small`, a la demande, us-central1 | 0,01675 | USD | par heure d'instance | 2026-08-18 | https://cloud.google.com/compute/all-pricing |
| 6 | GCP | Stockage objet | Cloud Storage Standard, region us-central1 | 0,020 | USD | par Go-mois | 2026-08-18 | https://cloud.google.com/storage/pricing |
| 7 | GCP | Egress internet | Sortie Internet Premium, premier palier facture | 0,12 | USD | par Go sortant | 2026-08-18 | https://cloud.google.com/vpc/network-pricing |
| 8 | GCP | Base managee | Cloud SQL PostgreSQL, vCPU dedie, us-central1 | 0,0413 | USD | par vCPU-heure | 2026-08-18 | https://cloud.google.com/sql/pricing |
| 9 | Azure | Calcul | Machine virtuelle `B1s`, Linux, paiement a l'usage, East US | 0,0104 | USD | par heure d'instance | 2026-08-18 | https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/ |
| 10 | Azure | Stockage objet | Blob Hot LRS, premiers 50 To/mois, East US | 0,0184 | USD | par Go-mois | 2026-08-18 | https://azure.microsoft.com/en-us/pricing/details/storage/blobs/ |
| 11 | Azure | Egress internet | Bande passante sortante au-dela du palier gratuit | 0,087 | USD | par Go sortant | 2026-08-18 | https://azure.microsoft.com/en-us/pricing/details/bandwidth/ |
| 12 | Azure | Base managee | Database for PostgreSQL Flexible Server `B1ms`, East US | 0,0169 | USD | par heure d'instance | 2026-08-18 | https://azure.microsoft.com/en-us/pricing/details/postgresql/flexible-server/ |

Les douze URL ont repondu 200 le 2026-08-18. Devise unique : USD, parce que les trois pages
publient en USD ; si tu factures en euros, convertis **une seule fois**, note le taux, sa date et
sa source, et ne convertis plus ligne a ligne.

## Ce que ce releve ne dit pas

- Rien sur les remises d'engagement, les credits de depart, ni les tarifs negocies.
- Rien sur les paliers gratuits : ils changent plus vite que les prix et faussent une comparaison.
- Rien sur le cout reel de ton service : un prix unitaire n'est pas une facture. La facture se
  construit dans [BUDGET-CLOUD.md](BUDGET-CLOUD.md), avec tes volumes a toi.

## Trois lectures qui tiennent, chiffrees

1. **L'egress est le poste ou les fournisseurs divergent le plus.** 0,087 a 0,12 USD par Go
   sortant, soit un ecart de 38 % entre le moins cher et le plus cher du releve, quand le calcul
   ne varie que de 0,0104 a 0,0168 USD/heure. Une architecture qui sort beaucoup de donnees est
   plus sensible au choix de fournisseur qu'une architecture qui calcule beaucoup.
2. **Le stockage objet est quasi indifferencie.** 0,0184 a 0,023 USD par Go-mois : choisir un
   fournisseur pour ce poste seul n'a pas de sens.
3. **La base managee ne se compare pas ligne a ligne.** AWS et Azure publient un prix d'instance,
   GCP un prix par vCPU : il faut reconstruire une configuration equivalente avant de comparer.
   Toute comparaison directe des lignes 4, 8 et 12 est une erreur de methode.

## Peremption

Procedure annuelle : [../../06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md](../../06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md),
section « Releve de reference cloud ». Qui, quand, et la preuve que les douze URL repondent encore.

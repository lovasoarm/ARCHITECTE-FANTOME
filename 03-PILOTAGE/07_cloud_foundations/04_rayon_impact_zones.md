---
stability: perissable_2027
acte: appliquer
---

# 04 : RAYON D'IMPACT, ZONES ET LE PRIX D'UNE NEUVIÈME

Temps de lecture ~11 min

Choisir une topologie, c'est acheter une promesse de disponibilité. Cette leçon relie directement le SLO écrit au module [06_fiabilite_slo](../06_fiabilite_slo/01_sli_slo_budget_erreur.md) à une ligne de facture, dans les deux sens.

## 1. LES TROIS TOPOLOGIES, ET CE QU'ELLES ACHÈTENT

| Topologie | Survit à | Surcoût typique | Complexité ajoutée |
| --- | --- | --- | --- |
| Mono-zone | rien de plus qu'une panne machine | référence | aucune |
| Multi-zone | la perte d'un centre de données | +80 à +130% sur les composants répliqués | réplication et bascule à tester |
| Multi-région | la perte d'une région entière | x2,5 à x4 | cohérence des données, latence, exploitation double |

Le saut de mono-zone à multi-zone est presque toujours justifié dès qu'un utilisateur paie. Le saut à multi-région ne l'est que si une phrase écrite l'exige : contrainte réglementaire, contrat client, ou SLO au-delà de 99,95%.

## 2. LA CARTE DU RAYON D'IMPACT

Pour chaque composant, trois colonnes, et la carte se remplit en une heure :

```
composant --> ce qui tombe avec lui --> ce que l'utilisateur voit --> temps de retour
```

| Composant | Rayon d'impact | Vu par l'utilisateur | Retour estimé |
| --- | --- | --- | --- |
| Base principale | écriture et lecture | plus rien ne fonctionne | RTO base |
| Cache | lectures plus lentes | lenteur, service maintenu | quelques minutes |
| File d'événements | synchronisation entre contextes | données périmées, affichage décalé | rattrapage automatique |
| Fournisseur de paiement | encaissement | échec au moment du paiement | dépend du tiers |

La colonne "vu par l'utilisateur" est celle qu'on présente à un non-technicien. Les deux autres servent à décider.

## 2 BIS. LA TOPOLOGIE, DESSINEE

Ce schema est le diagramme exige au volet « diagrammes » du dossier final. Le meme
dessin sert de reference dans [06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S2-ADR-PRINCIPAL.md](../../06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S2-ADR-PRINCIPAL.md).

```text
                        REGION A (europe-ouest)
  +-------------------------------------------------------------+
  |   ZONE a1                        ZONE a2                     |
  |  +---------------+   replication  +---------------+          |
  |  | app  x2       |  synchrone     | app  x2       |          |
  |  | base PRIMAIRE |==============> | base REPLIQUE |          |
  |  | cache         |  < 5 ms, meme  | cache         |          |
  |  +---------------+  facture zone  +---------------+          |
  |          \                              /                    |
  |           \____ repartiteur de charge _/                     |
  |                        |                                     |
  +------------------------|-------------------------------------+
                           |  bascule automatique si une zone tombe
                           |  perte attendue : 0 donnee, ~60 s de service
                           |
       egress inter-region |  FACTURE AU Go SORTANT
       ~0,02 a 0,11 USD/Go |  (relever le vrai prix : 07_releve_tarifaire_reel.md)
                           v
                        REGION B (amerique-nord)
  +-------------------------------------------------------------+
  |   ZONE b1                                                    |
  |  +---------------+   replication asynchrone                  |
  |  | app  x1       |   retard 1 a 15 s = donnees perdues        |
  |  | base SECONDE  |   en cas de bascule region                |
  |  +---------------+                                           |
  +-------------------------------------------------------------+

  Trait `==>`  : replication synchrone, gratuite dans la region, coute de la latence.
  Trait `-->`  : trafic facture, l'egress inter-region est la ligne qu'on oublie.
  Une ZONE tombe : bascule interne, l'utilisateur voit une coupure courte.
  Une REGION tombe : bascule externe, l'utilisateur voit une coupure ET une perte.
```

Ce que le dessin rend indiscutable et qu'un tableau ne rend pas : l'egress se paie sur
la fleche entre les deux regions, pas dans les cases ; la replication intra-region ne se
paie pas en argent mais en latence d'ecriture ; et une bascule de region admet une perte
de donnees, ce qui est une decision metier, jamais une decision technique.

## 3. LE PRIX D'UNE NEUVIÈME, CALCULÉ ET NON RESSENTI

```
coût de la neuvième = facture(topologie cible) - facture(topologie actuelle)
gain = minutes d'indisponibilité évitées * coût d'une minute d'arrêt
```

Le coût d'une minute d'arrêt s'estime avec le métier : revenu horaire perdu, coût de traitement des réclamations, pénalité contractuelle éventuelle. Un ordre de grandeur assumé et daté vaut mieux que l'absence de chiffre.

Intuition : une assurance ne s'achète pas au sentiment, mais en comparant la prime au sinistre probable. Une neuvième supplémentaire est exactement une prime d'assurance.

## 3 BIS : LE CALCUL CHIFFRÉ DE LA SECONDE ZONE

Les pourcentages de la section 1 sont des ordres de grandeur : ils ne se recopient pas dans un budget. Le calcul se fait ligne par ligne, avec **tes** prix issus de [07_releve_tarifaire_reel.md](07_releve_tarifaire_reel.md), parce que la seconde zone ne double pas tout : elle double ce qui est répliqué, et ajoute une ligne que personne n'anticipe, le trafic entre zones.

```text
Ce que la seconde zone duplique          Ce qu'elle ne duplique pas
- calcul (les instances de secours)      - stockage objet (déjà multi-zone chez la
- base managée (réplique synchrone)        plupart des fournisseurs : à vérifier, pas
- adresses IP / équilibreur                à supposer)
                                         - egress Internet (même volume sortant)
Ce qu'elle AJOUTE
- trafic inter-zones, facturé au Go dans un sens, parfois dans les deux
```

Le calcul, avec les quatre lignes du relevé :

```text
mono_zone   = calcul + base + stockage + egress
multi_zone  = (calcul x 2) + (base x 2) + stockage + egress + inter_zones
inter_zones = Go répliqués par mois x prix au Go du trafic inter-zones

cout_seconde_zone = multi_zone - mono_zone
                  = calcul + base + inter_zones
```

Exemple entièrement fictif, structure à recopier, chiffres à remplacer par les tiens :

```text
calcul       : 1 vCPU / 2 Go            -> A EUR / mois   (relevé, section 1)
base managée : petite instance, 20 Go   -> B EUR / mois   (relevé, section 1)
réplication  : 30 Go/mois entre zones   -> 30 x C EUR/Go  (relevé, ligne à ajouter)

cout_seconde_zone = A + B + 30 x C  EUR / mois
```

Puis, et seulement alors, la comparaison qui décide :

```text
minutes d'arrêt évitées par an = (SLO cible - SLO actuel) x 525 600 minutes
gain annuel = minutes évitées x coût d'une minute d'arrêt
verdict     = gain annuel  vs  cout_seconde_zone x 12
```

Trois obligations pour que ce calcul soit opposable : chaque prix porte son URL et sa date, le volume répliqué est une mesure ou une hypothèse écrite (jamais un blanc), et le coût d'une minute d'arrêt est justifié en une phrase par un élément métier. Un calcul de neuvième sans ces trois attributs se démonte en une question, et c'est exactement la question que pose la **tension n°1 imposée du capstone**.

## 4. LES DÉPENDANCES QUI ANNULENT TA REDONDANCE

Trois cas classiques où l'on paie du multi-zone sans l'obtenir :

1. Une **dépendance mono-zone** dans la chaîne : un service tiers, un cache, un montage de fichiers. Le maillon faible fixe la disponibilité réelle.
2. Une **bascule jamais testée** : la réplique existe, personne n'a jamais vérifié que le basculement fonctionne, ni combien de temps il prend.
3. Un **plan de contrôle partagé** : DNS, gestionnaire de secrets, chaîne de déploiement. S'ils tombent, la redondance des données ne sert à rien.

Risque réel : une facture multi-zone payée douze mois pour une disponibilité mono-zone constatée le jour de l'incident. C'est le pire des deux mondes, et c'est fréquent.

## 5. EXERCICES

**Exercice 1 : la carte d'impact (25 min).** Remplis le tableau de la section 2 pour ton fil rouge, tous composants inclus, tiers compris.

**Exercice 2 : le prix de la neuvième (20 min).** Prends ton SLO actuel. Applique le calcul de la section 3 bis avec les prix de ton [relevé tarifaire](07_releve_tarifaire_reel.md), inter-zones compris, et écris la phrase que tu dirais au commanditaire : "cette neuvième coûte X par mois, et voici ce qu'elle évite". Une phrase sans les trois attributs (URL, date, volume) n'est pas recevable.

**Exercice 3 : le maillon faible (15 min).** Cherche dans ta carte la dépendance qui plafonne ta disponibilité réelle. Écris ce que tu ferais si le budget augmentait de 20%, et ce que tu ferais s'il n'augmentait pas.

## RÉSUMÉ

Trois topologies, trois promesses, trois factures : le multi-zone se justifie vite, le multi-région rarement et par écrit. Le rayon d'impact se cartographie composant par composant, avec la colonne "ce que voit l'utilisateur". Une neuvième supplémentaire est une prime d'assurance qui se compare au coût d'une minute d'arrêt. Et une redondance annulée par un maillon mono-zone est une dépense pure.

## ET APRÈS

Reste à choisir un fournisseur sans se laisser enfermer : [05_choisir_fournisseur.md](05_choisir_fournisseur.md).

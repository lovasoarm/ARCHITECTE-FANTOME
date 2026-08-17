---
stability: perissable_2027
acte: appliquer
---

# 02 : LE MODÈLE DE COÛT, ET LA LIGNE QUE PERSONNE N'ANTICIPE

Temps de lecture ~12 min

Un architecte qui ne sait pas chiffrer son système se fait arbitrer par quelqu'un qui ne connaît pas la technique. Cette leçon te donne la méthode de chiffrage en cinq lignes, et les pièges qui font tripler une facture sans qu'aucune ligne de code n'ait changé.

## 1. LES CINQ LIGNES D'UNE FACTURE

```
facture = calcul + stockage + opérations + egress + services managés
```

| Ligne | Unité facturée | Le piège associé |
| --- | --- | --- |
| Calcul | temps allumé ou temps actif | l'environnement de test jamais éteint |
| Stockage | Go par mois | les anciennes versions et instantanés conservés indéfiniment |
| Opérations | nombre de lectures/écritures | un million de petites lectures qui coûtent plus que le stockage |
| Egress | Go sortants | les images servies sans cache, et les transferts entre régions |
| Managé | palier de disponibilité | la réplique de lecture activée "pour tester" |

## 2. CHIFFRER À TROIS PALIERS, PAS À UN SEUL

Un budget à un seul palier ne dit rien. Un budget à trois paliers montre **quelle ligne explose en premier**, et c'est la seule information vraiment utile.

```js
// une estimation se pose en une ligne par palier, avec ses hypothèses visibles
const palier = { utilisateurs: 10000, requetesParUtilisateur: 120, koParReponse: 40 };
const egressGo = (palier.utilisateurs * palier.requetesParUtilisateur * palier.koParReponse) / 1e6;
// 48 Go/mois : petit. Au million d'utilisateurs, 4 800 Go, et la ligne devient dominante.
```

Règle de méthode : chaque nombre porte son hypothèse et sa date de relevé. Un chiffre sans date est périmé le jour où on te le reproche.

## 3. LES QUATRE MULTIPLICATEURS SILENCIEUX

1. **L'environnement de préproduction identique à la production.** Il double la facture, alors qu'il tourne 8 h par jour ouvré, soit 24% du temps.
2. **Les journaux non filtrés.** Un journal par requête HTTP à 1 Ko, au million d'utilisateurs, coûte souvent plus cher que la base de données.
3. **Le transfert entre zones.** Deux composants bavards placés dans deux zones différentes se paient à chaque échange.
4. **Les instantanés jamais purgés.** Sauvegardes quotidiennes gardées deux ans par défaut, sur un système qui n'a besoin que de 30 jours.

Risque réel : ces quatre lignes n'apparaissent jamais dans une revue d'architecture, parce qu'elles ne relèvent d'aucune décision technique visible. Elles apparaissent dans la facture du trimestre suivant.

## 4. LE COÛT PAR UTILISATEUR, LE SEUL CHIFFRE QUE LA DIRECTION RETIENT

```
coût unitaire = facture mensuelle / utilisateurs actifs mensuels
```

C'est le nombre à mettre en tête de ton document. Il rend comparables des architectures différentes, il se compare au revenu par utilisateur, et il transforme une discussion technique en discussion de marge. Si ton coût unitaire augmente avec l'échelle, ton architecture a un problème structurel qu'aucune négociation tarifaire ne réglera.

## 5. LES LEVIERS D'ÉCONOMIE, PAR RAPPORT EFFORT/GAIN

| Levier | Gain typique | Effort | Risque |
| --- | --- | --- | --- |
| Éteindre les environnements hors heures | 15 à 25% | faible | nul |
| Filtrer et échantillonner les journaux | 10 à 30% | faible | perdre du contexte de débogage |
| Mettre un cache devant les assets | 10 à 40% de l'egress | moyen | invalidation à gérer |
| Engagement de durée auprès du fournisseur | 20 à 40% | faible | s'enfermer sur une base de charge |
| Redimensionner les instances sur mesure réelle | 10 à 30% | moyen | sous-dimensionner un pic |
| Changer d'architecture | variable | fort | régression fonctionnelle |

L'ordre de cette table est l'ordre d'attaque. Personne ne réécrit une architecture pour économiser ce qu'un cache et un arrêt nocturne auraient donné en deux jours.

## 6. EXERCICES

**Exercice 1 : les trois paliers (30 min).** Chiffre ton fil rouge à 100, 10 000 et 1 000 000 d'utilisateurs, une ligne par catégorie, egress inclus. C'est la matière brute du livrable `BUDGET-CLOUD.md`.

**Exercice 2 : le coût unitaire (10 min).** Calcule ton coût par utilisateur actif à chaque palier. Écris en une phrase pourquoi il monte, descend ou reste stable.

**Exercice 3 : les deux leviers du haut (15 min).** Applique mentalement les deux premiers leviers du tableau à ton chiffrage et recalcule. Note l'économie obtenue en euros par mois, pas en pourcentage.

## RÉSUMÉ

Cinq lignes composent une facture, et l'egress est celle qu'on oublie. Un budget se chiffre à trois paliers pour voir quelle ligne explose en premier. Quatre multiplicateurs silencieux, préproduction, journaux, transferts inter-zones, instantanés, gonflent une facture sans décision visible. Le coût par utilisateur actif est le chiffre qui parle à la direction, et les leviers d'économie s'attaquent du plus simple au plus risqué.

## ET APRÈS

Une facture maîtrisée sans droits maîtrisés reste une bombe : [03_identite_droits_secrets.md](03_identite_droits_secrets.md).

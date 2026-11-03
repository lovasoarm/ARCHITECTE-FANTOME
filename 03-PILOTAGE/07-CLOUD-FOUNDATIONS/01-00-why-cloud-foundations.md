---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: medium
assessment_role: instructional_checkpoint
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/02-modeles_cout.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/07-CLOUD-FOUNDATIONS/02-modeles_cout.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Une facture cloud ne devient compréhensible que lorsque tu peux relier chaque ligne à une ressource, une unité consommée et un usage réel.

# Pourquoi ce module mérite ton temps : cloud foundations

Temps de lecture indicatif : 8 min.

T'as déjà vu une facture cloud augmenter alors que le code n'avait presque pas changé ? Le cloud déplace une partie de l'exploitation vers des services facturés à l'usage. Pour décider correctement, il faut comprendre ce qui est consommé et comment le fournisseur le mesure.

## 1. Le problème

Le mot « cloud » ne désigne pas une facture unique. Selon le service, la consommation peut être facturée en durée de calcul, capacité stockée, nombre d'opérations, volume transféré, connexions, rétention ou combinaison de plusieurs unités.

Tant que tu ne sais pas relier une ressource à son unité de facturation, tu ne peux pas expliquer le coût de ton architecture. Un prix unitaire isolé n'est pas encore une estimation : il faut aussi connaître le volume consommé et les conditions tarifaires applicables.

## 2. Le mécanisme : de l'usage au coût

<!-- AF-DIAGRAM:cloud-cost -->

```text
action utilisateur
       |
       v
ressources mobilisées
(calcul, base, stockage, réseau, journaux)
       |
       v
unités consommées
(temps, Go-mois, requêtes, transferts...)
       |
       v
tarif + région + options + paliers
       |
       v
coût estimé, daté et accompagné d'hypothèses
```

Le transfert de données est un poste à examiner, pas un piège universel. Son prix dépend du fournisseur, du service, de la région, du trajet et parfois du volume ou du palier. Les transferts entrants ne sont pas toujours gratuits ; les sorties Internet, les échanges entre régions ou zones, les passerelles et les connexions privées peuvent relever de règles différentes. Des opérations de stockage, de requête ou de réplication peuvent également être facturées.

La seule méthode fiable consiste à lire la grille tarifaire officielle du service et de la région réellement envisagés, puis à vérifier la facture ou le calculateur correspondant. Les tarifs et conditions changent ; la présente introduction ne certifie aucun prix fournisseur.

## 3. Quand examiner le coût réseau : et quand ne pas s'arrêter là

Examine les transferts quand ton système échange beaucoup de données, traverse plusieurs zones ou régions, utilise un service externe, ou sert des fichiers et médias volumineux. Vérifie aussi le coût du calcul, du stockage, des requêtes, des journaux et des composants permanents.

Ne conclus pas qu'une architecture est moins chère uniquement parce que son trafic entrant paraît gratuit. Le coût complet peut être dominé par les opérations, le calcul, la disponibilité, la réplication ou le support.

<!-- AF-LESSON-PROFILE: cloud -->

## 4. Repères de décision

- **Pourquoi :** relier le coût à des unités observables évite de choisir une architecture sur une intuition ou sur un prix unitaire sorti de son contexte.
- **Quand l'utiliser / quand l'éviter :** fais une estimation avant de choisir un service, de changer de région, d'ajouter un cache ou d'augmenter le trafic. Ne chiffre pas une architecture avec un prix ancien ou sans profil d'usage ; commence alors par lister les données manquantes.
- **Limites :** les tarifs peuvent dépendre de paliers, remises, minimums, régions et options. Une estimation n'est pas une facture garantie. La charge réelle, les reprises, les journaux oubliés et les environnements non arrêtés peuvent modifier le résultat.

## 5. Ancrage produit / terrain : Kintana

Pour Kintana, une consultation peut solliciter l'API, la base de données, le stockage de pièces jointes et les journaux. Le profil de charge indique combien de consultations et combien de données sont traitées ; le tarif fournisseur, vérifié à une date précise, transforme ces volumes en estimation.

Le cas Kintana est fictif. Un coût calculé à partir de son profil synthétique est une `SIMULATION`, pas une facture ni une mesure de production.

## 6. Mission utile : estimer le coût d'une demande terminée

Choisis le parcours de consultation ou d'enregistrement d'une demande Kintana. Décris les ressources mobilisées et estime le coût par demande terminée. Sépare les coûts variables et les coûts fixes ; indique les postes inconnus au lieu d'inventer un tarif.

**Livrable :** une section de `06A-BUDGET-CLOUD.md` avec le profil d'usage, les unités, les hypothèses, les sources tarifaires et leur date, le total estimé et le coût par demande terminée.

**Critères d'acceptation :** chaque nombre est rattaché à une unité ; les coûts fixes ne sont pas confondus avec les coûts variables ; les transferts sont décrits selon leur trajet ; les prix inconnus sont signalés ; le statut `SIMULATION` est conservé tant qu'aucune facture réelle ne les confirme.

**Vérification :** augmente le volume d'une unité consommée dans ton modèle (par exemple les Go transférés) et explique quelle ligne devrait évoluer. Si un palier tarifaire ou un forfait rend le résultat non linéaire, indique-le au lieu de supposer une proportionnalité parfaite.

## 7. Transfert

Reprends le même profil avec un autre fournisseur ou une autre région. Conserve les unités d'usage, puis remplace les tarifs, les règles de transfert et les options de service. Explique ce qui reste comparable et ce qui doit être recalculé.

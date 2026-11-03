---
perishability_id: PER-0007

stability: "perissable"
acte: comprendre
cognitive_level: L4
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://nodejs.org/docs/v22.23.4/api/v8.html"
source_type: "primary"
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle versionnée Node.js/V8 22.23.4, utilisée comme repère pour les diagnostics V8 et les traces. Les scénarios du document restent simulés ; cette source ne prouve aucune fuite mémoire réelle."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "VERSIONED_NODE_V8_REFERENCE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# Exemple guidé : enquête sur une fuite mémoire (scénario simulé)

Temps de lecture ~2 min

## Contexte du scénario

> **Scénario pédagogique simulé.** Les valeurs ci-dessous illustrent la forme d'un
> dossier d'enquête ; elles ne sont pas des mesures de production vérifiées ni le
> compte rendu d'un incident réel. Dans un vrai projet, remplace-les par tes propres
> mesures, l'environnement exact, le commit et les artefacts conservés.

- symptôme simulé : la RAM du processus Node passe de 80 Mo à 900 Mo en 20 min sous charge.
- environnement envisagé : Node 22 (version exacte à consigner au moment de la reproduction), environnement de test, charge cible illustrative de 100 req/s.
- reproductibilité : à établir par protocole ; `autocannon -c 50 -d 300` est une commande
  candidate, pas une preuve qu'un incident se reproduit systématiquement.

## Hypothese 1 : fuite via listener non retire

- enonce : chaque req attache un listener a un EventEmitter global jamais retire.
- test à effectuer : `emitter.listenerCount('req')` après un volume de requêtes défini.
- observation simulée dans cet exemple : le compteur suit le nombre de requêtes au lieu de revenir à son niveau de référence.
- verdict pédagogique : hypothèse retenue dans le scénario ; dans un incident réel, conserve la sortie de mesure.

## Hypothese 2 : cache LRU sans borne

- enonce : le cache `Map` interne n'a pas de limite.
- test à effectuer : suivre `cache.size` pendant une durée et une charge documentées.
- observation simulée dans cet exemple : `cache.size` reste stable sur la fenêtre observée.
- verdict pédagogique : cette hypothèse n'explique pas le scénario ; une fenêtre limitée ne prouve pas à elle seule que le cache est borné.

## Cause racine confirmee

- preuve attendue : un heap snapshot et un chemin de rétention qui relient les closures à l'`EventEmitter`.
- correctif candidat : `emitter.once` si l'événement est réellement unique, ou `off()`/`removeListener()` au moment de la fin de vie définie.
- non-régression à écrire : vérifier le retour du nombre de listeners à son niveau de référence après le cycle de vie ; le seuil et le test dépendent du contrat réel de l'application.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

<!-- AF-DIAGRAM:debug -->

## Repère visuel utile : Reproduction et correction d'un incident Kintana

```text
signal utilisateur
      |
      v
hypothèses falsifiables
      |
      v
reproduction stable ? -- non --> instrumenter
      | oui
      v
isoler la cause
      |
      v
patch minimal + test de régression
```

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Le scénario de fuite mémoire ci-dessus est **simulé**. Le fil rouge [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), utilisé dans la mission suivante, est un cas distinct : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique. N'attribue pas à Kintana les mesures fictives du scénario mémoire.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission de transfert Kintana :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Node.js : V8 et heap snapshots](https://nodejs.org/docs/v22.23.4/api/v8.html)
- [Node.js : Events et EventEmitter](https://nodejs.org/docs/v22.23.4/api/events.html)

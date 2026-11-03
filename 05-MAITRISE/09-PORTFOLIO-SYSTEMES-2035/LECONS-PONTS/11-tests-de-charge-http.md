---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/11-tests-de-charge-http.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/11-tests-de-charge-http.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 11 : Tests de charge HTTP : mesurer avant d'optimiser

> **Arc DBZ :** un service qui répond à une requête n'a pas encore prouvé qu'il tient quand plusieurs personnes frappent à la porte. On augmente la charge progressivement, on mesure, puis on explique ce qui sature.

<!-- AF-DIAGRAM:load-testing -->

## Repère visuel utile : Une expérience de charge propre

```text
question + hypothèse
        |
        v
service local/staging + données préparées
        |
        v
scénario borné et reproductible
        |
        v
charge faible -> mesure -> répétition
        |
        v
latence + débit + erreurs + ressources
        |
        v
diagnostic corroboré -> correction -> même test
```

<!-- AF-LESSON-PROFILE: reliability -->

## Résultat attendu

Préparer et exécuter un test de charge HTTP contrôlé sur un service que tu possèdes ou es autorisé à tester, lire les résultats sans les surinterpréter et produire une baseline reproductible. Cette leçon prépare la version de départ de **01 : Tour de Contrôle** ; elle ne valide pas un service de production.

## Pourquoi : pourquoi mesurer la charge

Un test fonctionnel répond à la question : « cette requête donne-t-elle le bon résultat ? ». Un test de charge répond à une autre question : « que devient le service quand plusieurs requêtes arrivent pendant une durée donnée ? ».

Un service peut réussir tous ses tests fonctionnels et devenir lent, saturer sa base ou retourner des erreurs quand la demande augmente. Sans mesure avant/après, une optimisation n'est qu'une supposition.

## Les notions à distinguer

- **Smoke test :** quelques requêtes vérifient que le chemin testé répond. Ce n'est pas une preuve de capacité.
- **Test de charge (load test) :** reproduit un niveau de demande attendu et défini à l'avance.
- **Test de stress :** dépasse progressivement la zone visée pour découvrir où le système se dégrade. Il se fait uniquement dans un environnement autorisé et isolé.
- **Test de pic (spike) :** observe une hausse brusque et courte de la demande.
- **Test d'endurance (soak) :** maintient une charge pendant plus longtemps pour repérer les dégradations lentes. Il est différé ; le premier exercice n'en a pas besoin.
- **Benchmark de fonction :** mesure un petit morceau de code. Il ne remplace pas un test HTTP de bout en bout.

Un premier outil tel qu'Autocannon génère des requêtes HTTP avec un nombre limité de connexions et une durée bornée. Il convient à une première expérience simple ; ce n'est pas un générateur de tous les profils de trafic possibles.

## Le vocabulaire des résultats

- **Débit :** nombre de requêtes terminées par unité de temps (par exemple requêtes/seconde).
- **Latence :** temps entre l'envoi d'une requête et la réception de sa réponse.
- **p50 :** la moitié des requêtes est terminée en ce temps ou moins.
- **p95 :** 95 % des requêtes est terminée en ce temps ou moins ; les 5 % restantes sont plus lentes. C'est un percentile fréquent dans les SLI/SLO, mais il ne faut pas supposer que chaque outil l'affiche.
- **p97.5 :** 97,5 % des requêtes est terminée en ce temps ou moins. Autocannon affiche notamment p50, p97.5 et p99 dans son tableau de latence ; son option `-l` affiche le détail des percentiles disponibles.
- **p99 :** indique davantage les requêtes très lentes, mais devient instable si l'échantillon est trop petit.

**Attention à la mesure :** Autocannon n'affiche pas un p95 exact dans son tableau standard de percentiles. Ne transforme pas p97.5 en p95 par approximation. Si un contrat exige précisément p95, utilise un outil ou une sortie d'histogramme qui fournit ce percentile, puis documente l'outil et sa méthode.

- **Taux d'erreur :** part des requêtes en échec, en timeout ou avec statut non attendu. Ne mélange pas les statuts HTTP métier attendus avec les erreurs serveur.
- **Saturation :** ressource proche de sa limite (CPU, mémoire, pool de connexions, disque, réseau ou capacité de la dépendance).

Aucun chiffre n'est bon ou mauvais dans l'absolu. Il faut d'abord écrire le besoin, la cible et les seuils qui comptent pour l'utilisateur.

## Quand : l'utiliser et quand l'éviter

Utilise un test de charge quand tu dois connaître le comportement d'un endpoint ou d'un service sous une demande définie, comparer deux versions ou vérifier une hypothèse de capacité. Ne le lance pas sur un système tiers ou de production sans autorisation écrite, fenêtre convenue, limites et contact opérationnel. Ne commence jamais par un test de stress.

## La méthode en sept étapes

1. **Formule une question.** Exemple avec Autocannon : « avec cinq connexions au maximum et dix requêtes/seconde au plus sur cet endpoint de lecture, la latence p97.5 reste-t-elle sous le seuil que nous avons choisi ? » Si ton contrat impose p95 exactement, choisis un outil qui expose p95.
2. **Écris l'hypothèse et le seuil avant l'essai.** Précise la route, les données, la latence cible, le taux d'erreur acceptable et les ressources à observer. Ne choisis pas le seuil après avoir vu le résultat.
3. **Prépare l'environnement.** Démarre le service local ou un staging isolé ; utilise des données de test ; vérifie les logs et métriques ; note les versions, la configuration et les ressources de la machine.
4. **Choisis un scénario sans effets dangereux.** Commence par une requête GET en lecture seule. Évite les paiements, messages, créations ou suppressions. Pour tester une écriture, utilise un jeu isolé et une procédure de remise à zéro vérifiée.
5. **Commence petit.** La première expérience ci-dessous est volontairement limitée à cinq connexions pendant vingt secondes. N'augmente la charge qu'après avoir vérifié l'état du service et les ressources.
6. **Répète sans changer la configuration.** Fais trois essais comparables, séparés par une courte période de repos. Note chaque résultat ; ne sélectionne pas uniquement le meilleur.
7. **Diagnostique avant d'optimiser.** Compare latence, débit, erreurs et saturation. Une corrélation suggère une piste ; elle ne prouve pas seule la cause. Vérifie les logs, les traces et les métriques de la dépendance.

## Première expérience locale avec Autocannon

### Préconditions

- Tu sais démarrer et arrêter ton service localement.
- Tu connais l'URL et le port de ton API HTTP.
- Tu as choisi un endpoint GET sans effet de bord.
- Le service écoute uniquement en local ou dans un environnement de test que tu contrôles.

Dans le projet Node de laboratoire, installe Autocannon comme dépendance de développement :

```bash
npm install --save-dev autocannon
```

Démarre ton API dans un premier terminal. Dans un second terminal, remplace le chemin d'exemple par un endpoint de lecture réellement présent dans ton service :

```bash
npx autocannon --connections 5 --duration 20 --pipelining 1 -R 10 -l http://127.0.0.1:3000/health
```

La route `/health` n'est qu'un exemple de vérification simple. Elle peut ne pas solliciter la base de données et ne représente donc pas nécessairement le parcours métier. Après la première vérification, choisis un endpoint GET représentatif mais sans effet de bord, si le projet en possède un.

**Limite de sécurité :** garde la cible sur `127.0.0.1` pour l'exercice initial. Ne remplace pas cette adresse par un site public, une adresse de tiers ou un système de production. Le nombre de connexions, le débit global et la durée de cet exemple sont des plafonds pédagogiques de départ, pas une recommandation universelle.

### Ce que tu dois noter

| Élément           | Valeur à consigner                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Commit et version | Identifiant du code testé                                                                                     |
| Environnement     | OS, CPU, mémoire, runtime et configuration                                                                    |
| Cible             | URL locale et méthode HTTP ; aucune donnée secrète                                                            |
| Charge            | 5 connexions maximum, 20 secondes, 1 requête pipelinée, débit global plafonné à 10 requêtes/seconde (`-R 10`) |
| Résultat          | Débit, latence disponible, erreurs et timeouts                                                                |
| Ressources        | CPU/mémoire du service et du générateur si disponibles                                                        |
| Répétition        | Résultat de chacun des trois essais                                                                           |
| Limites           | Dépendances non sollicitées, échantillon, variabilité et ce qui n'a pas été mesuré                            |

Avec l'option `-l`, Autocannon affiche le détail des percentiles qu'il calcule, dont p50, p97.5 et p99. Il ne fournit pas p95 exact dans cette sortie standard. Conserve la sortie brute avec la version de l'outil au lieu de recopier une valeur isolée ; ne déduis jamais un p95 à partir de p97.5.

## Lire le résultat sans raconter d'histoires

- Si la latence augmente pendant que le CPU du service atteint sa limite, le CPU est une piste plausible ; confirme avec un profil ou une mesure ciblée.
- Si l'API attend la base et que le pool de connexions est saturé, augmenter le nombre de connexions HTTP peut empirer la situation. Examine les métriques et traces de base.
- Si les erreurs augmentent, distingue timeout client, timeout serveur, refus de connexion et statut métier.
- Si le générateur de charge sature avant le service, le test ne mesure plus correctement la capacité du service.
- Si `/health` reste rapide, tu as seulement démontré que ce contrôle reste rapide ; tu n'as pas prouvé la capacité du parcours complet.

Une mesure faite sur un ordinateur portable, avec une base locale et peu de données, ne prédit pas directement le comportement d'un déploiement distant. Aucun résultat local n'est présenté comme une garantie de production. Décris le périmètre au lieu de généraliser.

## Ancrage produit / terrain

### Kintana

Une API Kintana de laboratoire sert ici de terrain d'expérience ; elle ne représente pas un service de production.

## Mission utile : baseline HTTP de Kintana

Sur une API Kintana locale ou un service de laboratoire équivalent, choisis un endpoint GET représentatif et sans effet de bord. Écris une question, un seuil motivé, un scénario limité, puis réalise trois essais identiques. Corrèle un résultat observé avec les logs ou métriques disponibles. N'invente aucun chiffre de production : étiquette toutes les mesures `LAB`.

**Livrable :** `LOAD-TEST-REPORT.md` contenant question, hypothèse, seuils pré-déclarés, environnement, commit, route, commande/version de l'outil, trois sorties brutes, tableau de synthèse, interprétation, limite et prochaine expérience.

**Critères d'acceptation :** la commande est reproductible ; la cible est autorisée et isolée ; la charge est bornée ; les erreurs sont consignées ; le rapport distingue observation, hypothèse et cause confirmée ; aucun résultat local n'est présenté comme une garantie de production.

## Gate READY / NOT READY

`READY` signifie que tu peux, sans recopier le rapport d'exemple :

- choisir une route GET sûre et expliquer ce qu'elle sollicite réellement ;
- annoncer question, seuil, environnement et limite avant le test ;
- lancer un scénario borné et le répéter trois fois ;
- expliquer débit, latence p50/p97.5/p99, erreurs et saturation ;
- distinguer le p95 comme indicateur courant du p97.5 réellement fourni par Autocannon, sans les confondre ni interpoler ;
- confronter une hypothèse à au moins un signal indépendant (métrique, trace ou log) ;
- conserver commande, version, résultats bruts et limites.

`NOT READY` : tu ne sais pas distinguer un benchmark de fonction d'un test HTTP, tu ne contrôles pas la cible, tu testes un endpoint à effets de bord sans remise à zéro, ou tu conclus à une cause à partir d'un seul chiffre. Reprends les étapes correspondantes avant la Tour de Contrôle.

## Limites

Autocannon avec connexions constantes n'est pas un modèle complet de trafic utilisateur, et un test local ne prouve ni capacité de production, ni disponibilité, ni absence de contention externe. Une baseline n'est valable que pour le code, l'environnement, les données et le scénario consignés. Le test ne remplace pas les SLI/SLO, les traces ou les tests fonctionnels.

## Mécanisme : le modèle mental à retenir

Un test de charge est une expérience : une question, un protocole, des mesures et des limites. Si l'environnement ou le scénario change, la comparaison doit l'indiquer. On ne diagnostique pas avec un chiffre magique ; on cherche des signaux qui se corroborent.

## Références et suite

- [Autocannon : dépôt et documentation](https://github.com/mcollina/autocannon).
- [Logs structurés](../../../03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md), [tracing distribué](../../../03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md), [métriques et alertes](../../../03-PILOTAGE/05-OBSERVABILITY/05-metrics_alerting.md).
- [SLI/SLO et budget d'erreur](../../../03-PILOTAGE/06-FIABILITE-SLO/02-sli_slo_budget_erreur.md) et [01 : Tour de Contrôle](../01-tour-de-controle.md).

## Transfert obligatoire

Une seconde version du service paraît plus rapide sur un essai, mais plus lente sur les deux autres. Détermine quelles informations manquent avant de déclarer la version gagnante ; propose un protocole de répétition et explique quand tu refuserais de conclure.

---
stability: evolutif
acte: appliquer
---


> **SCÈNE CRAZYDEVS : plan d’évasion :** changer de CMS au milieu de la publication, c’est migrer sans fermer la prison. La stratégie de sortie doit exister avant le choix d’entrée.

# Coût, sécurité et migration CMS : calculer le coût total de possession

## 1. Le coût total ne se limite pas au prix du CMS

Le **TCO (Total Cost of Ownership, coût total de possession)** inclut licences, hébergement, CDN, bases, stockage, trafic, observabilité, sauvegardes, sécurité, support, intégration, développement des templates/frontends, mises à jour, astreinte, formation, migration et coût de sortie. Un CMS « gratuit » peut coûter cher à maintenir ; une offre managée plus chère peut réduire l'effort d'exploitation. Il faut calculer sur une période commune et expliciter les hypothèses.

## 2. Modèle de coût

| Poste | Exemple de quantité | Question à vérifier |
|---|---|---|
| Licence/abonnement | environnements, utilisateurs, API | prix et limites selon plan/date |
| Compute | CPU/RAM, instances, fonctions | charge moyenne et pics |
| Stockage | médias, base, sauvegardes | croissance, rétention, restauration |
| CDN/transfert | requêtes, Go sortants | cache hit, région, images |
| Intégration | jours de développement | preview, adaptateurs, migration |
| Exploitation | heures/mois, support | patchs, incidents, upgrades |
| Sécurité | audit, scan, MFA, coffre | risques et preuves nécessaires |
| Sortie | export, transformation, replatform | format portable, coûts de transfert |

Ne pas inventer un prix de fournisseur. Relever tarif, région, devise, date, métrique de facturation et remise dans la source officielle au moment de la décision. Marquer toute estimation comme hypothèse.

## 3. Sécurité par flux

```text
[Éditeur] --MFA / rôle---> [Admin CMS]
                              |
                        publication validée
                              |
                              v
                        [Contenu stocké]
                              |
                       API / rendu public
                              |
                              v
                       [Cache / CDN]
                              |
                              v
                          [Lecteur]

[Secrets CI / API] -> [Coffre protégé] -> [Workload avec scope minimal]
```

Contrôler les rôles, MFA, journal de publication, accès aux médias, protection des webhooks, validation des entrées, politique de plugins, mises à jour, segmentation admin/public, sauvegardes et restauration. Pour headless, tokens à portée limitée et aucune clé d'administration dans le code client public. Pour CMS couplé, isoler l'administration, limiter les extensions et vérifier les permissions des fichiers.

## 4. Stratégie de migration

1. Inventorier types de contenu, volumes, médias, relations, utilisateurs, rôles, URLs et workflows.
2. Identifier les règles implicites : champs obligatoires, statuts, langues, SEO, publications planifiées et redirections.
3. Définir un modèle cible et une stratégie de mapping ; conserver la provenance.
4. Migrer un échantillon, mesurer erreurs et pertes ; comparer les comptes et relations.
5. Exécuter des répétitions à blanc et définir une fenêtre de gel ou un mécanisme de delta.
6. Préparer sauvegarde, DNS/routage, invalidation de cache, surveillance et retour arrière.
7. Basculer progressivement si possible ; surveiller erreurs, SEO, publication et données.
8. Décommissionner l'ancien système après preuve, période définie et validation métier.

```text
[CMS source] -> [Export inventorié] -> [Mapping + validation]
       |                                     |
       | sauvegarde                           v
       +------------------------------> [CMS cible]
                                             |
                                      [Tests de parité]
                                             |
                                      [Shadow / recette]
                                             |
                                      [Bascule contrôlée]
                                             |
                              succès --------+------ échec
                                |                     |
                                v                     v
                          [Stabiliser]       [Retour routage/plan
                                             de restauration]
```

Attention : basculer le DNS ne restaure pas des données écrasées. Séparer rollback de routage, restauration de données et compatibilité des contenus. Un rollback peut être impossible si l'ancien système ne comprend pas les modifications faites dans le nouveau.

## 5. Gouvernance après migration

Désigner propriétaires de schémas, modèles, plugins, tokens, API et workflows. Définir SLO pour consultation et publication, délais de patch, politique de dépréciation, versionnement d'API, durée de rétention et processus d'export. Pour toute dépendance managée, documenter export, format, frais et délai de sortie.

## 6. Exercice

Construire un TCO sur 24 mois pour deux options (couplé et headless) avec hypothèses explicites. Ajouter un plan de migration de 3 types de contenu, un contrôle de parité, une analyse de menace et le scénario « retour arrière après ajout de contenu côté cible ».

**Grille /25 :** coûts complets (5), hypothèses traçables (3), sécurité (5), cartographie et mapping (4), migration/validation (4), rollback/restauration (3), gouvernance/sortie (1). Refuser toute estimation qui présente des tarifs non datés comme des faits actuels.

## 7. Preuve et fraîcheur

Livrer un ADR, feuille TCO avec source et date, inventaire de migration, scénario de restauration testé ou simulation clairement marquée, et matrice de responsabilités. Les prix et capacités de fournisseurs sont périssables : vérifier auprès des pages tarifaires officielles avant chaque décision et enregistrer version/date/source.

## Inventaire de coût conservé

La comparaison inclut explicitement licence, hébergement, intégrations, maintenance, lock-in, migration, sauvegarde, permissions, surface d'administration et incident de publication. Pour chaque poste, noter source, hypothèse, fréquence, propriétaire et effet d'une hausse de trafic ou d'un départ du fournisseur.

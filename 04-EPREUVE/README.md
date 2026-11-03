---
stability: intemporel
acte: restituer
---

# 04-EPREUVE

Le bloc 04-EPREUVE regroupe des modules de validation avancée et le Capstone ; ce n'est pas une étape pour débuter en programmation. Il s'inscrit dans la progression décrite par la [Route apprenant 58](../06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md). Ne le traite pas comme une lecture obligatoire au démarrage du curriculum.

La gate de transfert de ce bloc possède un seul livrable noté : `PORTAGE.md`. Il comporte deux niveaux de preuve, clairement étiquetés :

- **`PORTAGE_CONÇU` : voie sans compte ni dépense cloud :** porter un service non trivial dans un second langage et exécuter les tests de contrat sur les deux implémentations dans des environnements locaux distincts ; décrire le fournisseur cible, les services, la région, le plan de déploiement, le rollback et les prix publics datés. Ce niveau permet d'entrer au Capstone, mais ne prétend pas que le second fournisseur a été déployé ni que S7 est fermé.
- **`PORTAGE_EXÉCUTÉ` : preuve complète :** mêmes invariants, second langage et service réellement déployé chez un second fournisseur ; tests comparables exécutés des deux côtés, avec URLs/logs/captures datés et mesures côté cible. Ce niveau ferme la preuve S7 lorsqu'elle est examinée selon les critères du profil Staff.

Le modèle à suivre, section par section, est [99 : Modèle de portage](../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md). La différence entre les deux niveaux doit rester visible dans `PORTAGE.md` et dans les statuts de preuve.

**Condition d'entrée au Capstone :** `PORTAGE.md` existe avec le mode `PORTAGE_CONÇU` ou `PORTAGE_EXÉCUTÉ`, les tests de contrat comparables passent sur les deux implémentations et l'écart de coût théorique est calculé à partir de prix publics relevés, datés et sourcés ([relevé tarifaire](../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)). Aucun compte cloud, moyen de paiement ou achat de ressource n'est exigé pour cette porte.

Un portage conçu sans déploiement reste une preuve de conception et d'exécution locale, pas une preuve d'exploitation chez le second fournisseur. Étiquette-le `PORTAGE_CONÇU` ; ne le présente jamais comme `PORTAGE_EXÉCUTÉ` ou S7 validé.

## Quand préparer la gate `PORTAGE.md`

- Pas au début du Socle, de Fundamentals ou du Cadrage.
- Après le Cadrage, lorsque le fil rouge personnel est qualifié.
- Après les compétences d'exploitabilité de l'étape 7 de la Route 58 et les prérequis du modèle de portage.
- À terminer avant l'entrée au Capstone de l'étape 12. Le travail peut être préparé pendant l'étape 10 : Architecture et impact.

Les modules du bloc ne forment pas une chaîne de prérequis obligatoire menant tous au Capstone.
La liste de dossiers ci-dessous est un **catalogue**, pas une instruction de les terminer dans
l'ordre numérique.

| Module         | Contrat d'entrée                                                                        | Statut dans le parcours                                                             |
| -------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Bonus Vault    | Aucun                                                                                   | Coffre facultatif, consultable hors ordre                                           |
| Tool Cave      | Roadmap Run terminé + bug non trivial vécu et décrit                                    | Module complémentaire avec sa propre validation                                     |
| Realtime       | Web Inclusive terminé, contrôlé dans son `00-PREREQUIS.md`                              | Module complémentaire avec sa propre validation                                     |
| Big App Snoop  | Realtime + Archi Lab + API Dojo, contrôlés dans son `00-PREREQUIS.md`                   | Module complémentaire ; ne remplace pas une pièce de preuve alternative du Capstone |
| Capstone Arena | Son `00-PREREQUIS.md` fait foi : quatre pièces amont, `PORTAGE.md` et éléments chiffrés | Épreuve d'intégration ; les autres modules du bloc ne sont pas tous obligatoires    |

Le Capstone est donc ouvert par son contrôle `00-PREREQUIS.md`, pas par la complétion
automatique de tous les dossiers du bloc. La `REVUE-DE-RISQUES.md` est un livrable interne
du Capstone : elle doit être signée et datée avant le premier commit de code du jalon 3 et
respecter la grille, notamment les tests automatisés de contrôle d'accès horizontal et de
concurrence. Elle ne bloque pas l'ouverture initiale du module.

Les modules, Bosses de palier et rétrospectives conservent leurs propres séquences et conditions de sortie. La présente règle positionne uniquement `PORTAGE.md` dans le parcours ; elle ne déplace pas les autres gates et ne prétend pas que le contenu complet du bloc 04-EPREUVE précède le Capstone qui en fait partie.

Kintana est un cas d'étude pédagogique commun, pas le fil rouge personnel par défaut. Une pratique sur Kintana ou une simulation peut aider à préparer le raisonnement, mais ne valide pas le portage réel d'un service personnel déployé.

Les challenges, Bosses de palier et rétrospectives conservent leurs propres critères de progression : ils vérifient la maîtrise de leurs modules. `PORTAGE.md` reste l'unique livrable noté de la gate de transfert décrite ici.

## Appel TECH-ILA 5 sur 6 : Niveau 5 Transfert

<!-- AF-DIAGRAM:transfer -->

```text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Ouvre la carte lorsque tu commences effectivement ce bloc. Elle aide à choisir le second langage et le second fournisseur ; ce n'est pas une lecture préalable de la Route 58.

- Carte : [Niveau 5 Transfert](../06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/07-niveau-5-transfert.md)
- Ce que tu produis avec : le dossier `PORTAGE.md`, unique livrable noté de ce palier.
- Règle : la carte est périssable, le module ne l'est pas. Si un nom d'outil vieillit, actualise la carte et les sources sans modifier les invariants du livrable.

<!-- CONTENU-DOSSIER:debut -->

- [`01-BONUS-VAULT/`](01-BONUS-VAULT/README.md)
- [`02-TOOL-CAVE/`](02-TOOL-CAVE/README.md)
- [`03-REALTIME/`](03-REALTIME/README.md)
- [`04-BIG-APP-SNOOP/`](04-BIG-APP-SNOOP/README.md)
- [`05-CAPSTONE-ARENA/`](05-CAPSTONE-ARENA/README.md)
- [`03b-BOSS-1/`](03b-BOSS-1/README.md)
- [`04b-BOSS-2/`](04b-BOSS-2/README.md)
- [Rétrospective de bloc : Bloc EPREUVE](02A-RETRO-BLOC-4-EPREUVE.md)

<!-- CONTENU-DOSSIER:fin -->

> **Compagnons actifs :** [Code d'honneur CrazyDevs](../06-ANNEXES-TRANSVERSES/07-FUN-CODE-HONNEUR.md) · [Synchronisation TECH-ILA](../06-ANNEXES-TRANSVERSES/04-TECH-ILA/02-SYNCHRONISATION-PARCOURS.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique complémentaire : Kintana

Kintana reste un cas d'étude commun. Tu peux utiliser ce scénario pour t'entraîner à rédiger une RFC/ADR sur une décision qui touche API, données et exploitation, à comparer deux options et à transformer les objections en critères d'acceptation. **Cette activité est facultative et ne crée ni deuxième livrable noté, ni gate supplémentaire pour 04-EPREUVE.** Une simulation peut préparer `PORTAGE_CONÇU`, mais ne valide jamais `PORTAGE_EXÉCUTÉ`. Elle peut enrichir un dossier de décision existant ; le seul livrable noté de ce palier reste `PORTAGE.md`.

L'adoption réelle d'une décision par une équipe reste `non démontrée` tant qu'une équipe ne l'a pas effectivement adoptée. Une simulation ou une revue fictive doit être étiquetée comme telle.

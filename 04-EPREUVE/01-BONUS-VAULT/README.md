---
stability: intemporel
acte: comprendre
route: complete
route_family: vault
---

# Module 04-EPREUVE/01-BONUS-VAULT : Bonus Vault

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Consulter le coffre à tout moment](00-PREREQUIS.md) | Niveau suivant : aucun

**Auto-diagnostic facultatif :** il sert à choisir les ressources à ouvrir, pas à autoriser
l'entrée. Aucun module précédent n'est exigé ; le coffre se consulte hors ordre.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ce coffre n'enseigne pas une méthode nouvelle. Il archive, sous forme utilisable en situation
réelle, les outils transversaux que les modules du parcours mobilisent : formats de décision,
checklists d'exécution, ressources durables et catalogue d'anti-patterns. Tu peux y revenir
sans suivre une séquence linéaire.

Ce n'est pas un niveau à traverser dans l'ordre. C'est un coffre à ouvrir quand tu es en
situation réelle : tu dois trancher une décision d'architecture contestée, préparer une mise
en prod, gérer un incident, ou onboarder quelqu'un : et tu n'as pas le temps de réinventer le
format depuis zéro.

Prérequis : aucun. Son usage prend tout son sens après avoir vécu une vraie décision
d'architecture contestée ou un incident, mais cette expérience améliore la pertinence de la
consultation sans conditionner l'accès.

## Ce que tu sais faire à la sortie

- Tu sais choisir et remplir le bon format de décision (ADR, RFC, one-pager) selon l'enjeu
  et l'audience, sans sur-documenter une décision triviale ni sous-documenter une décision
  structurante.
- Tu as des checklists exécutables pour les quatre moments à plus haut risque d'un projet :
  mise en prod, revue de code, gestion d'incident, onboarding.
- Tu sais où chercher une réponse durable plutôt qu'un tutoriel qui périme en six mois.
- Tu reconnais, nommés et illustrés, les anti-patterns qui reviennent dans toutes les
  équipes techniques : et tu sais les repérer avant qu'ils ne deviennent la norme du projet.

## Structure du niveau

```text
15-BONUS-VAULT/
+-- 05-decision-templates.md              --> ADR, RFC, one-pager
+-- 97-checklists.md                      --> mise en prod, revue, incident, onboarding
+-- 02-reading-list.md                    --> ressources durables, sans liens morts
+-- 03-anti-patterns-hall-of-fame.md      --> catalogue commenté des erreurs qui reviennent
+-- 04-security-cost-privacy.md           --> sécurité, coûts et données personnelles
+-- 95-challenge.md                          --> guide facultatif pour préparer la revue de risques du Capstone
\-- 90-grimoire.md                           --> mémo dense
```

[05-decision-templates.md](05-decision-templates.md) | [97-checklists.md](97-checklists.md) |
[02-reading-list.md](02-reading-list.md) | [03-anti-patterns-hall-of-fame.md](03-anti-patterns-hall-of-fame.md) |
[04-security-cost-privacy.md](04-security-cost-privacy.md) |
[95-challenge.md](95-challenge.md) | [90-grimoire.md](90-grimoire.md)

Ce coffre peut servir de référence transversale pendant les modules de conception,
sécurité, exploitation et Capstone. Il n'établit aucun ordre de passage : ses ressources
sont consultables selon le besoin et leurs conditions locales.
Auto-test d'entrée : (1) Sais-tu nommer un incident réel qu'une checklist de mise en prod
aurait empêché ? (2) Sais-tu distinguer un ADR d'un RFC par l'audience visée, pas par la
longueur ? (3) Sais-tu citer un anti-pattern que tu as toi-même commis récemment ?
**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Écart au gabarit

Ce coffre n'a ni `01-01-why-this-level.md` ni `96-boss-fight.md` : il regroupe des formats
et checklists de référence, sans ajouter une méthode ni une épreuve adverse distincte.

Le challenge [`95-challenge.md`](95-challenge.md) fournit un gabarit détaillé de
`REVUE-DE-RISQUES.md`. **Le document de revue de risques est exigé par la grille du Capstone
et doit être prêt avant le premier commit de code du jalon 3.** Cette exigence porte sur le
livrable et sur son antériorité, pas sur la lecture ou l'achèvement de tout Bonus Vault.
L'apprenant peut utiliser le gabarit du coffre ou produire le même document à partir des
critères du Capstone. La revue de risques est un contrôle interne du Capstone ; ce n'est pas
une gate d'entrée supplémentaire avant d'ouvrir le Capstone.

## La revue de risques s'écrit avant de coder

La revue de risques du Capstone s'écrit avant le premier commit de code du jalon 3. Si tu
la découvres au moment de livrer, tu as déjà pris les mauvaises décisions : tu es en train
de les documenter, pas de les éviter.
Son antériorité est notée sur 20 points dans
[05-CAPSTONE-ARENA/04-evaluation-grid.md](../05-CAPSTONE-ARENA/04-evaluation-grid.md).

## Comment lire ce niveau

Ouvre `01` la première fois qu'une décision technique dépasse le cadre d'une seule
personne. Ouvre `02` avant chaque mise en prod, revue, incident ou arrivée d'une nouvelle
personne dans l'équipe : pas après. `03` te donne où chercher quand un problème neuf sort du
cadre de ce curriculum. `04` se lit comme un miroir : la plupart des anti-patterns décrits,
tu les as déjà commis ou vus commettre, et les nommer est la première étape pour les éviter.

La section `05` et son challenge constituent un **gabarit facultatif** pour préparer la
revue de risques exigée par le Capstone. Les critères obligatoires et la structure du livrable
sont aussi définis dans `../05-CAPSTONE-ARENA/03-deliverables.md` et
`../05-CAPSTONE-ARENA/04-evaluation-grid.md` : tu peux donc préparer cette revue sans terminer
ni même parcourir tout Bonus Vault.

La rétrospective du bloc Maîtrise se fait à la fin de ta progression dans ce bloc. Elle
n’est ni une condition d’entrée ni une condition de lecture de Bonus Vault : ce coffre reste
consultable dans l’ordre de ton besoin.

## Ce qui ne se passe pas ici

Ce coffre ne remplace ni le contexte métier ni les expériences réelles. Un template d'ADR
mal rempli sans décision contestée, sans contraintes identifiées et sans preuve reste un
exercice de style creux. Le coffre fournit des formats et des repères ; le fond vient du
problème réel, des arbitrages observés et de leurs conséquences, pas d'un module antérieur
à terminer.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `01-BONUS-VAULT`](00-PREREQUIS.md)
- [Templates de décision : ADR, RFC, one-pager](05-decision-templates.md)
- [BONUS-VAULT : pourquoi ce niveau existe (et ce qu'il n'est pas)](01-01-why-this-level.md)
- [Checklists : mise en prod, revue, incident, sécurité, onboarding, passation](97-checklists.md)
- [Ressources durables, sans liens morts](02-reading-list.md)
- [Anti-patterns hall of fame](03-anti-patterns-hall-of-fame.md)
- [Sécurité, coûts et données personnelles : ce que le capstone exige de savoir défendre](04-security-cost-privacy.md)
- [Challenge : Revue de risques du projet fil rouge](95-challenge.md)
- [Grimoire : Bonus Vault](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

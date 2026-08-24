---
stability: intemporel
acte: comprendre
route: complete
route_family: vault
---

# Module 04-EPREUVE/01-BONUS-VAULT : Bonus Vault

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../02-TOOL-CAVE/README.md) | Niveau suivant : aucun, c'est le dernier coffre

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../02-TOOL-CAVE/90-grimoire.md) (20 minutes), puis refais son
[challenge](../02-TOOL-CAVE/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au module `04-EPREUVE/01-BONUS-VAULT` une difficulté qui vient du module `04-EPREUVE/02-TOOL-CAVE`.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ce niveau n'enseigne pas de méthode nouvelle. Il archive, sous forme utilisable en situation
réelle, les outils transversaux que tous les niveaux précédents ont mobilisés sans jamais
les rassembler au même endroit : formats de décision, checklists d'exécution, ressources qui
ne périment pas, et catalogue des erreurs qui reviennent partout, sous des formes légèrement
différentes, dans toutes les équipes techniques.

Ce n'est pas un niveau à traverser dans l'ordre. C'est un coffre à ouvrir quand tu es en
situation réelle : tu dois trancher une décision d'architecture contestée, préparer une mise
en prod, gérer un incident, ou onboarder quelqu'un : et tu n'as pas le temps de réinventer le
format depuis zéro.

Prérequis : aucun niveau précédent n'est strictement requis pour lire ce coffre, mais son
usage prend tout son sens après avoir vécu une vraie décision d'architecture contestée ou un
vrai incident (Module `02-CONSTRUCTION/15-ARCHI-LAB` à 12).

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
+-- 95-challenge.md                          --> revue de risques du projet fil rouge, obligatoire
\-- 90-grimoire.md                           --> mémo dense
```

[05-decision-templates.md](05-decision-templates.md) | [97-checklists.md](97-checklists.md) |
[02-reading-list.md](02-reading-list.md) | [03-anti-patterns-hall-of-fame.md](03-anti-patterns-hall-of-fame.md) |
[04-security-cost-privacy.md](04-security-cost-privacy.md) |
[95-challenge.md](95-challenge.md) | [90-grimoire.md](90-grimoire.md)

Ce niveau réutilise : Module `02-CONSTRUCTION/15-ARCHI-LAB` à 12, en particulier le brief et le modèle de données du
[Capstone Arena](../05-CAPSTONE-ARENA/README.md).
Auto-test d'entrée : (1) Sais-tu nommer un incident réel qu'une checklist de mise en prod
aurait empêché ? (2) Sais-tu distinguer un ADR d'un RFC par l'audience visée, pas par la
longueur ? (3) Sais-tu citer un anti-pattern que tu as toi-même commis récemment ?
**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Écart au gabarit

Ce niveau n'a ni `01-01-why-this-level.md` ni `96-boss-fight.md`, contrairement au gabarit standard
d'un niveau. Ce n'est pas un oubli : ce coffre n'enseigne aucune méthode nouvelle, il
rassemble des formats déjà justifiés dans les modules amont, de `02-CONSTRUCTION/15-ARCHI-LAB` au capstone, donc un fichier "pourquoi ce
niveau existe" répéterait ce que ces niveaux ont déjà démontré en situation. De même, un
boss-fight suppose une mise en situation adverse nouvelle : ce coffre n'a pas de mécanisme
propre à tester en pression, il a un livrable de consultation et un livrable obligatoire
(`95-challenge.md`), pas un affrontement. Le statut de ce niveau est donc double : c'est un
coffre de référence, consultable hors ordre au moment où le besoin réel se présente, mais il
porte un livrable obligatoire, la revue de risques du projet fil rouge, qui doit être produit
avant que le capstone (Module `04-EPREUVE/05-CAPSTONE-ARENA`) ne soit considéré comme validé. Voir
[95-challenge.md](95-challenge.md) et
[../12-CAPSTONE-ARENA/04-evaluation-grid.md](../05-CAPSTONE-ARENA/04-evaluation-grid.md) pour
le point exact où ce livrable est exigé.

## La revue de risques s'écrit avant de coder

La revue de risques s'écrit avant de coder. Si tu la découvres au moment de livrer, tu as
déjà pris les mauvaises décisions : tu es en train de les documenter, pas de les éviter.
Son antériorité est notée sur 20 points dans
[05-CAPSTONE-ARENA/04-evaluation-grid.md](../05-CAPSTONE-ARENA/04-evaluation-grid.md).

## Comment lire ce niveau

Ouvre `01` la première fois qu'une décision technique dépasse le cadre d'une seule
personne. Ouvre `02` avant chaque mise en prod, revue, incident ou arrivée d'une nouvelle
personne dans l'équipe : pas après. `03` te donne où chercher quand un problème neuf sort du
cadre de ce curriculum. `04` se lit comme un miroir : la plupart des anti-patterns décrits,
tu les as déjà commis ou vus commettre, et les nommer est la première étape pour les éviter.

Ouvre `05` avant de produire ta revue de risques pour le capstone : c'est lui qui pose le
vocabulaire et les seuils que `95-challenge.md` te demande d'appliquer, et que le capstone
vérifie désormais par un test automatisé sur le contrôle d'accès (voir 12-CAPSTONE-ARENA).

Avant de continuer : passe par [02A-RETRO-BLOC-5-MAITRISE.md](../../05-MAITRISE/02A-RETRO-BLOC-5-MAITRISE.md), la
rétrospective du bloc Maîtrise que tu viens de terminer.

## Ce qui ne se passe pas ici

Ce coffre ne remplace aucun niveau précédent. Un template d'ADR mal rempli par quelqu'un qui
n'a jamais vécu une vraie décision contestée reste un exercice de style creux. Ce niveau
donne la forme ; les niveaux précédents donnent le fond.

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

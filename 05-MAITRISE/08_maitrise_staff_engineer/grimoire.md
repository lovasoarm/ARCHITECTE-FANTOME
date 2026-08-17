---
stability: intemporel
acte: restituer
---

# GRIMOIRE : LE PALIER FINAL

Mémo dense du palier. Il se lit **en dernier**, après le dossier, le challenge et le boss fight.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Tension | Deux exigences vraies en même temps dont la satisfaction complète de l'une dégrade l'autre. | `arbitrer(coutMensuel, disponibilite)` | Garo qui doit choisir entre protéger le village et poursuivre le Horreur / un entraîneur qui sort son meilleur défenseur pour marquer | Cette analogie casse quand les deux exigences ne sont pas mesurables dans la même unité : sur le terrain le score tranche, dans un système il faut convertir la disponibilité en euros avant de pouvoir comparer. |
| Arbitrage écrit | Décision tranchée, datée, avec l'option écartée et la raison chiffrée du choix. | `ADR-012.md` | Le procès-verbal d'un conseil de guerre des Avengers / une feuille de match signée | Cette analogie casse quand la décision doit pouvoir être révisée : un procès-verbal fige l'histoire, un ADR se révise en citant l'ADR initial et le fait nouveau. |
| Point mort | Volume ou durée à partir duquel l'option la plus chère à mettre en place devient la moins chère à porter. | `seuil = coutFixe / gainUnitaire` | Le moment du match où remplacer un joueur fatigué devient rentable / le point où réparer coûte plus cher que remplacer | Cette analogie casse quand le gain unitaire n'est pas stable : au football le rythme baisse continûment, dans un système le gain peut s'effondrer d'un coup au franchissement d'un palier de charge. |
| Budget d'erreur | Part de requêtes que le SLO autorise à échouer sur la fenêtre, exprimée en volume, pas en pourcentage ressenti. | `budget = (1 - slo) * requetes` | Les fautes qu'une équipe peut commettre avant le carton rouge / les points de vie restants d'un personnage | Cette analogie casse quand les échecs ne se valent pas : les points de vie décroissent uniformément, un budget d'erreur peut être consommé entièrement par une seule minute de panne au pire moment. |
| Rayon d'impact | Ensemble des composants et des personnes qu'une panne ou un changement atteint réellement. | `dependants(service)` | L'onde d'un Kamehameha qui dépasse la cible / la contamination d'un quartier dans Walking Dead | Cette analogie casse quand la propagation n'est pas géographique mais contractuelle : un consommateur situé très loin du composant fautif tombe en premier parce qu'il lit son contrat sans repli. |
| Dette déclarée | Raccourci assumé par écrit, avec sa raison, son coût estimé et sa date de réexamen. | `DETTE.md` | Une avance sur salaire notée dans le carnet / un pari annoncé avant le match | Cette analogie casse quand personne ne relit le carnet : une dette déclarée sans date de réexamen redevient exactement une dette cachée, avec en plus l'illusion d'avoir été honnête. |
| Contexte borné | Périmètre où un terme du domaine a une seule définition et un seul propriétaire. | `surveillance/risque` | Le vestiaire où un mot d'ordre ne vaut que pour l'équipe / la juridiction d'un shérif dans Banshee | Cette analogie casse quand deux contextes échangent des données : le mot franchit la frontière et se met à désigner autre chose sans que personne ne le déclare. |
| Recevabilité | Propriété binaire d'un dossier : tous les items du gate sont présents, ou le dossier n'est pas examiné. | `gate.every(item => item.present)` | Le contrôle des licences avant le coup d'envoi / la fouille à l'entrée du pénitencier | Cette analogie casse quand un item est partiellement rempli : un contrôle d'entrée dit oui ou non, un dossier peut contenir un budget cloud sans date, ce qui compte comme absent. |

## Le fil du palier en une phrase

Un système déjà livré, une contrainte imposée après coup, six familles de preuves qui se
contredisent, et une seule personne qui tranche par écrit et signe.

## ET APRÈS

[04_plan_90_jours.md](04_plan_90_jours.md).

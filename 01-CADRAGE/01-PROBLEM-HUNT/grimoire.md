# Grimoire : Niveau 02, Problem Hunt

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Mémo à ouvrir en réunion de cadrage, quand la pression pousse à foncer vers une solution avant
d'avoir vérifié le problème. Sert à poser les bonnes questions en direct, pas à les réciter.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Demande | Ce que la personne dit vouloir ("il nous faudrait un tableau de bord"). | `printf "demande_brute: %s\n" "tableau de bord" >> cadrage.md` | commande passée au comptoir sans détail / ordonnance lue sans interroger le patient | « commande passée au comptoir sans détail » décrit un monde où chaque étape se voit ; sur Demande, une demande formulée en solution cache le problème qu'elle prétend résoudre. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Besoin réel | Le problème sous-jacent que la demande tente de résoudre, souvent différent de la demande formulée. | `printf "besoin_reel: %s\n" "savoir qui est dispo en urgence" >> cadrage.md` | vraie douleur derrière la plainte du patient aux urgences / vrai manque derrière la commande client | « vraie douleur derrière la plainte du patient aux urgences » se corrige toute seule quand elle dérape ; sur Besoin réel, une demande formulée en solution cache le problème qu'elle prétend résoudre. Remonte de la solution demandée au problème réel avant de coder. |
| Contrainte | Ce qui limite la solution (budget, réglementation, matériel existant, formation des utilisateurs). | `printf "contraintes:\n- budget: 5k\n- reglement: RGPD\n" >> cadrage.md` | matériel dispo en cuisine ce soir-là / matériel dispo au refuge avant l'ascension | « matériel dispo en cuisine ce soir-là » raconte le cas nominal ; sur Contrainte, l'utilisateur qui parle n'est pas l'utilisateur moyen, et l'écart n'est jamais mesuré. Remonte de la solution demandée au problème réel avant de coder. |
| Signal faible | Indice observable qu'un besoin existe déjà et se débrouille sans solution officielle (tableur fantôme, contournement manuel, ticket récurrent). | `grep -ril "tableur\|fichier partagé" tickets/*.md` | une trace de pas dans la boue avant de voir l'animal / un bruit de moteur inhabituel avant la panne | « une trace de pas dans la boue avant de voir l'animal » s'arrête à la première surprise ; sur Signal faible, une demande formulée en solution cache le problème qu'elle prétend résoudre. Remonte de la solution demandée au problème réel avant de coder. |
| Job to be done | Ce que l'utilisateur essaie d'accomplir. Format : "Quand [situation], je veux [action], pour pouvoir [bénéfice réel]". | `printf "jtbd: Quand %s, je veux %s, pour %s\n" "urgence nuit" "trouver un vétérinaire dispo" "sauver l'animal"` | commande formulée par le besoin du client, pas par le nom du plat / itinéraire pensé par le sommet visé, pas par le sentier habituel | « commande formulée par le besoin du client, pas par le nom du plat » tient tant que rien ne tombe en route ; sur Job to be done, l'utilisateur qui parle n'est pas l'utilisateur moyen, et l'écart n'est jamais mesuré. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Persona utile vs décoratif | Utile : influence directement une décision de conception vérifiable. Décoratif : illustre un document sans jamais changer une décision. | `grep -c "persona" decisions/*.md` | fiche de poste réellement suivie en régie / fiche patient réellement consultée aux urgences | « fiche de poste réellement suivie en régie » décrit un monde où chaque étape se voit ; sur Persona utile vs décoratif, un chiffre d'usage sans date ni source ne permet aucune décision reproductible. Note ce que tu refuses, pas seulement ce que tu retiens. |
| Non-objectif | Décision explicite de ne jamais faire quelque chose, avec sa raison, écrite avant que la pression n'arrive. | `printf "non_objectifs:\n- pas de paiement en ligne v1: risque conformité\n" >> cadrage.md` | plat volontairement retiré de la carte / voie volontairement écartée du plan de cordée | « plat volontairement retiré de la carte » n'a ni facture ni horloge ; sur Non-objectif, l'arbitrage se joue sur ce qu'on refuse, jamais sur ce qu'on ajoute. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Métrique de vanité vs métrique de succès produit | Vanité : peut monter sans que le problème réel soit résolu. Succès produit : reliée directement au symptôme initial. | `printf "metrique_succes: temps_moyen_reponse_urgence < 5min\n"` | nombre de couverts servis vs clients réellement satisfaits / nombre de spectateurs vs qualité perçue du son en régie | « nombre de couverts servis vs clients réellement satisfaits » tient tant que rien ne tombe en route ; sur Métrique de vanité vs métrique de succès produit, un indicateur qui monte peut cacher une baisse de la valeur réellement délivrée. Remonte de la solution demandée au problème réel avant de coder. |
| Seuil d'échec | Chiffre fixé avant le lancement, en dessous duquel l'équipe reconnaît un échec et décide. | `printf "seuil_echec: adoption < 20%% au 2026-10-01 => pivot\n" >> cadrage.md` | seuil de demi-tour fixé avant le départ en montagne / seuil de rupture de stock avant le coup de feu | « seuil de demi-tour fixé avant le départ en montagne » tient tant que rien ne tombe en route ; sur Seuil d'échec, un chiffre d'usage sans date ni source ne permet aucune décision reproductible. Écris le chiffre, sa date et sa source avant d'arbitrer. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Checklist avant de coder quoi que ce soit

- [ ] La demande initiale a été reformulée en besoin(s) réel(s), avec au moins deux
      interprétations envisagées et rejetées explicitement.
- [ ] Au moins un signal faible concret (pas hypothétique) appuie le besoin identifié.
- [ ] Les utilisateurs concernés sont décrits par leurs jobs to be done, pas par des
      personas décoratifs.
- [ ] Les non-objectifs sont écrits, chacun avec sa raison, et testés ("si on le supprime,
      une décision de conception change-t-elle ?").
- [ ] Une métrique de succès produit est définie, reliée au symptôme initial.
- [ ] Un seuil d'échec chiffré est fixé, avec une date d'évaluation.

## Questions à se poser en réunion de cadrage

- "Si cette fonctionnalité disparaissait, quel comportement observable des utilisateurs
  changerait ?"
- "Quel contournement les gens utilisent-ils aujourd'hui pour survivre sans cette solution ?"
- "Est-ce que cette métrique peut monter si le vrai problème n'est pas résolu ?"
- "Qu'est-ce qu'on refuse explicitement de faire, et pourquoi ?"
- "Dans six semaines, quel chiffre nous ferait dire honnêtement que ça n'a pas marché ?"

## Heuristique rapide : demande vs besoin

```text
Une demande commence souvent par une solution ("il nous faudrait une appli").
Un besoin réel se formule en termes de situation et de friction observable
("les secrétaires perdent cinq minutes par urgence à appeler les deux autres
cabinets pour savoir qui est disponible").

Règle pratique : si tu peux répondre à la demande sans savoir ce que la personne
fait concrètement aujourd'hui pour s'en sortir, tu n'as pas encore le besoin réel.
```

## Pièges à répéter à voix haute avant chaque cadrage

- Une demande formulée comme une solution cache presque toujours un besoin plus simple.
- Un persona qu'on ne recite jamais après le cadrage était décoratif.
- Un non-objectif qui ne referme aucune porte concrète n'a servi à rien.
- Une métrique facile à obtenir dès le premier jour est presque toujours une métrique de
  vanité.
- Un seuil d'échec écrit après avoir vu les résultats n'est plus un seuil, c'est une
  justification.

## Si tu rates le boss-fight

Relis en premier le critère "usage du cadrage comme outil, pas comme dogme" : c'est celui qui
plafonne la note. Rejoue la scène en écrivant d'abord, à la main, ce que le directeur a de
légitime dans sa demande avant d'écrire ta réponse. Relis ensuite la section "Pièges à répéter
à voix haute" ci-dessus. Attends 48 h avant de retenter le boss-fight : la réaction à chaud
ressemble toujours trop à la première version. Si le deuxième essai échoue sur le même critère,
redescends au niveau 01 relire "asymétrie des erreurs" : le blocage est souvent là, pas ici.

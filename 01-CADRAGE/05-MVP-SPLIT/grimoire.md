# Grimoire : Niveau 03, MVP Split

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Mémo à ouvrir quand il faut découper une feature sous pression de planning. Sert à trancher
où couper, pas à réviser la théorie du découpage.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Tranche verticale | Découpage qui traverse toute la stack et livre un scénario complet et utilisable, même réduit. | `printf "tranche1: creation_urgence_simple end-to-end\n" >> plan.md` | plat complet simplifié servi en entier / traversée courte mais complète en montagne | « plat complet simplifié servi en entier » suppose un seul acteur à la fois ; sur Tranche verticale, un indicateur qui monte peut cacher une baisse de la valeur réellement délivrée. Note ce que tu refuses, pas seulement ce que tu retiens. |
| Couche horizontale | Découpage qui prépare une partie de l'infrastructure mais ne livre rien d'utilisable seule. | `printf "couche: auth_generique (aucune valeur seule)\n"` | mise en place sans aucun plat servi / gréement monté sans navigation possible | « mise en place sans aucun plat servi » décrit un monde où chaque étape se voit ; sur Couche horizontale, l'utilisateur qui parle n'est pas l'utilisateur moyen, et l'écart n'est jamais mesuré. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Invariant d'une feature | La règle dont la violation rend la fonctionnalité dangereuse ou trompeuse. | `const invariant = (r) => r.veterinaireDisponible === true;` | règle de sécurité non négociable aux urgences / point d'ancrage qui ne doit jamais lâcher | « règle de sécurité non négociable aux urgences » se rejoue à l'identique, le code non ; sur Invariant d'une feature, le coût d'une fonctionnalité inclut sa maintenance, pas seulement sa construction. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Ligne de coupe | L'endroit précis où on réduit l'ampleur d'une feature sans toucher à son invariant. | `printf "coupe: 1 seul cabinet pilote, meme invariant\n"` | menu réduit mais sans plat mensonger / itinéraire raccourci sans sauter d'étape de sécurité | « menu réduit mais sans plat mensonger » se rejoue à l'identique, le code non ; sur Ligne de coupe, un chiffre d'usage sans date ni source ne permet aucune décision reproductible. Remonte de la solution demandée au problème réel avant de coder. |
| Feature flag | Interrupteur de configuration qui active ou désactive un comportement sans redéployer. | `printf "FEATURE_PAIEMENT_EN_LIGNE=false\n" >> .env` | interrupteur du technicien en régie pendant le show / vanne coupée sans arrêter le bateau | « interrupteur du technicien en régie pendant le show » a une frontière visible à l'oeil ; sur Feature flag, une demande formulée en solution cache le problème qu'elle prétend résoudre. Note ce que tu refuses, pas seulement ce que tu retiens. |
| Estimation honnête | Fourchette accompagnée de ses sources d'incertitude explicites. | `printf "estimation: 3-5j; incertitude: dispo_api_tiers\n"` | fourchette de temps de service annoncée en cuisine / marge de sécurité annoncée avant un sommet | « fourchette de temps de service annoncée en cuisine » se corrige toute seule quand elle dérape ; sur Estimation honnête, le retour sur investissement suppose une hypothèse de volume qui se démode en un trimestre. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Effet tunnel | Dérive où une équipe continue sur un plan optimiste sans signaler les écarts en cours de route. | `printf "point_controle: chaque vendredi, ecart vs plan\n" >> suivi.md` | absence de point météo en pleine mer / absence de debrief à mi-service | « absence de point météo en pleine mer » raconte le cas nominal ; sur Effet tunnel, l'utilisateur qui parle n'est pas l'utilisateur moyen, et l'écart n'est jamais mesuré. Remonte de la solution demandée au problème réel avant de coder. |
| Coût d'opportunité | Ce qu'on sacrifie ailleurs si on accepte une demande de périmètre supplémentaire. | `printf "oui_a: X; sacrifie: Y cette semaine\n"` | accepter une table de plus au prix d'un retard partout ailleurs / accepter un détour au prix du sommet du jour | « accepter une table de plus au prix d'un retard partout ailleurs » tient tant que rien ne tombe en route ; sur Coût d'opportunité, livrer plus vite déplace le coût vers l'exploitation, il ne disparaît pas. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Dette technique assumée | Raccourci pris consciemment, écrit quelque part, avec une échéance de remboursement. | `printf "dette: mock_paiement; rembourser_avant: v1.2\n" >> dette.yml` | pansement provisoire assumé aux urgences / réparation de fortune notée pour le retour au port | « pansement provisoire assumé aux urgences » se rejoue à l'identique, le code non ; sur Dette technique assumée, l'arbitrage se joue sur ce qu'on refuse, jamais sur ce qu'on ajoute. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Dette technique subie | Raccourci pris sous pression, jamais écrit, découvert plus tard comme un incident. | `git log --grep="quick fix" --oneline` | improvisation non tracée en régie qui refait surface en direct / corde mal notée qui lâche en pleine ascension | « improvisation non tracée en régie qui refait surface en direct » se rejoue à l'identique, le code non ; sur Dette technique subie, l'arbitrage se joue sur ce qu'on refuse, jamais sur ce qu'on ajoute. Écris le chiffre, sa date et sa source avant d'arbitrer. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Checklist avant de découper un MVP

- [ ] Le besoin réel et les non-objectifs du niveau 02 sont déjà écrits et validés.
- [ ] Chaque tranche envisagée livre un scénario complet et utilisable seule.
- [ ] L'invariant de chaque feature complexe est identifié avant de décider où couper.
- [ ] Chaque estimation est une fourchette avec au moins une source d'incertitude nommée.
- [ ] Des points de contrôle rapprochés sont prévus pour éviter l'effet tunnel.
- [ ] Une réponse de type "coût d'opportunité" est prête avant qu'une demande de périmètre
      supplémentaire n'arrive.

## Arbre de décision rapide : où couper ?

```text
Une feature semble trop grosse pour la première tranche.

  +-- Identifie l'invariant : que se passe-t-il si on le viole ?
  |       Dangereux / trompeur -> ne jamais couper cette partie
  |       Juste limité -> peut être réduit sans casser l'intention
  |
  +-- Cherche un axe de réduction qui ne touche pas l'invariant :
  |       nombre d'utilisateurs, volume, canal, fréquence,
  |       automatisation partielle avec validation manuelle
  |
  \-- Vérifie : la version coupée reste-t-elle honnête pour
          l'utilisateur qui en bénéficie déjà ?
          Non -> mauvaise coupe, recommencer
          Oui -> bonne coupe, prête à livrer
```

## Trois réponses à une demande de périmètre supplémentaire

```text
OUI            -> coût d'opportunité acceptable, arbitré consciemment
NON            -> viole un non-objectif déjà écrit, à rappeler explicitement
PAS MAINTENANT -> bonne idée, mauvais moment, avec condition de réexamen
                  écrite (sinon c'est un non déguisé)
```

## Phrases à répéter avant chaque estimation

- "Une fourchette avec ses raisons vaut mieux qu'un chiffre qui rassure sur le moment."
- "Découper avant d'estimer, jamais l'inverse."
- "Un écart signalé tôt et petit vaut mieux qu'un écart découvert tard et grand."
- "Chaque dette technique doit être écrite, sinon elle n'existe pas : jusqu'au jour où elle
  explose."

## Si tu rates le boss-fight

Relis d'abord le critère "identification de l'invariant" : c'est lui qui plafonne la note.
Reprends la scène en listant séparément, avant de répondre, ce qui touche l'invariant et ce
qui est un cas limite gérable. Relis ensuite l'arbre de décision ci-dessus. Attends 48 h avant
de retenter le boss-fight pour juger la scène à froid. Si l'échec se reproduit sur le même
critère, redescends au niveau 02 relire "non-objectif" : couper au bon endroit suppose déjà
de savoir ce qu'on a refusé de faire.

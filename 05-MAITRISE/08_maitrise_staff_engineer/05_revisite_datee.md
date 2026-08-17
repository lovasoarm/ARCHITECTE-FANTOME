---
stability: intemporel
acte: produire
---

# 06 : LA REVISITE DATEE, OU LA DECISION JUGEE PAR LA DUREE

Acte attendu : produire.

Temps de travail ~2 h, six mois après le dossier unique.

Le parcours t'a entraîné à l'instant de la décision : le dossier en huit sections, le refus
chiffré, le postmortem signé. Faire vivre un système, c'est autre chose : c'est revenir plus
tard avec des chiffres qui ont bougé et devoir dire pourquoi ta décision tient encore, ou
pourquoi elle ne tient plus. C'est la dernière marche entre un très bon candidat à un poste
de Staff Engineer et un Staff Engineer réel.

## Le déclencheur

Cet exercice ne se joue pas dans la foulée du dossier. Il se joue à une date, et cette date
s'inscrit dès aujourd'hui en fin de [01_dossier_unique.md](01_dossier_unique.md) :
`Revisite prévue le <date du jour + 6 mois>`. Sans date inscrite, l'exercice n'existe pas.

## Les trois relevés à refaire, dans cet ordre

| Relevé | Source de la méthode | Ce qui doit changer sur le papier |
| --- | --- | --- |
| Prix unitaires | [protocole de la donnée sourcée](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md) | nouvelle date de relevé, nouvelle URL, écart en pourcentage |
| Mesure de charge | [drill de mesure](../02_scalability/11_DRILL_MESURE_DE_CHARGE.md) | deux courbes rejouées, latence au 95e centile |
| Budget d'erreur | [SLO](../../03-PILOTAGE/06_fiabilite_slo/README.md) | consommé réel sur la période, pas l'objectif |

Un relevé recopié depuis l'ancien dossier est un échec de l'exercice, même si le chiffre n'a
pas bougé : ce qui est demandé, c'est la date de re-relevé, pas la valeur.

## Le livrable

Un second ADR, dans le même dossier ADR que le premier, qui **nomme explicitement** l'ADR
qu'il révise dès son titre, au format déjà utilisé par le dépôt :
`ADR-<n> : révision de ADR-<m>, <objet>`.

Son corps tient en quatre parties, dans cet ordre imposé :

1. **Ce qui a bougé.** Un tableau à trois colonnes : mesure, valeur au premier ADR (avec sa
   date), valeur au relevé du jour (avec sa date). Aucune prose ici, seulement des chiffres datés.
2. **Pourquoi ma décision tient, ou ne tient plus.** Une seule phrase de verdict, puis les
   chiffres du tableau qui la portent. Un verdict qui ne cite aucune ligne du tableau ne compte pas.
3. **Ce que je change.** Zéro, une ou deux actions, chacune avec sa date d'échéance. « Rien
   ne change » est une réponse valide **si** elle est portée par le tableau.
4. **Ce que j'ai eu tort de croire il y a six mois.** Une hypothèse du premier ADR, nommée,
   et ce que la mesure en a fait. Cette partie est obligatoire même quand la décision tient :
   une revisite qui ne trouve aucune erreur de jugement n'a pas cherché.

Le premier ADR n'est jamais modifié. Il gagne une seule ligne en fin de document :
`Révisé par ADR-<n> le <date>`.

## Verdict binaire

L'exercice est acquis si, et seulement si, les quatre conditions sont vraies :

- [ ] Le second ADR nomme le premier dans son titre, et le premier porte sa ligne de révision.
- [ ] Les trois relevés portent une date postérieure d'au moins six mois au premier dossier.
- [ ] Le verdict de la partie 2 cite au moins une ligne chiffrée du tableau de la partie 1.
- [ ] La partie 4 nomme une hypothèse précise du premier ADR, pas une généralité.

Une seule case vide : l'exercice est à refaire, pas à négocier.

## Où cela se range

Ligne à ajouter dans [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md) :
chemin du second ADR, date de la revisite, verdict « tient » ou « ne tient plus ». C'est
cette ligne, et pas le diplôme, qui prouve que tu assumes une décision dans la durée.

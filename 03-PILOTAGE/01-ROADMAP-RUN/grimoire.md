# Grimoire : Roadmap Run

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Ouvre ce mémo quand un sponsor te pousse vers une date avant que tu aies vérifié quoi que ce soit. Il te donne le réflexe, pas la théorie complète : pour ça, relis les leçons du niveau.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Jalon (milestone) | Point de vérification binaire, daté, rattaché à un artefact. Jamais un pourcentage. | `git tag -a jalon-demo-scenario-complet -m "2026-03-01: demo bout-en-bout avec donnees reelles"` | course en montagne / régie technique de spectacle | « course en montagne » s'arrête à la première surprise ; sur Jalon (milestone), l'arbitrage se joue sur ce qu'on refuse, jamais sur ce qu'on ajoute. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Tranche verticale | Découpage qui traverse toutes les couches pour un scénario réduit mais complet, plutôt que couche par couche. | `# scenario minimal complet, pas "toute la BDD" puis "tout le back"\ncurl -X POST /api/tournees -d '{"livreur":1,"colis":["A1"]}'` | atelier de menuiserie / cuisine de restaurant en service | « atelier de menuiserie » n'a ni facture ni horloge ; sur Tranche verticale, livrer plus vite déplace le coût vers l'exploitation, il ne disparaît pas. Note ce que tu refuses, pas seulement ce que tu retiens. |
| Risque le plus cher | Hypothèse à la fois incertaine et coûteuse à corriger si elle est fausse. | `SELECT nom, incertitude, cout_si_faux, incertitude*cout_si_faux AS score FROM hypotheses ORDER BY score DESC LIMIT 1;` | navigation maritime / urgences d'hôpital | « navigation maritime » tient tant que rien ne tombe en route ; sur Risque le plus cher, le retour sur investissement suppose une hypothèse de volume qui se démode en un trimestre. Vérifie l'hypothèse de volume dans trois mois, calendrier en main. |
| Dérive silencieuse | Écart entre avancement réel et avancement déclaré qui grossit sans être signalé. | `diff <(cat rapport-semaine-N.txt) <(cat rapport-semaine-N-1.txt)` | course en montagne / régie technique de spectacle | « course en montagne » suppose que quelqu'un surveille ; sur Dérive silencieuse, l'utilisateur qui parle n'est pas l'utilisateur moyen, et l'écart n'est jamais mesuré. Remonte de la solution demandée au problème réel avant de coder. |
| Matrice de risque | Classement des hypothèses par incertitude x coût, pour décider quoi vérifier en premier. | `INSERT INTO risques (hypothese, incertitude, cout_si_faux) VALUES ('tantiemes totalisent 10000', 'elevee', 'eleve');` | atelier de menuiserie / navigation maritime | « atelier de menuiserie » se rejoue à l'identique, le code non ; sur Matrice de risque, le coût d'une fonctionnalité inclut sa maintenance, pas seulement sa construction. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Signal : pourcentage répété | Le même chiffre d'avancement annoncé deux fois de suite signale un blocage caché. | `grep -c "80%" rapport-semaine-*.txt` | urgences d'hôpital / course en montagne | « urgences d'hôpital » se rejoue à l'identique, le code non ; sur Signal : pourcentage répété, un chiffre d'usage sans date ni source ne permet aucune décision reproductible. Écris le chiffre, sa date et sa source avant d'arbitrer. |
| Signal : questions plus vagues | Des questions qui perdent en précision au fil des points d'équipe indiquent un blocage. | `git log --since="2 weeks ago" --grep="question" --oneline \| wc -l` | une voix qui baisse quand on n'est plus sûr / un brouillard qui monte sur un sentier connu | « une voix qui baisse quand on n'est plus sûr » a une frontière visible à l'oeil ; sur Signal : questions plus vagues, une demande formulée en solution cache le problème qu'elle prétend résoudre. Remonte de la solution demandée au problème réel avant de coder. |
| Formule de la démo | Ne jamais demander "où en es-tu", toujours demander une démonstration avec des données réelles. | `curl -s https://staging.exemple.fr/api/factures/dernieres \| jq '.[0]'` | un essai routier plutôt qu'une fiche technique / goûter le plat plutôt que lire la recette | « un essai routier plutôt qu'une fiche technique » raconte le cas nominal ; sur Formule de la démo, l'arbitrage se joue sur ce qu'on refuse, jamais sur ce qu'on ajoute. Note ce que tu refuses, pas seulement ce que tu retiens. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## La règle en une phrase

Un plan ne vaut rien tant qu'il n'attaque pas d'abord ce qu'on ne sait pas encore et ce que
ça coûterait de se tromper dessus.

## Checklist avant de proposer une date

- [ ] J'ai listé au moins cinq hypothèses concrètes et vérifiables du projet, pas des
      intentions vagues.
- [ ] Pour chaque hypothèse, j'ai estimé incertitude (faible/élevée) et coût si fausse
      (faible/élevé).
- [ ] J'ai identifié le risque le plus cher : incertitude élevée + coût élevé si faux.
- [ ] J'ai une méthode concrète pour tester ce risque en moins d'une à deux journées.
- [ ] Mon découpage en phases est vertical (chaque phase traverse toutes les couches) et pas
      par couche technique.
- [ ] Chaque jalon de mon plan est binaire, vérifiable par un tiers, daté, rattaché à un
      artefact concret.
- [ ] Aucun jalon n'est formulé en pourcentage.

## Matrice de risque (à recopier pour chaque hypothèse)

```text
              coût faible si fausse    coût élevé si fausse
incertitude   à faire sans stress      à vérifier vite
faible

incertitude   à explorer, coût         RISQUE LE PLUS CHER
élevée        limité si faux           --> phase 1, avant tout le reste
```

## Trois signaux de dérive à surveiller chaque semaine

1. Le même pourcentage d'avancement se répète deux fois de suite --> creuser immédiatement.
2. Les questions posées deviennent plus vagues au lieu de plus précises --> signal de blocage.
3. Le périmètre d'une tâche grossit sans que sa date bouge --> risque absorbé en silence.

## Phrase à ressortir en réunion de planning

"Avant de donner une date, je veux d'abord savoir ce qu'on ne sait pas : et vérifier la
partie qui coûterait le plus cher si on se trompait."

## Si tu rates le boss-fight

Relis `01-why-this-level.md` et la leçon sur la matrice de risque avant de retenter. Refais
l'exercice en écrivant d'abord tes cinq hypothèses réelles, chiffrées incertitude x coût,
avant de rédiger une seule ligne de réponse au sponsor. Donne-toi 48 heures, pas plus : au-delà,
la scène perd sa tension et tu répètes une réponse apprise par coeur plutôt que raisonnée. Si à
la deuxième tentative tu retombes sous 50/100, remonte au niveau amont sur la priorisation par
coût et vérifie que tu sais vraiment distinguer incertitude et coût avant de revenir ici.

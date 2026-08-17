# Grimoire : Capstone Arena

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Ouvre ce mémo juste avant de livrer ton capstone, ou quand un pivot de dernière minute tombe.
Il rappelle l'ordre de production et les réflexes, pas le cours complet du niveau.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Note de cadrage | Hypothèses explicites et périmètre justifié, écrits avant toute ligne de code. | `echo "Hypothese: toutes les salles partagent le meme fuseau horaire" >> cadrage.md` | course en montagne / navigation maritime | un plan de tournage se corrige entre deux prises ; une note de cadrage vaut par sa date : elle enregistre les hypothèses avant de savoir, et c'est cet écart entre l'hypothèse et le réel qui se corrige à la revue, pas la note elle-même. |
| Architecture assumée | Schéma avec compromis nommés, pas une liste de technologies choisies par habitude. | `# schema.md : composants + fleches de dependance, chaque fleche justifiee` | atelier de menuiserie / régie technique de spectacle | un plan d'architecte montre ce qui sera construit ; une architecture assumée montre surtout ce qui a été refusé et à quel prix : un schéma sans compromis nommé n'est pas une décision, c'est un inventaire. |
| Preuve automatisée sur point sensible | Test qui prouve la résistance sur le cas signalé comme critique dans le brief, pas une vérification manuelle. | `npx artillery run charge-reservation.yml` | urgences d'hôpital / navigation maritime | un contrôle technique valide un véhicule à un instant donné ; une preuve automatisée ne vaut que rejouée à chaque livraison, sur le cas critique nommé dans le brief : une vérification manuelle réussie une fois ne prouve rien du mois suivant. |
| Roadmap post-V1 | Liste ordonnée de ce qui reste à faire, avec justification de l'ordre choisi. | `echo "1. multi-fuseau 2. notifications 3. export comptable" >> roadmap.md` | course en montagne / cuisine de restaurant en service | une liste de courses s'exécute dans n'importe quel ordre ; une roadmap post-V1 justifie son ordre par le risque et la dépendance : sans cette justification, la suite se réordonne au premier avis extérieur. |
| Auto-évaluation chiffrée | Notation honnête de sa propre copie contre la grille, avant la correction externe. | `echo "diagnostic:28/30 proposition:20/25 communication:22/25" >> auto-eval.txt` | urgences d'hôpital / atelier de menuiserie | s'auto-noter à l'école tend à flatter ; une auto-évaluation chiffrée n'a de valeur que confrontée à une correction externe : l'information utile est l'écart entre les deux notes, pas la note que tu te donnes. |
| Fonctionnalité non négociable | Exigence cachée dans un brief flou, révélée par un incident passé ou une obligation externe. | `rg -in "audit" docs/ && rg -in "reglement" docs/` | allergène signalé en salle qu'aucun plat ne peut ignorer / obligation de matériel qu'aucune cordée ne peut sauter | une consigne écrite en gras se voit ; une exigence non négociable est le plus souvent implicite, héritée d'un incident passé ou d'une obligation légale : elle se découvre en interrogeant l'historique, pas en relisant le brief. |
| Test qui prouve vs test qui rassure | Une vérification manuelle rassure une fois ; un test automatisé de concurrence prouve la résistance réelle. | `npx artillery run --config concurrency-reservation.yml` | urgences d'hôpital / course en montagne | vérifier une fois qu'une porte ferme rassure ; seul un test rejoué automatiquement, en concurrence et sur données réelles, prouve quelque chose : la différence n'est pas le sérieux du testeur, c'est la répétabilité. |
| Diagnostic de pivot | Distinguer ce qui casse réellement de ce qui semble casser dans un changement de dernière minute. | `rg -n "timezone" --type ts` | plat renvoyé pour la sauce alors que c'est la cuisson qui a raté / demi-tour décidé sur la météo alors que c'est l'horaire qui a glissé | un changement de dernière minute semble tout casser ; le diagnostic de pivot consiste à séparer ce qui casse vraiment (contrat, donnée, invariant) de ce qui semble casser (habitude, confort) : sans ce tri, on réécrit ce qui tenait déjà. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Ordre de production, jamais dans le désordre

```text
1. Note de cadrage (hypothèses explicites + périmètre justifié)
2. Architecture (schéma + compromis assumés)
3. Version 1 fonctionnelle (avec preuve automatisée sur le point sensible)
4. Roadmap post-V1
5. Auto-évaluation chiffrée
```

## Détecter la fonctionnalité non négociable dans un brief flou

```text
Cherche les phrases qui mentionnent :
- un incident déjà vécu ("on a eu un souci l'an dernier avec...")
- une obligation externe (contrôle, audit, réglementation, contrat)
- une conséquence concrète en cas d'échec (sécurité, argent, réputation)
Ces phrases signalent la contrainte non négociable, même noyée dans un message informel.
```

## Le test qui prouve, pas qui rassure

```text
Une vérification manuelle prouve que ça marche une fois, dans les conditions où tu as testé.
Un test automatisé de concurrence prouve que ça résiste dans le cas qui casse vraiment.
Sur un point signalé comme sensible dans le brief, seule la deuxième preuve compte.
```

## Grille chiffrée : rappel des seuils

```text
< 60   non validé
60-74  validé avec réserve
75-89  validé
90-100 excellence
```

## Réflexe face à un pivot de dernière minute

```text
1. Diagnostiquer précisément ce qui casse (pas une impression globale de catastrophe).
2. Séparer panique et impact réel.
3. Proposer une option concrète (ajuster / reporter / renégocier), jamais un simple constat.
4. Communiquer au client en langage client, sans minimiser ni dramatiser.
```

## Si tu rates le boss-fight

Relis ta note de cadrage et la section sur les hypothèses implicites avant de retenter.
Refais l'exercice en localisant d'abord dans le code, avec une recherche exécutée, tous les
endroits où l'hypothèse cassée est enterrée, avant de rédiger ta réponse au client. Donne-toi
48 heures. Si le score reste sous 70/100, remonte au niveau amont sur les compromis nommés et
assumés avant de revenir affronter ce pivot.

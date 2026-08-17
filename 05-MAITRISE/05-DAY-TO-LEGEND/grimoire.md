# Grimoire : Day-to-Legend

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Ouvre ce mémo quand tu doutes de ta progression, ou juste avant de préparer un dossier de
promotion. Il rappelle les leviers d'entraînement, pas le cours complet sur la progression.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Pratique délibérée | Entraînement ciblé, juste au-delà de la zone de confort, avec feedback rapide et spécifique. | `echo "kata du jour: justifier une decision reelle en 4 lignes" >> kata.md` | course en montagne / atelier de menuiserie | « course en montagne » n'a ni facture ni horloge ; sur Pratique délibérée, déléguer sans transmettre le critère de décision produit une exécution conforme et un résultat faux. Formule le retour sur le mécanisme, pas sur la personne. |
| Boucle de feedback fermée | Correction basée uniquement sur son propre jugement, qui plafonne vite la progression. | `git log --author="moi" --grep="revu par" --oneline \| wc -l` | s'entraîner sans miroir ni chrono / réviser en ne relisant que ses propres notes | « s'entraîner sans miroir ni chrono » raconte le cas nominal ; sur Boucle de feedback fermée, un retour de revue formulé comme un jugement ferme le dialogue et supprime l'information. Transmets le critère de décision, pas seulement la tâche. |
| Zone d'apprentissage efficace | Difficulté juste au-delà du confortable, ni trop facile ni trop dure. | `echo "difficulte ressentie: 6/10" >> kata.md # vise 6-7, pas 2 ni 10` | course en montagne / navigation maritime | « course en montagne » raconte le cas nominal ; sur Zone d'apprentissage efficace, la montée en compétence se mesure en autonomie sur un cas neuf, pas en tâches terminées. Vérifie l'autonomie sur un cas jamais vu, pas sur une répétition. |
| Plateau de progression | Stagnation malgré un travail continu, causée par zone de confort, boucle fermée ou mauvais calibrage. | `diff <(cat competences-2025.md) <(cat competences-2026.md)` | atelier de menuiserie / urgences d'hôpital | « atelier de menuiserie » a une frontière visible à l'oeil ; sur Plateau de progression, l'exemplarité porte tant que la personne est présente, la trace écrite lui survit. Écris le standard et le contrôle qui le rend opposable. |
| Portfolio de preuves | Artefacts vérifiables (ADR, post-mortem, code documenté) attestant une compétence réelle. | `git log --author="moi" --grep="ADR" --oneline` | régie technique de spectacle / navigation maritime | « régie technique de spectacle » suppose un seul acteur à la fois ; sur Portfolio de preuves, le mentorat sans cas réel produit du savoir déclaratif, pas de la compétence. Vérifie l'autonomie sur un cas jamais vu, pas sur une répétition. |
| Kata de décision | Exercice court et régulier : contexte, décision, justification, compromis, ce qui ferait changer d'avis. | `echo "contexte / decision / justification / compromis / contre-preuve" >> kata-$(date +%F).md` | course en montagne / cuisine de restaurant en service | « course en montagne » raconte le cas nominal ; sur Kata de décision, déléguer sans transmettre le critère de décision produit une exécution conforme et un résultat faux. Transmets le critère de décision, pas seulement la tâche. |
| Journal de décision | Notation quotidienne courte de la décision du jour et de ce qu'on referait autrement. | `echo "$(date +%F): decision=X, hesitation=Y, autrement=Z" >> journal.md` | urgences d'hôpital / atelier de menuiserie | « urgences d'hôpital » s'arrête à la première surprise ; sur Journal de décision, déléguer sans transmettre le critère de décision produit une exécution conforme et un résultat faux. Transmets le critère de décision, pas seulement la tâche. |
| Checklist annuelle de vérité | Quatre questions posées une fois par an ; trois ou quatre "non" signalent un plateau à traiter. | `grep -c "non" checklist-annuelle-2026.md` | navigation maritime / course en montagne | « navigation maritime » suppose un seul acteur à la fois ; sur Checklist annuelle de vérité, l'influence sans autorité repose sur des preuves reproductibles, pas sur l'ancienneté. Écris le standard et le contrôle qui le rend opposable. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## Routine minimale (résumé)

```text
Lecture de code    10-15 min/jour   --> une phrase de synthese : "ce qu'eux ont choisi et pourquoi"
Kata de decision   10-15 min, 3-4x/sem --> contexte + decision + justification + compromis + ce qui te ferait changer d'avis
Journal            5 min/jour       --> decision du jour / hesitation / ce que je referais autrement
```

## Checklist annuelle de vérité (à se poser une fois par an)

- [ ] Ai-je pris une décision technique risquée cette année, avec un vrai enjeu derrière ?
- [ ] Existe-t-il quelqu'un dont j'apprends encore régulièrement dans mon contexte actuel ?
- [ ] Puis-je citer une compétence nouvelle acquise, au-delà de la familiarité avec l'existant ?
- [ ] Mon portfolio de preuves a-t-il grandi cette année ?

3-4 "non" --> plateau à traiter maintenant, pas dans un an.

## Les trois causes d'un plateau, et l'action associée

```text
Zone de confort deguisee   --> augmenter legerement la contrainte du kata (chiffrer, justifier)
Absence de reference       --> trouver une revue humaine ou une comparaison a un cas documente
Mauvais niveau de difficulte --> recalibrer, viser l'inconfort gerable, pas l'inconnu total
```

## Heuristique de secours

Quand tu doutes de ta progression : "qu'est-ce que j'ai fait cette semaine qui m'aurait
gêné il y a six mois, et est-ce que ça me gêne encore aujourd'hui ?" Si la réponse est
"je n'ai rien fait de tel", c'est le signal, pas l'introspection vague.

## Si tu rates le boss-fight

Relis la section sur le portfolio de preuves et sur les trois causes de plateau avant de
retenter. Refais l'exercice en listant d'abord, par écrit, cinq traces vérifiables de ton
historique réel (commits, tickets, incidents) avant de composer ton plan. Donne-toi
48 heures. Si le score reste sous 50/100, ou si l'honnêteté sur les limites reste sous
12/30, remonte au niveau amont sur les compromis nommés et assumés avant de revenir ici.

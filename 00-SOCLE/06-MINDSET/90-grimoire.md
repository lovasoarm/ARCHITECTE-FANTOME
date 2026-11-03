---
stability: intemporel
acte: restituer
---

# Grimoire : Module 00-SOCLE/06-MINDSET, Mindset

Ce grimoire est une fiche de rappel pour le challenge Mindset. Il ne remplace pas les leçons et ne demande pas de vocabulaire professionnel préalable. Le challenge utilise le cas fictif Kintana ; il ne demande aucun système réel.

## 1. Les mots à comprendre

| Notion                       | Explication simple                                                                                                   | Question à te poser                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Fait du scénario**         | Information explicitement donnée dans le cas.                                                                        | Où est-ce écrit dans le scénario ?                                          |
| **Hypothèse**                | Idée plausible qui peut être fausse et qui doit être vérifiée.                                                       | Quelle observation pourrait la contredire ?                                 |
| **Jugement**                 | Préférence ou conclusion que tu tires des faits et hypothèses.                                                       | Pourquoi cette option me paraît-elle meilleure ?                            |
| **Coût d'une décision**      | Temps, effort, argent ou difficulté qu'un choix peut provoquer.                                                      | Qui supporte ce coût ?                                                      |
| **Réversibilité**            | Facilité avec laquelle on peut revenir sur un choix.                                                                 | Que faudrait-il changer pour revenir en arrière ?                           |
| **Asymétrie des erreurs**    | Se tromper dans un sens peut coûter plus cher que se tromper dans l'autre.                                           | Quel est le pire résultat de chaque erreur ?                                |
| **Expérience à faible coût** | Petite vérification qui réduit une incertitude avant de construire la solution complète.                             | Quelle est la plus petite vérification utile ?                              |
| **Dette volontaire**         | Raccourci accepté consciemment, avec une raison et un signal de réexamen.                                            | Quel signal nous fera revenir sur ce raccourci ?                            |
| **Dette subie**              | Raccourci dont personne n'a évalué ou suivi les conséquences.                                                        | Qu'est-ce qui a été laissé de côté sans décision claire ?                   |
| **Valeur d'option**          | Coût accepté maintenant pour garder la possibilité de choisir autrement plus tard.                                   | Quel événement justifierait de garder cette possibilité ?                   |
| **Note de conception**       | Document court qui décrit le problème, les contraintes et les critères avant de proposer une solution.               | Quel problème doit-on résoudre, et comment saura-t-on que la réponse aide ? |
| **ADR**                      | _Architecture Decision Record_ : fiche qui garde le contexte, les options, la décision proposée et ses conséquences. | Un lecteur peut-il comprendre pourquoi cette option a été retenue ?         |

## 2. Appliquer ces notions au cas Kintana

Le scénario indique que deux personnes peuvent demander la dernière place disponible et qu'une réponse réseau peut tarder. Il n'indique pas combien de demandes arrivent réellement, quel est le taux de doublons, ni combien de temps les utilisateurs accepteraient d'attendre.

Garde donc ces catégories séparées :

- **FAIT DU SCÉNARIO** : une dernière place ; deux demandes possibles ; réponse réseau retardée ; besoin d'éviter une double réservation.
- **HYPOTHÈSE** : un seuil que tu proposes pour guider une future vérification. Il n'est pas mesuré.
- **JUGEMENT** : l'option que tu préfères, compte tenu des faits et hypothèses.
- **NON MESURÉ** : tout résultat qui demanderait de vrais utilisateurs ou un service réellement exécuté.

Tu peux comparer le traitement manuel, la vérification centrale avant confirmation et la liste d'attente. Aucune option n'est parfaite : chacune répartit différemment le délai, le risque d'erreur et la charge de l'équipe.

## 3. Faire une décision révisable

Une décision défendable n'est pas une décision éternelle. Elle doit nommer :

1. l'option proposée ;
2. le bénéfice attendu ;
3. le coût ou l'inconvénient accepté ;
4. l'information encore inconnue ;
5. le signal observable qui ferait réexaminer le choix.

N'invente pas de mesure. Tu peux écrire, par exemple : `HYPOTHÈSE  : si plus de 5 demandes sur 100 restent ambiguës dans le scénario de test, réexaminer le parcours`. Ce nombre est un seuil proposé pour une simulation, pas une statistique sur Kintana ni une donnée terrain.

## 4. Structure minimale des deux livrables

**Note de conception**

- Problème et personnes concernées
- Faits connus et contraintes
- Non-objectifs
- Hypothèses à vérifier
- Critères futurs de réussite, non mesurés

**ADR de simulation**

- Statut : `PROPOSITION  : SIMULATION`
- Contexte
- Options, avec bénéfice et coût
- Décision proposée
- Justification : faits, hypothèses et jugements séparés
- Conséquences et condition de révision

Le format est volontairement court. Il n'est pas nécessaire de connaître un outil ADR, une base de données, une API ou un langage de programmation pour faire ce travail.

## 5. Questions de vérification

1. Quelle information vient directement du scénario ?
2. Quelle phrase est seulement une hypothèse ?
3. Quel est l'inconvénient réel de l'option que tu préfères ?
4. Quelle autre option pourrait être raisonnable dans un contexte différent ?
5. Quelle observation te ferait changer d'avis ?
6. As-tu présenté une simulation comme si elle avait été testée auprès de vraies personnes ? Si oui, corrige la formulation.

## 6. Approfondissement facultatif

Après le challenge, tu peux réaliser le [Boss Fight Mindset](96-boss-fight.md). Il reprend le même scénario Kintana et entraîne la réponse à une objection. Il est facultatif et ne bloque pas la sortie du module.

Pour un format ADR plus détaillé, consulte le [gabarit d'ADR](../../03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md) plus tard, lorsque le parcours introduira les documents d'équipe et les décisions d'architecture avancées.

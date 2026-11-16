---
stability: intemporel
acte: pratiquer
assessment_role: instructional_checkpoint
---

# Atelier de consolidation : 08-MAITRISE-STAFF-ENGINEER

> **Statut : complément de remédiation, pas certification.** Le corrigé associé contient deux exemples travaillés ; ne l’ouvre qu’après ta tentative. Leçon source : [03-trois_tensions.md](03-trois_tensions.md). Vérifier les faits techniques dans cette leçon ; ne pas considérer ces consignes comme un corrigé de la notion.

## Explication approfondie : preuves, arbitrage et révision

Pour **trois tensions**, confronte trois décisions qui relient des familles différentes :
S1 × S3 (coût et fiabilité), S4 × S2 (autonomie et complexité d'architecture),
S5 × S6 (automatisation et responsabilité opérationnelle). Une tension recevable
présente deux faits sourcés qui ne peuvent pas être optimisés simultanément dans le
contexte choisi. Elle nomme le coût accepté, le propriétaire du risque et le seuil de
réexamen. Il s'agit d'un exercice de décision, pas d'un test d'une fonction logicielle.

## Deux situations à traiter avant de consulter le corrigé

**Exemple A : S1 × S3 :** confronte un budget documenté à un objectif de reprise ou
de disponibilité. Présente la source de chaque nombre, l'hypothèse, l'arbitrage, le
risque accepté et le seuil de révision. Si les chiffres sont fictifs, étiquette-les
explicitement `SIMULATION`.

**Exemple B : S4 × S2 et S5 × S6 :** compare une application modulaire et six
microservices sur le coût d'exploitation, la charge mesurée et les besoins d'équipe.
Puis examine une automatisation qui clôture 80 % des demandes : définis le droit de
contestation, le délai de revue humaine et la trace permettant de retrouver la décision.

## Pratique graduée

**Guidé (niveau 1, 15 minutes).** Choisis une tension dans la leçon source. Recueille
les deux faits, identifie leur source et écris le compromis ainsi que la perte assumée.

**Semi-guidé (niveau 2, 20 minutes).** Reprends la décision avec une contrainte
nouvelle (budget, disponibilité, équipe, sécurité ou délai). Indique quel fait change
et comment l'arbitrage évolue.

**Indépendant (niveau 3, 30 minutes).** Construis un scénario inédit. Sépare faits,
hypothèses et inconnues ; expose deux options crédibles ; indique une condition qui
invaliderait ta décision et un responsable de réexamen.

## Vérification de cohérence et contre-épreuve

1. Vérifie que les deux faits opposés proviennent de sources identifiables ou sont
   explicitement marqués comme hypothèses de simulation.
2. Cherche une donnée qui pourrait réfuter chacun des deux faits ou montrer qu'ils
   ne sont pas comparables (période, population, unité ou périmètre différents).
3. Présente le meilleur argument en faveur de l'option rejetée.
4. Indique la condition observable qui te ferait changer de décision.

Aucune exception, assertion ou commande n'est exigée : la compétence évaluée est
l'arbitrage de preuves et la révision raisonnée d'une décision.

## Transfert

Dans un mini-projet, relie une tension à une décision réelle : critères d'acceptation,
coût des alternatives, propriétaire du risque, seuil de réexamen et mécanisme de
retour arrière. Pour une compétence non codée, un ADR argumenté et une matrice de
preuves sont des livrables valides ; n'invente pas une fonction à tester.

## Remise, feedback et déverrouillage

Produire `preuve.md` (faits et sources, hypothèses, statut de chaque axe, options, arbitrage, coût accepté, contre-épreuve, seuil de réexamen et transfert). Réussite : les axes sont examinés honnêtement, les mesures déclarées comparables, les inconnues visibles et une condition crédible de révision. Feedback : corriger d’abord une précondition ou une comparaison invalide ; si aucun conflit n’est démontré, ne pas en inventer un et justifier le statut retenu. **Corrigé distinct** : `corriges/ATELIER-CONSOLIDATION-CORRIGE.md` dans ce module, à consulter uniquement après remise.

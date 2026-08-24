---
stability: intemporel
acte: pratiquer
cognitive_level: L9
perturbation_modes: [solution_concurrente, transmission]
anti_recipe_key: solution_concurrente+transmission
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# 05 : Le plan de mentorat : objectifs, jalons datés, bilan

Temps de lecture ~9 min

> **Principe universel** : la revue ponctuelle améliore **un** code. Le mentorat améliore
> **quelqu'un**. La différence tient en une phrase : à la fin d'un mentorat, on peut nommer ce
> que l'autre sait faire seul et qu'il ne savait pas faire avant.

Ce module t'a appris à relire à trois niveaux
([02-revue_de_code_trois_niveaux.md](02-revue_de_code_trois_niveaux.md)), à expliquer à trois
publics ([03-expliquer_trois_publics.md](03-expliquer_trois_publics.md)) et à dire « je ne sais
pas » ([04-aveu_ignorance.md](04-aveu_ignorance.md)). Tout cela est de la **collaboration**.
Le mentorat commence quand ces gestes sont mis au service d'une trajectoire, avec des dates.

## 1) Ce qu'un plan de mentorat contient, et rien de plus

```text
1. Le point de départ, observé   : ce que la personne produit aujourd'hui, avec un exemple daté.
2. L'objectif, formulé en actes  : « sait découper une PR en trois commits lisibles seul ».
3. Trois jalons datés            : chacun avec une preuve observable, pas une impression.
4. Le rythme                     : 30 min toutes les deux semaines, tenues, et le canal écrit.
5. Ce qui n'est PAS dans le plan : le reste. Un plan à sept objectifs n'est pas un plan.
6. Le bilan                      : à la date de fin, atteint / partiel / abandonné, et pourquoi.
```

La règle qui sépare un plan d'une déclaration d'intention : **chaque objectif se formule par
un acte observable**. « Progresser en tests » n'est pas un objectif ; « écrit un test qui
échoue avant de corriger un bug, sur trois bugs d'affilée, sans qu'on le lui demande » en est
un : on peut ouvrir l'historique et vérifier.

## 2) Le gabarit `PLAN-MENTORAT.md`

```markdown
# Plan de mentorat : <prénom ou pseudonyme> : <date de début> → <date de fin>

## Point de départ

Observé le <date>, sur <lien du travail> : <deux phrases factuelles, sans jugement de valeur>.

## Objectif unique

À <date de fin>, <personne> sait <acte observable> sans aide.

## Jalons

| #   | Date       | Ce qui doit être vrai | Preuve regardée   | Constat |
| --- | ---------- | --------------------- | ----------------- | ------- |
| 1   | 2026-03-15 | ...                   | lien PR / fichier |         |
| 2   | 2026-04-15 | ...                   |                   |         |
| 3   | 2026-05-15 | ...                   |                   |         |

## Ce que je fais, moi

<Trois actions concrètes : relire sous 24 h, faire une session de pair 1 h par jalon, etc.>

## Ce que je ne fais pas

<Écrire le code à sa place. Répondre avant qu'il ait cherché 20 min.>

## Bilan (rempli à la date de fin)

Atteint / partiel / abandonné. Ce qui a marché. Ce que je referais autrement.
Ce que la personne sait faire seule aujourd'hui et ne savait pas au départ.
```

## 3) Variante solo : parce que tu n'as peut-être personne à mentorer

La preuve S5 se produit **seule** (voir la note de bas de
[PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md)). Deux variantes valables :

- **Contributeur open source** : tu choisis un dépôt public actif, tu suis un contributeur
  débutant sur trois de ses PR, et tu écris tes revues à trois niveaux **publiquement**. Les
  jalons portent sur ce que tu observes dans ses PR successives ; les URL permanentes des
  commentaires sont les preuves. Personne n'a besoin de te répondre pour que le plan tienne :
  ce que tu montres, c'est ta conduite de mentorat, pas la reconnaissance du mentoré.
- **Journal de mentorat de toi-même** : tu prends un domaine que tu ne maîtrises pas, tu
  t'écris le plan à la troisième personne, et tu tiens les trois jalons datés avec preuves.
  Moins fort, accepté quand le premier n'est pas praticable : et déclaré comme tel dans le
  bilan, sans maquillage.

## 4) Le bilan est la partie qui compte

Un plan sans bilan est un plan qui n'a jamais eu lieu. Le bilan dit trois choses, dans cet
ordre : ce qui est acquis (avec la preuve), ce qui ne l'est pas (sans le noyer), et **ce que
toi tu as mal fait**. Un mentor qui n'écrit jamais la troisième ligne progresse moins vite que
son mentoré.

Écris aussi le cas de l'abandon. Un mentorat arrêté à mi-parcours parce que la personne a
changé d'équipe est un résultat honnête ; un mentorat qui s'éteint sans que personne ne le
dise est une promesse cassée en silence.

## Exercice (45 min)

1. Choisis ta cible : un vrai mentoré, un contributeur open source, ou la variante journal.
2. Écris `PLAN-MENTORAT.md` dans ton dépôt fil rouge, gabarit complet, **objectif unique**,
   trois dates réelles à trois semaines minimum d'intervalle.
3. Fais relire l'objectif par le [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md) :
   s'il peut demander « comment tu sauras que c'est atteint ? » sans que ta réponse tienne en
   une phrase vérifiable, l'objectif est encore trop mou.
4. Joue le jalon 1 pour de vrai et remplis sa ligne. Un plan dont aucune ligne n'est remplie
   ne compte pas, même s'il est joliment écrit.

## Livrable

`PLAN-MENTORAT.md` **de ton dépôt fil rouge**, avec au minimum le jalon 1 constaté et daté.
C'est la quatrième pièce de la famille S5 dans
[PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## (attention) Piège

Le plan qui liste ce que le mentoré doit lire. Un mentorat n'est pas une bibliographie : si
ton plan tient dans des liens, tu as fait une recommandation de lecture, et le jalon 3 ne sera
jamais vérifiable.

## Où l'analogie casse

L'entraîneur sportif : bon pour le rythme et les jalons, faux sur l'asymétrie. L'entraîneur ne
joue pas le match ; toi, tu travailles dans le même dépôt que ton mentoré, avec les mêmes
délais. Le conflit d'intérêts est réel : livrer vite pousse à faire à sa place. C'est ce que la
section « Ce que je ne fais pas » existe pour tenir.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

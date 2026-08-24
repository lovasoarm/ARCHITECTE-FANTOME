---
stability: intemporel
audience: apprenant
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 10-PLATEAU_JOURNAL_EXEMPLE.md : exemple rempli (anonymise)

Temps de lecture ~2 min

Cet exemple existe pour desamorcer la peur de la page blanche.
Copie/adapte, ne recopie pas mot pour mot. Ton journal, c'est le tien.

Rappel des seuils (voir `01-START_HERE.md`) :

- **2 jours sans progres** -> tu commences a surveiller ici.
- **7 jours sans progres** -> tu declenches `05-MAITRISE/06-ANNEXES/16_career/04-plateau_playbook.md`.

---

## Format d'une entree

- **Date** : AAAA-MM-JJ
- **Module en cours** : ex. `01-CADRAGE/02-ASYNC/04_event_loop`
- **Ce qui bloque (une phrase)** : ce que je n'arrive pas a faire _aujourd'hui_.
- **Derniere chose comprise** : ce que je _sais_ deja, pour ne pas repartir de zero.
- **Prochaine micro-action (< 30 min)** : la plus petite marche possible.
- **Signal plateau** : combien de jours consecutifs sur ce meme point ? (compte).

---

## Exemple 1 : J+2 (surveillance)

- **Date** : 2026-03-08
- **Module** : `01-CADRAGE/02-ASYNC/04_event_loop`
- **Ce qui bloque** : je ne comprends pas pourquoi `setTimeout(fn, 0)`
  s'execute apres une `Promise.resolve().then(fn)`.
- **Derniere chose comprise** : la call stack se vide avant que la
  microtask queue soit lue ; ca je le sais.
- **Prochaine micro-action** : ecrire un `console.log` qui numerote
  l'ordre reel des sorties, PAS relire encore le grimoire.
- **Signal plateau** : jour 2 sur ce meme point. Je surveille.

## Exemple 2 : J+5 (encore surveillance)

- **Date** : 2026-03-11
- **Module** : idem.
- **Ce qui bloque** : j'ai fait le `console.log`, l'ordre est bien
  microtask -> macrotask, mais je ne sais pas _expliquer_ pourquoi a
  quelqu'un d'autre.
- **Derniere chose comprise** : j'ai la sortie correcte, je manque le mot.
- **Prochaine micro-action** : ecrire l'explication en 5 lignes dans
  `../../01-CADRAGE/02-ASYNC/97-EXO-VERIFICATION.md` comme si je parlais a un debutant.
- **Signal plateau** : jour 5. Encore 2 jours et je declenche le playbook.

## Exemple 3 : J+7 (declenchement)

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

- **Date** : 2026-03-13
- **Module** : idem.
- **Ce qui bloque** : je decris l'ordre, mais l'histoire n'a pas de sens
  pour un lecteur non technique.
- **Action** : j'ouvre `05-MAITRISE/06-ANNEXES/16_career/04-plateau_playbook.md` et
  je suis la procedure (changer d'angle : lire, dessiner, expliquer a voix
  haute, dormir dessus une nuit, revenir).

---

## Ce que tu retiens de cet exemple

1. Tu ecris **court**. Un plateau, ce n'est pas un roman.
2. Tu comptes **les jours consecutifs**. Pas la douleur, les jours.
3. Tu declenches le playbook a J+7. Pas a J+3 (trop tot), pas a J+21
   (trop tard).

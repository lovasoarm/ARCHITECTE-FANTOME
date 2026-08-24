---
stability: intemporel
last_reviewed: 2026-08
depends_on_vendor: false
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# PONT : des fondamentaux à la résolution de problème

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `00-SOCLE/04-FUNDAMENTALS` et `00-SOCLE/05-PROBLEM-SOLVING`, le module immédiatement suivant dans le fil. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Tu viens d'apprendre à déclarer des variables, écrire des fonctions, boucler. Le module `00-SOCLE/05-PROBLEM-SOLVING` ne t'apprendra aucune syntaxe nouvelle : il te demandera de **décrire un problème avant d'écrire une ligne**. Le saut est réel : passer de "je sais écrire une boucle" à "je sais dire ce que la boucle doit garantir" est le premier vrai changement de métier du parcours.

## CE QUE TU MAÎTRISES DÉJÀ

- Déclarer, affecter, comparer, boucler.
- Écrire une fonction qui prend des entrées et rend une sortie.
- Lire une erreur de syntaxe et la corriger.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **État** : ce que le programme sait à un instant donné.
- **Invariant** : ce qui doit rester vrai à tout moment.
- **Transition** : le passage autorisé d'un état à un autre.
- **Cas limite** : l'entrée que personne n'a prévue et qui décide de la qualité du code.

## DRILL DE VÉRIFICATION (3 questions)

1. Décris en trois états et deux transitions un formulaire qui envoie une requête.
2. Pour une fonction `moyenne(liste)`, quel invariant casse si la liste est vide ?
3. Reformule sans code : que doit garantir `trier(liste)` en plus de "renvoyer une liste triée" ?

Si tu ne peux pas répondre aux 3 sans hésiter : relis `00-SOCLE/04-FUNDAMENTALS/` avant d'ouvrir `00-SOCLE/05-PROBLEM-SOLVING/`.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise 80% des apprenants sur le module suivant. Aucune honte à revenir.

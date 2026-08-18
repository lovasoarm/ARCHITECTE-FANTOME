# Grimoire : Niveau 00, Prologue

Ce grimoire comporte deux tables : le mémo à 4 colonnes, puis la table de défense orale à
3 colonnes (écart de format assumé, voir [_STYLE.md](../.meta/_STYLE.md)).

Mémo de poche pour les 7 règles du joueur. Ouvre-le avant de prendre une décision sous
pression, pas pour réviser à froid : tu dois pouvoir le relire en deux minutes montre en main.

| Terme | Définition | Code | Analogies |
| --- | --- | --- | --- |
| Livrer | Produire un artefact réel plutôt qu'une conception théorique. Un plan jamais confronté au réel ne compte pas comme un livrable. | `git commit -m "feat: version imparfaite mais testable en vrai"` | passe de commande en cuisine / Naruto qui livre un vrai jutsu en plein combat plutôt que d'en discourir dans un dojo. Où l'analogie casse : un jutsu raté peut tuer, un artefact imparfait livré peut juste décevoir un utilisateur bêta. |
| Mesurer | Écrire le critère d'échec avant de commencer, jamais après avoir vu le résultat. | `echo "seuil_echec: taux_adoption < 0.2 au 2026-09-01" >> criteres.yml` | feuille de route du régisseur / l'examen chunin qui fixe la règle de réussite avant l'épreuve, jamais après. Où l'analogie casse : l'examen chunin a un jury externe, ton seuil d'échec n'a souvent que toi pour juger honnêtement. |
| Écrire | Coucher une décision sur papier au moment où elle est prise, pas de mémoire plus tard. | `printf "## %s\nDécision : %s\n" "$(date -I)" "on garde la colonne unique" >> DECISIONS.md` | fiche de poste en régie / le journal d'entraînement de Végéta qui note un objectif de puissance avant l'affrontement. Où l'analogie casse : Végéta ne le relit jamais, une décision écrite doit être relisible par quelqu'un d'autre que son auteur. |
| Défendre | Pouvoir justifier une décision à l'oral, en direct, sans notes ni relecture du code. | `git log -1 --format="%s%n%b" HEAD` | debrief après le service / Piccolo qui justifie sa stratégie au reste de l'équipe avant l'affrontement contre Cell. Où l'analogie casse : Piccolo convainc par autorité et charisme, une décision technique doit convaincre par des faits vérifiables. |
| Jeter | Fixer le signal d'abandon avant de lancer le pari, pas quand il est déjà en train d'échouer. | `printf "signal_abandon: cout > 3x_estimation\n" >> pari.yml` | retirer un plat de la carte / le Makai Knight qui fixe sa limite à ne pas dépasser avant d'affronter un Horror, pas en plein combat. Où l'analogie casse : la limite du Makai Knight est instinctive, ton signal d'abandon doit être écrit et chiffré à l'avance. |
| Documenter la décision | Inclure les options rejetées et leur raison de rejet, pas seulement l'option choisie. | `printf "## Options rejetées\n- B : rejetée, coût x3\n" >> ADR-001.md` | plan de navigation alternatif refusé / le rapport de mission du Bureau Garo qui liste les pistes écartées avant de traquer un Horror. Où l'analogie casse : le Bureau Garo referme le débat par hiérarchie, une ADR doit convaincre sans autorité imposée. |
| Revenir | Noter la condition précise qui rendrait la décision obsolète. | `printf "condition_revision: si volume > 10k/jour\n" >> ADR-001.md` | jauge de sécurité en régie / le protocole de rappel de Nick Fury qui n'active l'Initiative Avengers que si une condition précise est remplie. Où l'analogie casse : Fury décide seul en toute discrétion, ta condition de révision doit rester visible par toute l'équipe. |
| Modèle mental | Comprendre les forces en jeu (concurrence, coût de changement, incertitude) pour analyser une situation jamais vue. | `printf "forces: [concurrence, cout_changement, incertitude]\n"` | lecture de la houle par le navigateur / Tony Stark qui modélise une menace inconnue à partir des forces en présence plutôt que d'appliquer un plan tout fait. Où l'analogie casse : Stark improvise en génie solitaire, un modèle mental doit rester transmissible à quelqu'un de moins expérimenté. |
| Exécution | Reconnaître un pattern connu et l'appliquer tel quel, sans en comprendre les limites. | `cp gabarit-adr.md ADR-004-titre.md` | geste technique répété sans varier / un joueur qui exécute un corner appris à l'entraînement sans lire le placement adverse du jour. Où l'analogie casse : au football l'échec est visible immédiatement sur le terrain, un pattern de code mal appliqué peut rester invisible pendant des semaines. |
| ADR | Document court qui fige une décision structurante, ses options rejetées, sa condition de péremption. | `git mv brouillon-decision.md docs/adr/ADR-004-titre.md` | journal de bord du bateau / la feuille de match qui fige la composition et les choix tactiques avant le coup d'envoi. Où l'analogie casse : la feuille de match est jetable après le match, une ADR doit rester consultable des années. |

## Défense orale

| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Livrer | Tu accumules des plans jamais confrontés au réel, aucune preuve que ça marche | Pourquoi un artefact imparfait livré vaut mieux qu'un plan parfait non testé ? |
| Mesurer | Tu juges le résultat après coup, avec un critère inventé pour coller au résultat obtenu | Quel est ton seuil d'échec, et pourquoi l'as-tu fixé avant et pas après ? |
| Écrire | Une décision non écrite disparaît de la mémoire collective en six mois, et se redébat sans fin | Que se passe-t-il si la personne qui a pris la décision quitte le projet demain ? |
| Défendre | Une décision indéfendable n'était pas une décision : c'était une intuition non vérifiée | Quelle serait la première question qu'un lead sceptique te poserait sur ce choix ? |
| Jeter | Tu continues un pari perdant par habitude ou par ego, jamais par argument | Quel chiffre observable te ferait arrêter ce projet demain matin ? |
| Documenter la décision | Le prochain lecteur croit que l'option choisie était la seule envisagée, et refait le même débat | Quelles étaient les deux autres options, et pourquoi les as-tu écartées ? |
| Revenir | La décision devient un dogme qu'on n'ose plus questionner, même quand le contexte a changé | Quel événement précis devrait te faire rouvrir ce dossier ? |
| Modèle mental | Tu sais reconnaître un pattern connu mais tu es perdu face à une situation nouvelle | Explique ce qui casse si on change X, sans relire le code |
| Exécution | Tu appliques une recette hors de son contexte de validité, sans savoir pourquoi elle marchait | Dans quel contexte cette recette cesserait-elle de s'appliquer ? |
| ADR | Les décisions d'architecture se prennent en couloir et se reperdent, chacun a sa version | Qu'est-ce qui rendrait cet ADR caduc, concrètement ? |

Ce niveau n'a ni challenge.md ni boss-fight.md (voir README, section Écart au gabarit) : c'est
un sas de lecture. La checklist "fin de niveau" ci-dessous fait office d'auto-évaluation.

## Les 7 règles du joueur (rappel dense)

1. Livrer : un artefact réel bat une conception théorique.
2. Mesurer : écris le critère d'échec avant de commencer.
3. Écrire : une décision non écrite n'existe pas dans six mois.
4. Défendre : si tu ne peux pas la défendre à l'oral, ce n'est pas une décision.
5. Jeter : décide du signal d'abandon avant de lancer le pari, pas après.
6. Documenter la décision : inclus toujours les options rejetées et pourquoi.
7. Revenir : note la condition qui rendrait la décision obsolète.

## Différence exécution / modèle mental

- Exécution : reconnaître un pattern connu et l'appliquer.
- Modèle mental : comprendre les forces en jeu (concurrence, coût de changement,
  incertitude) pour analyser un problème jamais vu.
- Signal de stagnation : incapable de répondre à "qu'est-ce qui casse si on change X"
  sans relire le code.

## Checklist "fin de niveau"

- [ ] Je peux expliquer le modèle mental du niveau en 5 minutes sans support.
- [ ] J'ai un livrable concret, daté, versionné.
- [ ] J'ai une trace écrite d'au moins une décision défendable.
- [ ] J'ai confronté mon livrable au boss-fight du niveau suivant, pas juste au challenge.
- [ ] Si j'ai échoué, je sais exactement quelle leçon retravailler (pas "tout le niveau").

## Les 4 arcs (rappel)

- Arc I (00-03) Fondations de pensée : modéliser avant de coder.
- Arc II (04-08) Construction : bâtir des frontières qui résistent au changement.
- Arc III (09-12) Système en production : observer, résister aux pannes, mesurer la
  performance, sécuriser.
- Arc IV (13-15) Ingénieur en contexte : influencer une équipe, arbitrer, livrer seul
  sous contrainte réelle.

## Si tu rates le boss-fight

Ce niveau n'a pas de boss-fight noté : la sanction, c'est d'arriver mal préparé au niveau 01.
Si tu ne peux pas répondre en cinq minutes à "qu'est-ce qui casse si on change X" sur ta propre
décision, relis les 7 règles ci-dessus et le vocabulaire ADR / coûts irrécupérables. Refais
l'exercice d'écriture d'une décision réelle (la tienne, pas un exemple du cours) avant de
passer au niveau 01. Donne-toi 48 h avant de retenter l'exercice, pas moins : le recul compte
autant que la relecture. Si après une deuxième tentative tu ne sais toujours pas nommer une
option rejetée et sa raison, le blocage n'est pas ce niveau : c'est l'habitude de décider sans
écrire, à corriger avant d'avancer.

## Objection du senior

1. Objection sur « Livrer » : "Ton artefact imparfait livré en prod, si personne ne sait qu'il est imparfait, ça devient un piège pour le prochain qui s'appuie dessus sans le savoir. Justifie."
   Critère de réponse acceptable : nommer explicitement les limites connues dans le livrable (README, bannière, ticket ouvert) et donner un budget de correction chiffré (ex. "corrigé sous 5 jours ouvrés, sinon retiré").
2. Objection sur « ADR » : "Encore un document que personne ne relira dans trois mois : tu perds du temps à écrire de la littérature au lieu de coder."
   Critère de réponse acceptable : montrer un rituel daté de relecture (ex. revue trimestrielle des ADR actifs) ou un exemple concret où un ADR existant a évité de redébattre une décision déjà tranchée.
3. Objection sur « Jeter » : "Fixer un signal d'abandon avant de commencer, c'est se donner une excuse pour lâcher au premier obstacle plutôt que de persévérer."
   Critère de réponse acceptable : le signal doit être un seuil chiffré et objectif (coût, délai, taux d'échec), pas une impression, et son dépassement doit déclencher une vraie décision d'arrêt, pas juste une alerte ignorée.

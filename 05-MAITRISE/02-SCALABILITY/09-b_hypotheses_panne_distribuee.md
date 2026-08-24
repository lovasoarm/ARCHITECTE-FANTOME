---
stability: intemporel
acte: appliquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Hypothèses en panne distribuée : le pont que personne ne fait spontanément

Temps de lecture ~10 min

> **Prérequis explicite, non négociable.** Ce fichier suppose acquis
> [`01-CADRAGE/03-DEBUGGING/06-hypothesis_driven_debug.md`](../../01-CADRAGE/03-DEBUGGING/06-hypothesis_driven_debug.md)
> (le protocole Observation → Hypothèse → Expérience → Verdict → Explication) ET
> [`03-distributed_primitives.md`](03-distributed_primitives.md) de ce module-ci
> (idempotence, retry/backoff, circuit breaker, CAP theorem). Si l'un des deux est flou,
> retourne le lire d'abord : ce fichier ne réexplique ni l'un ni l'autre, il les connecte.

## Le trou que ce fichier comble

Tu sais déboguer un bug local en formulant des hypothèses réfutables. Tu sais nommer un
retry, un circuit breaker, une incohérence CAP. Ce que tu n'as encore jamais fait :
appliquer la première méthode à la seconde matière. En vrai incident, ce sont les deux en
même temps, jamais l'une puis l'autre : un service qui timeout en cascade, à 3h du matin,
sans stack trace claire, avec cinq hypothèses plausibles et une seule bonne.

**La règle ne change pas d'échelle.** Le protocole hypothèse-dirigé (`01-CADRAGE/03-DEBUGGING`)
ne devient pas caduc parce que le bug traverse un réseau au lieu d'un seul process. Il
devient juste plus dur à appliquer, parce qu'un `console.log` ne suffit plus : la preuve
qui réfute ou confirme une hypothèse est maintenant dispersée entre plusieurs logs, sur
plusieurs machines, avec des horloges qui ne sont jamais parfaitement synchronisées.

## Le protocole étendu, en 5 points (rappel volontaire, puis extension)

1. **Observation** : en local : "le test échoue une fois sur dix". En distribué :
   ajoute systématiquement _où_ (quel service a logué l'erreur en premier) et _quand_
   par rapport aux autres services (le correlation ID est ta seule boussole ici : sans
   lui, tu ne peux même pas ordonner les événements entre deux machines).
2. **Hypothèse** : toujours réfutable, mais maintenant elle doit nommer une primitive
   distribuée précise, pas juste "un service est lent". "Le service B timeout parce
   qu'il attend une réponse du service C qui a redémarré et perdu son cache" est une
   hypothèse. "Ça bug côté C" n'en est pas une.
3. **Expérience** : la plus petite modification qui prouve ou réfute, sauf qu'ici
   "petite" veut souvent dire : rejouer le scénario en isolant une seule variable réseau
   (couper C artificiellement, ou lui injecter une latence) plutôt que modifier du code.
4. **Verdict** : pareil qu'en local : hypothèse réfutée → nouvelle hypothèse, jamais
   "je change et je vois". La tentation d'ajouter un retry "au cas où" sans savoir
   pourquoi est l'équivalent distribué d'ajouter un `setTimeout` pour faire taire un
   heisenbug : ça déplace le seuil où le bug redevient visible, ça ne le corrige pas.
5. **Explication** : tu dois pouvoir raconter, à voix haute, la séquence complète
   inter-services avant le fix. Si tu ne peux pas dessiner la chronologie sur un
   tableau, tu n'as pas encore compris l'incident, même si le service est reparti.

## Checklist d'hypothèses obligatoire (même esprit que `01-CADRAGE/03-DEBUGGING/10-CONSIGNE_HYPOTHESES_OBLIGATOIRE.md`)

Avant de toucher au code ou à la config d'un service en panne distribuée, produis un
`HYPOTHESES-DISTRIBUE.md` avec au minimum 3 hypothèses, chacune reliée explicitement à
une primitive de `03-distributed_primitives.md` :

```text
Hypothèse 1 : [service] échoue parce que [absence d'idempotence / retry sans backoff /
               timeout absent / circuit breaker jamais ouvert / incohérence CAP].
Preuve qui la confirmerait : [quel log précis, sur quel service, chercher quoi].
Preuve qui la réfuterait : [le contraire exact].
Coût de l'expérience : [rejouer en isolant quoi, combien de temps].
```

Ordonne-les par coût croissant : commence par l'hypothèse la moins chère à tester, pas
par la plus probable : même règle qu'en debug local, elle ne change pas parce que le bug
traverse un réseau.

## Scénario d'application (à traiter, pas à lire)

Trois services : `orders` (reçoit la commande), `payments` (débite), `notify` (envoie
un email de confirmation). Un vendredi soir, un pic de trafic déclenche ceci :

```text
14:02:03 orders    : POST /orders reçu, appelle payments
14:02:03 payments   : latence anormale (charge), pas encore de réponse à 14:02:08
14:02:08 orders    : timeout après 5s, orders retente l'appel à payments
14:02:09 payments   : la PREMIÈRE requête (celle qui semblait bloquée) répond enfin : succès
14:02:09 payments   : la DEUXIÈME requête (le retry) est traitée aussi : succès
14:02:10 notify    : reçoit DEUX événements "paiement confirmé" pour la même commande
14:02:10 notify    : envoie DEUX emails de confirmation au même client
```

Le client reçoit deux emails, et un examen db montre que `payments` a débité deux fois.
Applique le protocole :

1. Formule au moins 3 hypothèses dans un `HYPOTHESES-DISTRIBUE.md`, en te servant de la
   checklist ci-dessus. Ordonne-les par coût de vérification, pas par intuition.
2. Pour chaque hypothèse, identifie la primitive de `03-distributed_primitives.md`
   directement en cause (indice : ce scénario met en scène l'absence d'exactement une
   des six primitives : laquelle, et pourquoi le retry seul ne suffit pas à l'excuser).
3. Explique, à voix haute ou par écrit, pourquoi "augmenter le timeout à 10s" ne
   corrige rien structurellement : quel est le vrai correctif, et sur quel service
   doit-il porter (indice : ce n'est pas forcément celui qui a l'air en faute).
4. Rédige la correction en une phrase que tu pourrais défendre devant un CTO qui
   demande "pourquoi on a facturé nos clients deux fois vendredi soir".

## Ce que ce scénario n'est pas

Ce n'est pas un heisenbug au sens de `05-MAITRISE/03-EDGE-CASES/07-heisenbug_arena.md`
(qui traite les courses asynchrones **dans un seul process**, en JS pur). C'est son
extension à l'échelle système : mêmes réflexes de méthode (rejouer, mesurer, ne pas
corriger au premier symptôme), mais la preuve est distribuée entre plusieurs machines
et la cause est presque toujours une primitive distribuée manquante ou mal posée, pas
une simple course locale.

## RÉSUMÉ

Le debugging par hypothèses ne s'arrête pas à la frontière d'un process. Un incident
distribué se traite avec exactement le même protocole qu'un bug local : observation,
hypothèse réfutable, expérience la moins chère d'abord, verdict, explication à voix
haute : sauf que chaque hypothèse doit maintenant nommer une primitive distribuée
précise (idempotence, retry/backoff, timeout, circuit breaker, cohérence CAP), et que la
preuve se cherche à travers plusieurs logs corrélés par un identifiant commun, pas dans
un seul terminal. Ajouter un retry ou un timeout plus long sans hypothèse vérifiée est
l'équivalent distribué d'ajouter un `setTimeout` pour faire taire un heisenbug : un
symptôme masqué, jamais une cause corrigée.

Ce fichier explique un incident **déjà survenu**. Son symétrique existe :
[`10-c_tests_de_resilience.md`](10-c_tests_de_resilience.md) t'apprend à provoquer une panne
contrôlée avant qu'elle n'arrive en vrai, pour mesurer si une primitive tient réellement.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

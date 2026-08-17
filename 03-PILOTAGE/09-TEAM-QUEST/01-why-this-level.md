# Pourquoi de bons devs produisent une mauvaise équipe

## La scène

Léa et Youssef codent tous les deux le suivi de tournées d'une entreprise de livraison de
colis frigorifiques. Léa travaille depuis trois jours sur une branche `feature/gestion-conflits`
pour détecter les créneaux qui se chevauchent entre deux chauffeurs. Youssef, sur sa propre
branche, refactore la même fonction de calcul de créneaux parce qu'il la trouve mal nommée.
Ni l'un ni l'autre ne le sait, parce que personne n'a jamais dit à voix haute "on se
prévient avant de toucher un fichier partagé plus d'une heure". Le vendredi, ils fusionnent
leurs deux branches. Le conflit Git prend vingt minutes à résoudre. La vraie perte, elle,
prend trois semaines : Youssef se sent court-circuité, il commence à faire ses revues de
code de Léa plus sèchement, Léa arrête de lui montrer son travail avant qu'il soit fini pour
éviter la friction. Le code redevient propre. L'équipe, non. Deux excellents développeurs
viennent de produire, ensemble, quelque chose de pire que ce que chacun aurait produit seul.

## Ce qui se passe vraiment

Le code est un artefact technique gouverné par des règles explicites : un compilateur
refuse une syntaxe invalide, un type-checker refuse un type incompatible. Le travail
d'équipe est gouverné par des règles implicites : et une règle implicite n'existe que dans
la tête de celui qui l'a en tête. Tant que personne ne la rend explicite, chacun suit sa
propre version, découvre l'écart au moment de la friction, et interprète cet écart comme un
défaut de caractère de l'autre plutôt que comme l'absence d'un accord.

```text
Règle implicite non dite                  Règle explicite écrite

  Léa pense : "on prévient avant           Working agreement : "toute modification
  de toucher un fichier partagé"           d'un fichier partagé plus de 30 min
       |                                   se signale dans le canal d'équipe
  Youssef pense : "chacun avance            avant de commencer"
  sur sa branche, on gère les                     |
  conflits à la fusion"                     Les deux se réfèrent à la même règle,
       |                                    le désaccord porte sur le travail,
  Écart découvert au conflit Git            pas sur l'intention de l'autre
       |                                          |
  Interprété comme "il m'a doublé"          Résolution rapide, confiance intacte
  ou "elle ne me fait pas confiance"
```

Ce niveau attaque trois couches de ce problème, chacune correspondant à un moment différent
de la collaboration :

1. **Le working agreement** (leçon 02) : rend explicites les règles qui, sinon, restent
   dans la tête de chacun jusqu'à ce qu'elles se heurtent : définition de "fini", qui
   décide quoi, comment on se prévient, comment on planifie une absence.
2. **Le flux Git** (leçon 03) : donne une structure technique au travail parallèle, pour
   que deux personnes puissent avancer en même temps sur le même système sans que l'une
   écrase le travail de l'autre ni bloque une release en cours à cause d'un chantier
   inachevé.
3. **La communication sous pression** (leçon 04) : parce qu'aucun accord écrit ne couvre
   tous les cas, et que c'est précisément dans les cas non couverts : désaccord technique,
   demande intenable, décision urgente : que l'équipe se joue vraiment.

### Le coût, toujours le coût

Ce niveau refuse une idée répandue et fausse : "une équipe qui s'entend bien n'a pas besoin
d'accords écrits, ça se fait naturellement". Ça marche tant que l'équipe est petite, calme,
et sans désaccord réel. Dès qu'un désaccord technique surgit, ou qu'une deadline serrée met
la pression, l'absence d'accord explicite ne produit pas de la souplesse : elle produit de
l'ambiguïté, et l'ambiguïté sous pression se résout presque toujours par le rapport de force
plutôt que par le raisonnement. Écrire les règles à froid coûte une réunion. Les découvrir à
chaud coûte une relation.

### Combien ça coûte réellement, en chiffres

La friction relationnelle ne se voit pas dans un burndown chart, mais elle se mesure quand
même si tu regardes le bon indicateur. Reprends l'exemple de Léa et Youssef :

```text
Coût visible immédiat        : 20 minutes de résolution de conflit Git
Coût caché, semaine 1 à 3    : Youssef ralentit ses revues (2h -> 4h par PR de Léa,
                                parce qu'il relit "pour être sûr" au lieu de faire confiance)
Coût caché, semaine 3 à 6    : Léa attend d'avoir fini pour montrer son travail, donc les
                                retours arrivent trop tard pour changer une décision de fond,
                                deux fonctionnalités livrées doivent être reprises après coup
Coût total estimé            : environ 12 heures d'ingénieur perdues en retouches, plus un
                                niveau de confiance qui met des mois à se reconstruire
```

Douze heures perdues, ce n'est pas dramatique en soi. Le vrai coût est que ce mécanisme se
répète : chaque frustration non nommée abaisse un peu plus le seuil de la suivante. Une
équipe qui accumule ce genre de dette relationnelle sans jamais la rembourser finit par
ralentir durablement, bien après que le conflit d'origine a été oublié.

Analogie : une dette relationnelle d'équipe se comporte comme une dette de gréement en
navigation maritime, et comme un accord non dit entre deux cordées qui partagent le même
refuge en montagne.
Où l'analogie casse : un cordage s'use de façon visible et prévisible, tu peux l'inspecter.
Une relation de travail dégradée ne montre aucun signe extérieur avant la rupture : Youssef
continue de sourire en réunion pendant trois semaines avant que le vrai désaccord n'éclate.

### Ce que ce niveau ne prétend pas résoudre

Un working agreement ne remplace pas un management défaillant, et un flux Git propre ne
répare pas une équipe où la confiance est déjà rompue depuis des mois. Ce niveau donne des
outils pour prévenir la friction évitable, celle qui vient d'un non-dit, pas pour arbitrer
un conflit de personnalité profond ou une divergence de valeurs sur le produit lui-même.
Confondre les deux te fait sur-outiller un problème humain avec un document, ou sous-outiller
un problème de coordination avec une conversation qui ne suffira pas seule.

## Quand un accord explicite est vraiment nécessaire

Tout ne mérite pas un working agreement écrit. Un arbre de décision simple aide à trancher :

```text
Cette règle, si elle est comprise différemment par deux personnes,
peut-elle coûter plus d'une heure de travail perdu ou une relation abîmée ?
        |
       OUI -----------------------------------------> NON
        |                                               |
Est-ce que ça touche plus de 2 personnes            Laisse-la implicite,
ou dure plus d'une semaine ?                         inutile de tout écrire
        |
       OUI ---------------------> NON
        |                          |
Écris-la dans le working    Un message clair dans le
agreement, révisée à        canal de l'équipe suffit,
chaque rétrospective        pas besoin de document formel
```

## Compromis

| Option                                               | Coût                                                        | Bénéfice                                                                                    | Quand choisir                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Pas d'accords explicites, "ça se fait naturellement" | Aucun coût immédiat, semble fluide au début                 | Rapidité de démarrage sur une équipe très petite et très alignée                             | Binôme temporaire, projet de quelques jours, jamais une équipe qui dure          |
| Working agreement écrit et Git flow choisi            | Coût d'une réunion de cadrage et de sa révision périodique | Les désaccords se règlent sur des règles connues de tous, pas sur des intentions supposées | Toute équipe de plus de deux personnes qui collabore plus d'une ou deux semaines |
| Accord verbal ponctuel, non écrit                    | Coût faible, mais se dilue vite dans la mémoire de chacun    | Suffisant pour une règle mineure et de courte durée                                          | Règle qui ne concerne que 2 personnes pendant moins d'une semaine               |

## Pièges classiques

- Croire qu'une bonne ambiance efface le besoin de règles écrites : le symptôme apparaît au
  premier désaccord réel, quand chacun découvre que l'autre avait une règle différente en
  tête.
- Rédiger un working agreement une fois et ne plus jamais le relire : le symptôme est un
  document qui décrit une équipe qui n'existe plus, ignoré parce qu'obsolète.
- Confondre flux Git et discipline d'équipe : le symptôme est une équipe qui a un flux
  Git impeccable sur le papier mais des branches vivantes trois semaines sans être fusionnées.
- Traiter tout désaccord comme un problème de personnalité : le symptôme est qu'on change
  les gens au lieu de changer les règles, et le même conflit revient avec la personne
  suivante.
- Écrire un accord trop détaillé pour tout couvrir d'avance : le symptôme est un document de
  dix pages que plus personne ne lit, alors que trois règles bien choisies auraient suffi à
  couvrir 90% des frictions réelles observées.

## Ce que tu dois savoir défendre

1. Pourquoi une équipe compétente individuellement peut produire un résultat collectif pire
   que la somme de ses membres, en l'absence d'accords explicites.
2. Explique le mécanisme par lequel une règle implicite non dite devient, au moment du
   conflit, une accusation contre la personne plutôt qu'un désaccord sur la règle.
3. Donne un exemple de situation où "ça se passe naturellement" fonctionne, et explique
   pourquoi elle ne se généralise pas à une équipe plus grande ou sous pression.

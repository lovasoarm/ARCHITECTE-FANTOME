---
stability: intemporel
last_reviewed: 2026-08
acte: appliquer
---
# SIMULATION-ENTREPRISE : trois protocoles pour l'apprenant seul

Trois modules Staff supposent un contexte que tu n'as pas : un comite d'architecture qui
objecte, une direction qui impose un budget, une astreinte qui sonne la nuit. Sans substitut,
ces modules se lisent au lieu de se jouer, et l'apprenant solo croit les avoir faits.

Regle commune aux trois protocoles : **la contrainte doit venir d'ailleurs que de toi**. Tirage
au sort, tiers reel, ou horloge. Une contrainte que tu choisis toi-meme est une contrainte que
tu sais deja resoudre, donc une simulation qui ne prouve rien.

---

## Protocole 1 : le comite d'architecture

Rattache a : [02-CONSTRUCTION/16_ddd_contrats](../02-CONSTRUCTION/16_ddd_contrats/README.md) et
[05-MAITRISE/08_maitrise_staff_engineer](../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md).
Ce qui manque sans lui : personne ne conteste ton ADR, donc il n'a jamais ete defendu.

Deroule, 20 minutes chronometrees, une seule fois par ADR :

1. Tire au sort trois objections dans la liste ci-dessous (des, ou `shuf -n 3`).
2. Chronometre 20 minutes. Tu ecris, tu ne relis pas ton ADR pendant les cinq premieres minutes.
3. Reponse ecrite par objection : ce que tu concedes, ce que tu maintiens, et le chiffre ou le
   fait qui tranche. « Je pense que » sans chiffre compte comme concession.
4. Colle les trois reponses dans l'ADR, section « objections opposees », datees.

Table de tirage (1-12) :

| # | Objection du comite |
| --- | --- |
| 1 | « Cette decision nous enferme chez un fournisseur. Combien coute la sortie ? » |
| 2 | « Trois services la ou un suffisait. Qui les exploite a 3 h du matin ? » |
| 3 | « Pourquoi pas la solution ennuyeuse deja en place ailleurs dans la maison ? » |
| 4 | « Ton chiffre de charge vient d'ou ? Mesure, ou intuition ? » |
| 5 | « Que se passe-t-il si le trafic est divise par dix ? On paie quand meme ? » |
| 6 | « Cette base de donnees, qui l'a deja exploitee en production dans l'equipe ? » |
| 7 | « Ta coherence est eventuelle. Montre-moi l'ecran ou l'utilisateur voit la donnee fausse. » |
| 8 | « Le delai annonce suppose que rien ne casse. Quelle est ta marge ? » |
| 9 | « Qu'est-ce que cette decision empeche de faire dans un an ? » |
| 10 | « On a deja tente ca il y a trois ans, ca a echoue. Qu'est-ce qui a change ? » |
| 11 | « Ton SLO est plus strict que celui du service qui t'appelle. Pourquoi payer pour ca ? » |
| 12 | « Si tu avais la moitie du budget, tu ferais quoi ? » |

Verdict binaire : trois reponses ecrites, chacune avec au moins un chiffre source ou une
concession explicite. Sinon, l'ADR n'est pas defendu.

---

## Protocole 2 : la direction financiere

Rattache a : [03-PILOTAGE/07_cloud_foundations](../03-PILOTAGE/07_cloud_foundations/README.md)
et au livrable `DECISION-ARBITRAGE.md`.
Ce qui manque sans lui : ton budget n'a jamais rencontre de refus, donc il n'a jamais arbitre.

Deroule, a froid, sur un budget deja ecrit :

1. Tire une contrainte au sort (des a 6) :

| # | Contrainte imposee |
| --- | --- |
| 1 | Budget mensuel reduit de 40 %, effet immediat, meme SLO. |
| 2 | Plafond absolu impose : aucune ligne au-dessus de 30 % du total. |
| 3 | Le poste le plus cher est gele : interdiction de l'augmenter pendant 12 mois. |
| 4 | On te demande de servir 5 fois plus d'utilisateurs a budget constant. |
| 5 | La direction veut un cout par utilisateur actif plafonne et publie chaque mois. |
| 6 | Le fournisseur augmente ses prix de 25 % dans 60 jours. |

2. Tu as 30 minutes pour produire une reponse d'une page : ce que tu coupes, ce que tu degrades
   explicitement (et pour quel utilisateur), ce que tu refuses de toucher et pourquoi.
3. Une seule phrase obligatoire : « ce que cette coupe rend impossible, c'est ... ». Un budget
   coupe sans consequence nommee est un budget mal chiffre au depart.

Verdict binaire : une page, un chiffre avant / apres par ligne touchee, une consequence nommee.

---

## Protocole 3 : l'astreinte

Rattache a : [03-PILOTAGE/06_fiabilite_slo](../03-PILOTAGE/06_fiabilite_slo/README.md) et au
mode urgence de
[TECH-ILA](TECH-ILA/tech-ila/09-mode-urgence.md).
Ce qui manque sans lui : tes incidents sont des exercices que tu as ecrits toi-meme, donc tu en
connais la cause avant de commencer.

Deroule, avec un tiers obligatoire (un autre apprenant, un collegue, un proche technique) :

1. Le tiers casse quelque chose dans ton fil rouge, hors de ta vue : variable d'environnement
   modifiee, index supprime, latence injectee, quota abaisse, dependance coupee. Il note la
   cause dans une enveloppe fermee, ainsi que l'heure.
2. Il te previent comme une alerte le ferait : un message, aucune explication.
3. Chronometre. Tu ecris au fil de l'eau : heure, hypothese, ce que tu observes, ce que tu
   changes. Tu ne modifies qu'une chose a la fois.
4. Fin : service retabli. Le tiers ouvre l'enveloppe.
5. Post-mortem d'une page dans les 24 h : delai de detection, delai de retablissement, fausses
   pistes suivies, et **la mesure qui manquait** pour trouver plus vite.

Verdict binaire : un journal horodate ecrit pendant l'incident (pas reconstitue apres), et un
post-mortem qui nomme une mesure manquante. Un incident resolu sans journal ne compte pas.

Si tu n'as vraiment personne : programme la panne a retardement (tache planifiee qui applique un
des sabotages ci-dessus a une heure aleatoire dans les 72 h, script ecrit puis oublie). C'est
moins bon, mais l'horloge reste un tiers.

---

## Ce que ces trois protocoles ne remplacent pas

Ils simulent la contrainte, pas la relation. Ils ne remplacent ni une revue de code recue d'un
inconnu, ni une note de direction publiee et contredite en public : ces deux-la exigent un tiers
reel et restent decrites dans
[PREUVES-STAFF-ENGINEER.md](../PREUVES-STAFF-ENGINEER.md).

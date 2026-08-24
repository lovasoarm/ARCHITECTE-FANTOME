## perishability_id: PER-0094

stability: perissable
acte: annexe
noyau: oui
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Contradicteur : tenir une décision sous objection

Temps de lecture ~9 min

Le contradicteur ne cherche pas la meilleure réponse rhétorique : il cherche le
chiffre ou l'hypothèse qui ferait tomber une décision. La preuve S5 de
[PREUVES-STAFF-ENGINEER.md](../PREUVES-STAFF-ENGINEER.md) **dépend de cette passe**.
Un fichier vide rend S5 impossible.

Tu joues **seul**. Dépôt public, traces datées, résultats du capstone. Une réponse
d'un collègue ou d'un mainteneur est un bonus daté, jamais une condition.

## Protocole de réponse écrite (obligatoire)

Dix lignes maximum par objection. Structure imposée, dans cet ordre :

1. **Décision** (une phrase).
2. **Hypothèse** (périmètre, palier de trafic, période).
3. **Preuve** (fichier de ton dépôt + mesure).
4. **Chiffre** : obligatoire dès que la question porte sur un **coût** ou une
   **disponibilité** : valeur, unité, date, source. Si la donnée manque, écris
   la mesure qui la produira ; n'invente pas de précision.
5. **Condition de révision** (seuil + date).

Le contradicteur relance une fois si tu réponds seulement « cela dépend ».
Une réponse est recevable quand un tiers peut refaire le calcul, retrouver la
mesure et savoir quand rouvrir l'ADR.

Les vingt réponses d'exemple ci-dessous portent sur le projet d'exercice
**Lumen** (créneaux). Ce ne sont **pas** tes réponses : tu les réécris sur ton
fil rouge, avec tes relevés. Elles montrent la densité exigée.

## Les vingt objections, avec une réponse type (10 lignes max)

### 1. Pourquoi pas un monolithe modulaire ?

Décision : monolithe modulaire jusqu'à 10 000 utilisateurs ; pas de réseau entre
contextes. Hypothèse : une équipe, un dépôt, un cycle de déploiement. Preuve :
ADR-002 et la carte de contextes, modules encore dans le même process. Chiffre :
0,00 € d'egress interne ; p95 mesuré à 180 ms le 2026-08-14. Condition : ouvrir
un service séparé seulement si deux équipes déploient en conflit plus de 2 fois
par mois, ou si le p95 dépasse 400 ms à cause d'un module non isolable.

### 2. Ton SLO à 99,9 % coûte combien de plus que 99,5 % ?

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Décision : rester à 99,5 % sur 30 jours. Hypothèse : 200 000 requêtes / 30 j au
palier 10 000. Preuve : `SLO.md` + `06A-BUDGET-CLOUD.md`. Chiffre : budget 99,5 % =
1 000 requêtes ratées ; 99,9 % = 200. Le saut exige une base multi-AZ à +58 €/mois
(relevé 2026-08-14, URL dans le relevé tarifaire) pour gagner ~800 requêtes, soit
0,0725 € par requête épargnée : trop cher à ce palier. Révision : 50 000
utilisateurs ou un contrat client qui pénalise 99,5 %.

### 3. Qui paie l'egress si le trafic est multiplié par dix ?

Décision : l'éditeur paie ; le tarif n'est pas refacturé à l'utilisateur. Hypothèse :
1 Go sortant ≈ 0,08 € (ordre 2026-08-18, `07-RELEVE-REFERENCE-2026.md` : à remplacer
par ton URL). Preuve : ligne Egress de `06A-BUDGET-CLOUD.md`. Chiffre : 12 Go/mois à
10 000 users → ~0,96 € ; ×10 → ~9,60 €, encore mineur ; à 1 000 000 users la ligne
devient dominante. Condition : CDN dès que l'egress dépasse 15 % de la facture.

### 4. Ton CQRS apporte quoi qu'un index ne donne pas ?

Décision : pas de CQRS asynchrone à 10 000 users. Hypothèse : 20 req/s, 200 000
lignes. Preuve : leçon CQRS + mesure `EXPLAIN` du fil rouge. Chiffre : index 35 ms
vs 180 ms ; worker de projection ~60 €/mois + 4 h d'exploitation. Le gain de
latence ne paie pas. CQRS n'apporte ici qu'un modèle de lecture dédié **si** le
métier accepte 30 s de retard : ce qu'un index ne fait pas. Révision : p95 lecture

> 200 ms après index + pagination, ou file d'écriture saturée.

### 5. Ta brique IA tombe : ton produit vaut encore quoi ?

Décision : le parcours critique (réserver un créneau) survit sans IA. Hypothèse :
l'IA suggère, elle n'écrit pas. Preuve : `IA-EN-PROD.md` §0 et §2, statut
`degraded_ai_quota`. Chiffre : 100 % des réservations restent possibles via le
sélecteur ; SLO produit 99,9 % tenu ; SLO IA 99,5 % consommé. Valeur restante :
le métier entier moins le confort de formulation libre. Révision : si plus de
40 % des réservations passent par l'IA pendant 30 j, remonter le plafond ou
accepter un SLO produit lié.

### 6. Que se passe-t-il si la file est pleine ?

Décision : refuser explicitement (429) plutôt que d'allonger sans borne. Hypothèse :
file 200 jobs, TTL 2 min. Preuve : test de charge + alerte saturation. Chiffre :
au-delà de 200, 0 job accepté ; l'utilisateur voit « réessaie dans 2 min » ; pas
de perte silencieuse. Révision : si 429 > 1 % des POST pendant 7 j, augmenter la
file ou le débit worker, coût recalculé.

### 7. Quel est le pire coût mensuel plausible, pas le coût moyen ?

Décision : budgéter le P95, pas la moyenne. Hypothèse : pic ×4 vs moyenne, 3 j/mois.
Preuve : `06A-BUDGET-CLOUD.md` palier 10 000 + ligne IA. Chiffre : moyenne 1 393 € IA
après cache ; pire mois sans cache ni plafond = 2 246 € ; **avec plafond 250 €**
le pire IA est 250 €, le reste tombe en dégradé. Révision : si le P95 réel dépasse
le plafond 2 mois de suite, lever le plafond ou couper une feature.

### 8. Quel signal prouve que le cache améliore vraiment le p95 ?

Décision : le cache se garde seulement s'il baisse le p95 lecture d'au moins 30 %.
Hypothèse : 38 % de hits mesurés 30 j. Preuve : histogramme avant/après, même
fenêtre. Chiffre : p95 180 ms → 110 ms le 2026-08-14 ; hit ratio 38 %. Si hit
< 20 % ou p95 inchangé, on retire le cache (coût mémoire rendu). Révision :
mesure mensuelle, seuil 30 %.

### 9. Pourquoi cette donnée appartient-elle à ce contexte borné ?

Décision : « créneau » vit dans Planning ; « paiement » vit dans Facturation.
Hypothèse : deux définitions du mot « client ». Preuve : carte de contextes +
traducteur anti-corruption. Chiffre : 0 jointure SQL inter-contextes ; 1 API
interne versionnée. Révision : si une requête métier a besoin des deux dans la
même transaction plus de 5 fois/jour, refaire la frontière.

### 10. Quelle migration peut être annulée en moins de quinze minutes ?

Décision : toute migration destructrice a un plan retour chronométré. Hypothèse :
exercice palier 10 000, dump 2,1 Go. Preuve : `PANNE-<date>.md`, RTO mesuré.
Chiffre : restauration 6 min 40 s chrono en main (exercice). Si > 15 min, la
migration n'est pas autorisée en heures de pointe. Révision : rejouer le drill
à chaque doublement de volume.

### 11. Pourquoi accepter une cohérence à terme ici ?

Décision : l'auteur lit son écrit tout de suite (read-your-writes) ; les autres
voient la projection sous 30 s p95. Hypothèse : affichage public des créneaux.
Preuve : leçon 1 CQRS + métrique de lag. Chiffre : lag p95 8 s, p99 40 s, alerte
à 30 s p95. Un créneau « en cours de publication » n'apparaît pas vide. Révision :
si le métier exige un refus immédiat de double-booking, revenir à une transaction
unique.

### 12. Quelle alerte réveille une personne, et laquelle ne le fait pas ?

Décision : réveil seulement si l'utilisateur est bloqué ou si le budget d'erreur
< 20 %. Hypothèse : astreinte 1 personne. Preuve : `SLO.md` liste d'alertes.
Chiffre : alerte « disjoncteur IA » = e-mail heures ouvrées (confort) ; alerte
« POST /reservations 5xx > 2 % 5 min » = téléphone. Révision : si > 2 réveils
inutiles / semaine, remonter le seuil (fatigue d'alerte).

### 13. Qui peut lire les données sensibles, et comment le sais-tu ?

Décision : rôle `planning.admin` seulement, audit des lectures. Hypothèse : e-mails
dans la table users. Preuve : gate sécu du module + `SECURITY_GATE_FILLED.md`.
Chiffre : 3 comptes prod, revue trimestrielle ; 0 secret en clair dans le dépôt
(scan CI). Révision : tout nouveau rôle exige un rayon d'impact écrit.

### 14. Quelle hypothèse produit rend cette architecture inutile ?

Décision : si Lumen n'est plus un outil de créneaux mais un réseau social, le
découpage Planning/Facturation tombe. Hypothèse : 80 % de la valeur = réserver.
Preuve : PROBLEM-HUNT du cadrage. Chiffre : si le taux de réservation / DAU
< 5 % pendant 60 j, arrêter le chantier architecture et relire le problème.
Révision : date de revisite du dossier unique.

### 15. Combien coûte une région secondaire pendant douze mois ?

Décision : refusée à 10 000 users. Hypothèse : réplique froide vs multi-région
active. Preuve : ADR de refus + relevé. Chiffre : +58 €/mois × 12 = 696 € pour
une HA de base, hors egress inter-régions ; multi-région complète estimée

> 3× la facture actuelle. Révision : RTO mesuré > SLO, ou client qui paie la
> ligne.

### 16. Quelle dette technique as-tu refusée et avec quel chiffre ?

Décision : pas de réécriture « clean architecture complète » cette année.
Hypothèse : 40 h de chantier. Preuve : `DECISION-ARBITRAGE.md`. Chiffre : 40 h ×
coût interne d'exercice 45 €/h = 1 800 € ; valeur attendue < 400 € de p95.
Refus daté. Révision : si le temps de livraison d'une feature frontière
dépasse 5 j médiane.

### 17. Que voit l'utilisateur pendant une restauration ?

Décision : page de statut + file d'attente, pas une erreur brute. Hypothèse :
RTO 12 min, RPO 5 min. Preuve : drill de restauration. Chiffre : 12 min chrono ;
pendant ce temps, lectures possibles sur la copie ; écritures refusées avec
ETA. Révision : si le message d'ETA dévie de plus de 3 min vs réel, corriger
le runbook.

### 18. Quel changement de fournisseur casse tes invariants ?

Décision : invariants = schéma de réservation, SLO, plafond IA, pas le SDK.
Preuve : `PORTAGE.md`. Chiffre : écart mensuel relevé entre deux fournisseurs
sur 4 postes ; un SLA 99,99 % marketing n'est pas un invariant. Révision :
si un poste change de nature (egress devenu ingress payant), nouvel ADR.

### 19. Comment prouverais-tu que l'agent n'a pas inventé ce résultat ?

Décision : toute sortie modèle est validée par schéma + 20 cas + journal du
consigne hashé. Preuve : rapport d'éval et traces. Chiffre : 20/20 schéma ;
cas 9 et 11 à 100 % ; hash du consigne dans les logs. Sans ça, le résultat n'est
pas une preuve. Révision : échec d'un cas critique = rollback du modèle.

### 20. Quelle décision prendrais-tu différemment avec dix fois moins de budget ?

Décision : couper l'IA, une AZ, et la rétention de logs > 7 j. Hypothèse :
facture actuelle palier 10 000. Preuve : `06A-BUDGET-CLOUD.md` lignes triées.
Chiffre : ÷10 du total ; on garde le monolithe, l'index, le SLO 99,5 % si le
volume suit. Révision : ce plan devient le palier 100 users, déjà écrit.

## Objection tirée au sort (passe orale, non préparée)

Les vingt objections ci-dessus sont écrites d'avance : tu peux y répondre en les ayant
travaillées la veille. Une soutenance réelle ne marche pas comme ça, et un public non
technique ne pose pas les questions de cette liste. Cette passe corrige les deux défauts à la
fois : **persona non technique, objection inconnue, réponse orale encaissée sans notes**.

### Protocole (25 min, jouable seul)

1. **Tire la persona.** Lance un dé à six faces, ou `node -e "console.log(1+Math.floor(Math.random()*6))"`.

   | Dé  | Persona                               | Ce qu'elle veut                                                    | Ce qu'elle ne comprendra pas    |
   | --- | ------------------------------------- | ------------------------------------------------------------------ | ------------------------------- |
   | 1   | Direction financière                  | le coût sur douze mois, le point mort                              | « latence p95 », « idempotent » |
   | 2   | Régulateur / DPO                      | où vont les données, qui y accède, en combien de temps tu notifies | ton découpage en services       |
   | 3   | Client final mécontent                | quand ça remarche, ce qu'il a perdu                                | ton budget d'erreur             |
   | 4   | Direction commerciale                 | ce que tu promets par écrit à un prospect                          | tes ADR                         |
   | 5   | Assurance / juridique                 | qui est responsable si ça casse                                    | ta chaîne CI                    |
   | 6   | Un nouveau de l'équipe, non technique | pourquoi c'est fait comme ça et pas plus simple                    | tout le jargon                  |

2. **Tire l'objection.** Ne la choisis pas : prends la ligne dont le numéro sort d'un tirage
   entre 1 et 20 dans la liste ci-dessus, et **reformule-la avec les mots de la persona**
   avant de commencer. Reformuler est déjà la moitié de l'exercice.

3. **Réponds à voix haute, enregistrée, sans notes écrites, en 3 minutes maximum.** Pas de
   brouillon préalable : c'est la contrainte qui fait la valeur de la passe. Un chiffre annoncé
   de mémoire et faux se corrige à l'étape 5 ; un chiffre lu sur une fiche ne prouve rien.

4. **Contrainte obligatoire : au moins une question où tu dis « je ne sais pas ».** Tire une
   seconde objection et tiens l'aveu jusqu'au bout, selon le protocole de
   [10-TEAM-CRAFT/10-dire_je_ne_sais_pas.md](../03-PILOTAGE/10-TEAM-CRAFT/10-dire_je_ne_sais_pas.md) :
   ce que tu ne sais pas, comment tu le sauras, à quelle date tu reviens. Une soutenance sans
   un seul « je ne sais pas » est une soutenance où quelqu'un a bluffé.

5. **Réécoute l'enregistrement une fois**, et note trois lignes : un terme technique qui a
   échappé et que la persona n'aurait pas compris, un chiffre annoncé sans source, et la
   question que tu redoutes qu'elle pose ensuite. Cette troisième ligne devient l'objection de
   la prochaine passe.

### Ce que ça produit

Une entrée datée dans `CONTRADICTION.md` de ton dépôt fil rouge : date, persona tirée, objection
reformulée, durée de la réponse, la phrase exacte de ton « je ne sais pas » et sa date de retour,
et les trois lignes de la réécoute. Trois passes minimum, à trois dates différentes, avant la
soutenance du boss fight : sinon la première objection non préparée de ta vie tombera le jour
où elle compte.

### (attention) Piège

Rejouer la même passe avec la même persona jusqu'à ce que ce soit fluide. La fluidité obtenue
sur une objection connue ne se transfère pas : c'est le tirage qui entraîne, pas la répétition.

## Soutenance

Le [boss fight maîtrise](../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/96-boss-fight.md)
branche ici : vingt minutes de dossier, puis au moins trois objections qui
croisent deux familles. Même protocole, tes chiffres, pas ceux de Lumen.

---
stability: intemporel
acte: pilotage
noyau: oui
type: grimoire
---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# Grimoire : produit, coût, ROI

<!-- AF-DIAGRAM:roi -->

```text
text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

Temps de lecture ~2 min

Cinq colonnes comme partout : Terme, Définition, Code, Analogies, Limite. Deux analogies au
maximum par ligne ; la dernière colonne dit où l'image ment.

| Terme                         | Définition                                                                                 | Code                                    | Analogies                                                      | Limite                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Grille coût / risque / valeur | Toute décision se pose avec trois nombres : valeur, coût, risque.                          | `valeur \| coût \| risque = p × impact` | un devis de travaux / un bilan de santé                        | Trois nombres sourcés restent une estimation : ils se datent et se révisent.      |
| Option zéro                   | « Ne rien faire » figure toujours comme ligne du tableau de décision.                      | `ligne 0 : statu quo`                   | rester chez soi / garder sa vieille voiture                    | Le statu quo a aussi un coût caché : il faut le chiffrer, pas le mettre à 0.      |
| Nombre sourcé                 | Un nombre sans source est une opinion déguisée en donnée.                                  | `source: ticket #142, 2026-06`          | un prix sans étiquette / une citation sans auteur              | Une source interne biaisée reste une source : la méthode de mesure compte.        |
| Point mort                    | Seuil à partir duquel un investissement est remboursé par son gain.                        | `point_mort = coût / gain_mensuel`      | un panneau solaire / un abonnement contre des tickets          | La formule suppose un gain mensuel stable, ce qui est rarement vrai.              |
| Refactoring sans point mort   | Refactorer du code jamais modifié ne rembourse jamais son coût.                            | `git log --since=1y -- fichier`         | repeindre une cave murée / réviser une voiture au garage à vie | Un code figé peut quand même porter un risque de sécurité, hors ROI.              |
| Dette déclarée                | Une dette sans intérêt chiffré et sans déclencheur n'est pas une dette gérée.              | `registre: coût/mois + seuil`           | un prêt sans taux / une ardoise sans montant                   | Chiffrer l'intérêt d'une dette diffuse est approximatif : dire la marge d'erreur. |
| Déclencheur métrique          | Le moment de payer la dette est fixé par une métrique, pas par une humeur.                 | `if p95 > 800ms → payer`                | un seuil d'alarme / une date de péremption                     | Un seuil unique ignore la tendance : deux points valent mieux qu'un.              |
| Coût déjà dépensé             | Ce qui est déjà dépensé ne décide plus rien de la suite.                                   | `sunk = 0 dans la décision`             | un billet non remboursable / un repas déjà payé                | L'apprentissage acquis, lui, se reporte : ce n'est pas de l'argent perdu.         |
| Refus chiffré                 | Un refus s'écrit, avec le coût de l'attente en face.                                       | `refus + coût/mois d'attente`           | un accusé de réception / un constat amiable                    | Un refus écrit sans alternative proposée passe pour de l'obstruction.             |
| Version à 20 %                | Il existe presque toujours une variante à 20 % du coût qui prend l'essentiel de la valeur. | `périmètre réduit = 20 % coût`          | une roue de secours / un pansement avant l'opération           | La version réduite devient parfois définitive : dire ce qu'elle laisse ouvert.    |

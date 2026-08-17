---
stability: perissable_2027
acte: appliquer
---

# 04 : LES TROIS TENSIONS, LA SEULE SECTION QUI PROUVE LE CROISEMENT

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans ce fichier, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle.

Temps de lecture ~9 min

Une tension oppose **deux familles**, avec **un chiffre de chaque côté**, et se termine par un
arbitrage assumé et daté. Tout le reste est une liste de bonnes intentions.

## Le format imposé

```
Tension n : [famille A] contre [famille B]
  Côté A : [fait chiffré, source, date]
  Côté B : [fait chiffré, source, date]
  Ce qui est incompatible : [une phrase]
  Arbitrage : [décision], décidée le [date], par [qui]
  Ce qu'on perd : [nommé explicitement]
  Point de revue : [date]
```

## Trois tensions valides, tirées du projet fictif Lumen

1. **S3 contre S4** : l'export comptable le moins cher (6 jours, 0 €/mois) consomme dix semaines
   de budget d'erreur en une nuit. Arbitrage : version à 14 jours et 96 €/mois, parce que trois
   clients ont signé la promesse de 99,5%.
2. **S1 contre S3** : le multi-zone chiffré à +130% sur la base n'est pas financé ce trimestre.
   Arbitrage : mono-zone assumée, RTO annoncé à 60 minutes, information écrite aux clients plutôt
   que promesse implicite.
3. **S6 contre S4** : le nouveau modèle IA gagne deux cas d'ambiguïté et en perd un sur les
   injections de consigne. Arbitrage : bascule suspendue, le gain produit ne paie pas la
   régression de sécurité.

## Les fausses tensions, à reconnaître

- "Il faudrait faire mieux sur la sécurité" : aucune famille opposée, aucun chiffre.
- "On manque de temps" : contrainte générale, pas une contradiction entre deux exigences.
- "Le code mériterait un refactoring" : c'est un souhait, pas un arbitrage.

Si tu ne trouves pas trois tensions, c'est presque toujours qu'un de tes documents n'a pas été
chiffré : cherche l'endroit exact où le budget (S1) et la promesse (S3) se contredisent, il existe.

## Une des trois tensions doit revenir sur une décision déjà écrite

Les trois exemples ci-dessus opposent des faits chiffrés à un instant donné. Ça ne suffit pas :
au moins une de tes trois tensions doit opposer un fait nouveau à une **décision que tu as déjà
écrite par écrit plus tôt** (l'ADR de la section 2, ou un ADR du capstone), pas à une simple
estimation. Le format ne change pas, mais le champ "Côté A" ou "Côté B" doit citer le chemin
exact et la date de la décision antérieure qu'il contredit.

Le piège à éviter : réécrire silencieusement l'ancienne décision comme si la nouvelle avait
toujours été le plan. Une tension qui contredit un ADR antérieur sans le citer n'est pas
acceptée en section 8, exactement comme une révision d'ADR non citée n'est pas acceptée en
section 2. Ce n'est pas un détail de forme : c'est la différence entre quelqu'un qui change
d'avis en le disant, et quelqu'un qui change d'avis en espérant que personne ne remarque le
premier avis.

## ET APRÈS

[04_plan_90_jours.md](04_plan_90_jours.md).

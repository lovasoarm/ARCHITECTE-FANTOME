---
stability: perissable_2027
acte: appliquer
---

# Instrumenter le fil rouge : la mise en pratique de l'observabilité

> **Hiérarchie de traitement.** Cette page n'enseigne pas l'observabilité : elle la fait
> poser sur ton fil rouge. Le traitement de référence, complet et hypercomplet, est
> [03-PILOTAGE/05_observability/](../05_observability/README.md) : logs structurés, traces,
> métriques, alertes, signatures de course dans les logs, coût du volume, drills de lecture
> de trace en prod. **Reviens ici quand tu l'as lue.** Ouvrir cette page sans avoir lu le
> module de référence donne un tableau de bord que tu ne sais pas défendre.

## Ce que tu fais ici, et nulle part ailleurs

Le module de référence te donne les quatre gestes. Cette page en exige la trace **sur ton
propre système**, avec des nombres relevés chez toi, à une date écrite. Un apprenant qui sait
réciter les trois piliers et n'a pas une seule métrique qui tourne sur son fil rouge n'a
rien de vérifiable à montrer.

## Le geste, en quatre passes de 20 minutes

**Passe 1 : les trois questions d'incident.** Écris, avant de toucher au code, les trois
questions que tu voudras poser à ton système un mardi à 14h quand il tombera. Formule-les
comme des questions, pas comme des dashboards : « combien de tournées sont affectées, et
depuis quand » est une question ; « graphique du taux d'erreur » n'en est pas une.

**Passe 2 : un log structuré par question.** Pour chacune des trois questions, un événement
nommé et ses champs. Le nom de l'événement est un fait au passé, pas une phrase : la règle
et les contre-exemples sont dans
[01_structured_logging.md](../05_observability/01_structured_logging.md).

```text
question                              --> evenement            --> champs qui repondent
"combien de tournees affectees"       --> tour.blocked         --> tourId, warehouseId, cause
"depuis quand"                        --> tour.blocked         --> recordedAt
"est-ce corrélé au dernier deploiement" --> deploy.completed   --> version, recordedAt
```

**Passe 3 : une alerte, une seule.** Elle porte sur un symptôme visible par l'utilisateur de
ton fil rouge, avec un seuil et une fenêtre. Écris à côté, en une phrase, ce que fait la
personne qui la reçoit à 3h du matin. Une alerte sans geste de réponse écrit est un bruit
que tu couperas dans trois semaines.

**Passe 4 : le coût mensuel.** Reprends le calcul de volume du module de référence avec
**tes** ordres de grandeur (requêtes par minute, taille moyenne d'un événement), et pose la
règle d'échantillonnage qui en découle. Les prix se relèvent, ils ne se supposent pas :
procédure de relevé dans
[07_cloud_foundations/07_releve_tarifaire_reel.md](../07_cloud_foundations/07_releve_tarifaire_reel.md).

## Preuve à livrer

- `OBSERVABILITE.md` daté : les trois questions, les trois événements et leurs champs.
- Une capture ou un extrait montrant l'événement réellement émis par ton système.
- L'alerte, son seuil, sa fenêtre, et le geste de réponse en une phrase.
- Le calcul de volume mensuel, avec le nombre d'entrée et la règle d'échantillonnage.

## Verdict

Binaire, par le critère du
[verification_pack du module de référence](../05_observability/verification_pack/criteres.md) :
les trois questions trouvent leur réponse dans les champs réellement émis, ou la mise en
pratique n'est pas validée. Un tableau de bord joli qui ne répond à aucune des trois
questions écrites en passe 1 est un échec, pas un demi-succès.

## Pièges classiques de cette mise en pratique

- Instrumenter d'abord, chercher les questions après : on obtient des champs qui décrivent le
  code au lieu de décrire l'incident.
- Recopier les exemples du module de référence tels quels : le fil rouge n'a ni tournées ni
  chaîne du froid, et un événement emprunté ne se défend pas à l'oral.
- Poser cinq alertes le premier jour : la seule discipline qui tienne est une alerte
  actionnable, puis une seconde le jour où la première a servi.

## Où continuer

- Référence complète : [03-PILOTAGE/05_observability/](../05_observability/README.md).
- Ce que l'observabilité doit rendre mesurable en incident :
  [05-incidents-and-postmortem.md](05-incidents-and-postmortem.md).
- Les tests qui rapportent, même arbitrage coût/panne :
  [02-tests-that-pay.md](02-tests-that-pay.md).

Trois questions écrites avant le code, trois événements qui y répondent, une alerte qu'on
sait traiter à 3h du matin, un coût mensuel chiffré : c'est tout ce que cette page demande,
et c'est ce qui distingue un système observé d'un système simplement bavard.

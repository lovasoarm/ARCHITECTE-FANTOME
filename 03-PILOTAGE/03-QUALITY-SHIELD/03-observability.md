---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, defaut_cache]
anti_recipe_key: temps_limite+defaut_cache
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Logs structurés, métriques, traces, alertes utiles

Temps de lecture ~3 min

> **Traitement complet de l'observabilité :** ce fichier n'est pas le cours détaillé.
> Le cours complet (logs structurés, distributed tracing, métriques, Sentry, debug en
> prod, plus loin dans le fil) vit dans
> [`03-PILOTAGE/05-OBSERVABILITY`](../05-OBSERVABILITY/01-00-why-observability.md). Si tu
> veux apprendre l'observabilité pour la première fois, ouvre ce module-là, pas celui-ci.

## Pourquoi ce fichier existe quand même, ici

Ce niveau (`QUALITY-SHIELD`) construit un bouclier en trois pièces : tester juste
(`02-tests-that-pay.md`), voir ce qui se passe sans deviner (ce fichier), et bloquer
automatiquement ce qui doit l'être (`04-review-and-ci.md`). L'observabilité est le 3ᵉ
pilier du bouclier : sans elle, tu ne sais même pas que tes tests ont laissé passer
quelque chose une fois en prod. Ce fichier n'a pas vocation à réapprendre les logs et
les traces depuis zéro : `05-OBSERVABILITY` le fait déjà, en entier, plus loin. Il sert
uniquement à relier ce que tu vas apprendre là-bas au bouclier qualité que tu construis
ici, maintenant, avant même d'avoir ouvert ce module complet.

## Le lien avec le reste du bouclier

Un test qui passe en CI ne dit rien de ce qui se passe en prod trois mois plus tard,
avec de vrais utilisateurs et un vrai trafic. C'est exactement le trou que
l'observabilité comble : elle répond à des questions qu'on n'a pas anticipées à
l'avance, à partir de données que le système a produites de lui-même : pas seulement
aux questions déjà posées par un dashboard prévu en amont (ça, c'est du monitoring, pas
de l'observabilité, et la nuance compte).

```text
Monitoring                          Observabilité
"Le taux d'erreur est à 12 %"       "Le taux d'erreur est à 12 %, et en filtrant
 (dashboard prévu à l'avance)        par entrepôt, il monte à 90 % sur celui de
                                     Lyon-Est depuis 14h03, corrélé au déploiement
                                     du service de température à 14h01"
```

Les trois piliers que tu vas creuser dans `05-OBSERVABILITY` : logs structurés (quoi,
précisément, ici), métriques (combien, et est-ce que ça dérive), traces (où est passé
le temps, où ça a cassé) : sont ce qui transforme un test vert en CI en confiance
réelle en prod. Une alerte qui déclenche sur un symptôme visible par l'utilisateur
(taux d'échec, latence perçue) plutôt que sur une cause interne possible (CPU, mémoire)
est la même discipline que choisir quoi tester selon le coût réel d'une panne
(`02-tests-that-pay.md`) : dans les deux cas, tu dépenses l'effort là où ça rapporte,
pas partout de façon uniforme.

## Piège à retenir avant d'ouvrir le module complet

Logger chaque ligne, tracer chaque appel interne, alerter sur chaque métrique système a
un coût réel : volume à stocker et payer, bruit qui noie le signal utile, et un risque
de sécurité si une donnée sensible finit dans un log jamais audité. Ce n'est pas un
détail secondaire : `05-OBSERVABILITY` chiffre ce coût en détail (volume de logs,
règle d'échantillonnage, rétention) : retiens seulement, pour l'instant, que « tout
observer » n'est jamais gratuit, exactement comme « tout tester » ne l'est pas.

## Ce que tu dois savoir défendre

1. Explique la différence entre monitoring et observabilité avec un exemple concret où
   le monitoring seul ne suffit pas à diagnostiquer un incident.
2. Pourquoi une alerte doit-elle être branchée sur un symptôme visible par l'utilisateur
   plutôt que sur une métrique système interne comme le CPU ?
3. Pourquoi ce bouclier qualité range-t-il l'observabilité juste après les tests, plutôt
   qu'avant ou à la fin ?

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

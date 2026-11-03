---
stability: intemporel
acte: pilotage
---

**SCÈNE CRAZYDEVS : Garo :** chaque ressource cloud consomme du chakra, sauf qu'ici le chakra est facturé. Le but de ce module est précisément d'apprendre à relier coût, fiabilité et décisions.

# Prereq check : Cloud Foundations

Temps de lecture : 3 min.

Ce diagnostic ne bloque pas l'accès au module. Il sert à choisir les notions à relire. **Aucun compte cloud payant ni prix fournisseur récent n'est nécessaire pour commencer** : utilise les exemples explicitement simulés pour comprendre les mécanismes. Un vrai relevé tarifaire daté ne sera exigé que lorsqu'une activité demande une estimation réelle.

## Questions de départ

1. Un SLO sans budget d'erreur permet-il de décider quand ralentir les changements ?
2. Quelle différence fais-tu entre RTO annoncé et RTO mesuré ?
3. Si une brique IA tombe (quota, latence multipliée, réponse invalide), comment le parcours critique continue-t-il ?

## Remédiation

- SLI, SLO et budget d'erreur : [Fiabilité / SLO](../06-FIABILITE-SLO/README.md) et [la leçon sur les budgets d'erreur](../06-FIABILITE-SLO/02-sli_slo_budget_erreur.md).
- Panne injectée et reprise : [injection de panne](../06-FIABILITE-SLO/07-injection_panne.md).
- Budget cloud pédagogique : [modèle à trois échelles](06A-BUDGET-CLOUD.md) et [simulation de référence](07-RELEVE-REFERENCE-2026.md) : les données de cette simulation sont fictives et ne sont pas des tarifs actuels.

## Verdict

- **3 réponses solides** → poursuis le parcours et conserve tes réponses comme point de départ.
- **Moins de 3** → commence quand même la lecture ; reprends les ressources de remédiation avant le challenge qui demande de chiffrer et défendre un choix.

Ne copie jamais un prix de simulation dans un budget réel. Pour une décision d'achat ou de production, vérifie le tarif du fournisseur, la région, l'unité facturée et la date du relevé.

---
stability: stable
---

**SCÈNE CRAZYDEVS : Boss final :** ton architecture est plausible, ton budget est joli et ton agent IA applaudit. Puis un junior te montre une contrainte que tu n’avais pas vue. Le niveau Staff commence là.

# BELIEF-CHANGE-LOG

Une entrée doit décrire une croyance **avant** la nouvelle information. Ne réécris jamais l'état initial après coup.

## Entrée

- Date :
- Décision / croyance initiale :
- Confiance initiale (0–100) :
- Information nouvelle :
- Ce que cette information contredit :
- Nouvelle confiance (0–100) :
- Seuil qui a déclenché le changement :
- Ce que je conserve :
- Ce que j'abandonne :
- Décision révisée :
- Contre-argument que je peux encore défendre :

## Test de maturité

Explique en trois phrases pourquoi changer d'avis ici n'est ni faiblesse ni suivisme, mais une mise à jour proportionnée à la preuve.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Croyance initiale : « il faut Kafka pour absorber les événements ». Preuve nouvelle : le pic mesuré reste inférieur à 5 événements par seconde et la file déjà opérée absorbe les interruptions avec reprise vérifiée. Mise à jour : « une file simple suffit pour le périmètre actuel ; Kafka sera réévalué si le débit, la rétention ou le besoin de rejeu dépasse les capacités mesurées ». Le journal conserve l'ancienne croyance, la preuve qui l'a modifiée et le déclencheur futur.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « BELIEF-CHANGE-LOG », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

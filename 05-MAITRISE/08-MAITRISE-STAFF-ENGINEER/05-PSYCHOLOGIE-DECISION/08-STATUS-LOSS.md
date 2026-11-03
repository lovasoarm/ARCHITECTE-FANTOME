---
stability: stable
---

**SCÈNE CRAZYDEVS : Boss final :** ton architecture est plausible, ton budget est joli et ton agent IA applaudit. Puis un junior te montre une contrainte que tu n’avais pas vue. Le niveau Staff commence là.

# STATUS-LOSS : abandonner une bonne identité d'expert

Tu as présenté un ADR et obtenu l'adhésion. Un ingénieur junior découvre une contrainte non vue et propose une alternative meilleure.

## Obligatoire

1. Reconnais publiquement le point précis de ton erreur.
2. Adopte la proposition si la preuve la supporte.
3. Donne explicitement le crédit.
4. Explique ce que ton processus de décision n'avait pas capturé.
5. Ajoute un garde-fou qui réduit la probabilité de répétition.

## Preuve

Une capture de la meilleure réponse ne suffit pas. Il faut la chronologie avant / correction / reprise.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Un architecte défend publiquement une migration qu'il a proposée. Une mesure reproduite montre que le nouveau chemin augmente la latence et n'apporte pas le bénéfice annoncé. Il publie la correction, arrête le déploiement et crédite l'ingénieur qui a apporté la mesure. Il ajoute un test de performance au processus de décision. La perte de statut ressentie n'est pas utilisée comme raison pour conserver une solution réfutée.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « STATUS-LOSS : abandonner une bonne identité d'expert », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, transmission]
anti_recipe_key: solution_concurrente+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** le mur de l’interface est joli. Puis le réseau tombe. Puis le token expire. Puis le serveur répond à moitié. Bienvenue dans le vrai client.

# Pourquoi Client Systems existe

Un client est un participant distribué : il a une horloge, une mémoire locale, un réseau imparfait, une identité, une version et des utilisateurs impatients.

La question Staff n’est pas « comment faire cet écran ? » mais :

> « Quelles garanties le système doit-il encore tenir quand cet écran n’a plus son serveur idéal ? »

### À retenir

1. l’UI montre un état ; elle n’est pas la vérité absolue ;
2. le cache crée une seconde vérité temporaire ;
3. le réseau transforme une action locale en contrat distribué ;
4. la UX d’erreur est une partie de la fiabilité.

### Piège

Construire une belle UI puis ajouter `try/catch` à la fin est l’équivalent de mettre un casque à Scofield après l’évasion. Trop tard : les décisions importantes étaient déjà prises.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

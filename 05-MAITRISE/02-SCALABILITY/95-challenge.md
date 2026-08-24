---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L4
perturbation_modes: [decision_inversee, transmission]
anti_recipe_key: decision_inversee+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Challenge : `02-SCALABILITY`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-rate_limiting_minimini_projet.md](50-rate_limiting_minimini_projet.md)
- [51-message_queues_minimini_projet.md](51-message_queues_minimini_projet.md)
- [EXO LECTURE : 15-25 minutes (Scalabilite)](11-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 05-MAITRISE/02-SCALABILITY](97A-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

## Barème (12 points, 9 pour passer)

`docs/rate-limiting.md` complet, avec limite chiffrée et raisonnement écrit (3) · script de
déclenchement exécuté et réponses observées collées dans le doc (2) · `docs/log-partitionne.md`
complet, avec le rééquilibrage de partitions réellement observé (pas décrit de mémoire) (4) ·
réponse écrite à la question de vérification du rate limiting (limite en mémoire vs plusieurs
instances) (3).

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

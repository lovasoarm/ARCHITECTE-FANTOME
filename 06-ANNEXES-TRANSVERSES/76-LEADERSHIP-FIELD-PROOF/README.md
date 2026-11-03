---
stability: stable
acte: prouver-et-faire-revoir
noyau: oui
route: formation-complete
niveau: G-H
last_reviewed: 2026-10-30
---

# 76 : Leadership Field Proof Pack

## Pourquoi ce pack existe

Le leadership technique ne se démontre pas en cochant « mentorat », « alignement » ou « influence ». Il faut identifier un problème partagé, obtenir une décision avec les parties prenantes, accompagner l'adoption, mesurer les conséquences et accepter une revue indépendante.

Ce pack transforme le [73 : Technical Leadership Practicum](../73-TECHNICAL-LEADERSHIP-PRACTICUM.md) et les gates Staff/Principal en dossier de preuve réutilisable. Il n'invente pas un terrain de travail : si aucune équipe réelle n'est accessible, le dossier reste `SIMULATION / T0` et ne peut pas être présenté comme influence professionnelle.

## Route obligatoire

1. Choisir un problème qui traverse une frontière : équipe, système, produit, sécurité, opérations ou budget.
2. Établir une baseline avant l'intervention : utilisateurs/systèmes concernés, mesure initiale, période, source et biais.
3. Rédiger un RFC avec options contradictoires, y compris « ne rien changer ».
4. Obtenir les objections des personnes affectées ; conserver les désaccords et la version révisée.
5. Définir un plan d'adoption, les responsabilités, le rollback et le coût de maintien.
6. Mesurer l'usage et les effets pendant une période adaptée au système ; séparer contribution individuelle et résultat collectif.
7. Faire relire le dossier par des reviewers qui n'ont pas rédigé la décision et déclarer les conflits d'intérêts.
8. Réviser la décision lorsque les observations contredisent les hypothèses.

## Ce qui compte comme preuve

| Élément               | Preuve vérifiable                                                                                   | Ne suffit pas                                        |
| --------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Influence             | Décision adoptée par des parties prenantes, artefact utilisé par une autre équipe, trace d'adoption | Présentation, réunion, avis favorable seul           |
| Standard réutilisable | Standard versionné, exemples, propriétaire, adoption mesurée et exceptions suivies                  | Document publié sans usage                           |
| Mentorat              | Objectif initial, pratique, progression autonome observée et feedback de la personne                | Nombre de sessions ou impression du mentor           |
| Impact                | Baseline, changement, fenêtre, population, méthode, coût et limites                                 | Pourcentage sans dénominateur ou chiffre reconstruit |
| Durabilité            | Maintien, révision, incidents, transfert de propriété                                               | Déploiement ponctuel                                 |

## Périmètre des rôles

- **Staff-track preparation :** l'apprenant sait coordonner une décision technique et améliorer le travail d'un domaine ; la portée réelle doit être prouvée hors simulation.
- **Principal-track preparation :** l'apprenant sait comparer des investissements entre plusieurs systèmes/équipes et établir un standard réutilisable ; adoption et conséquences doivent être observées.
- **Distinguished-track evidence :** le dossier doit montrer une influence durable sur plusieurs systèmes, équipes ou un écosystème, avec adoption indépendante, résultats longitudinaux et plusieurs sources de corroboration. Le curriculum seul ne peut pas attribuer ce niveau.

Les intitulés varient selon les entreprises. Le pack n'est pas une grille universelle de promotion ni un certificat d'emploi.

## Conditions de validation

Un dossier peut être noté `SIMULATION`, `PERSONNEL`, `COLLABORATIF`, `EXTERNE` ou `PRODUCTION` selon les faits disponibles. Pour toute preuve utilisée dans une revendication Staff/Principal/Distinguished, fournir au moins :

- un artefact daté et versionné ;
- une baseline et une mesure après intervention ;
- les personnes/systèmes concernés, décrits sans données personnelles inutiles ;
- un avis contradictoire et la réponse de l'auteur ;
- une mesure d'adoption ou la mention explicite `NOT MEASURED` ;
- une limite d'attribution et une limite externe ;
- un reviewer indépendant avec compétence pertinente ;
- une décision finale `PASS`, `GAP` ou `NOT EVALUABLE` pour chaque critère.

Aucune note moyenne ne compense une absence de preuve d'adoption ou une attribution non justifiée.

## Modèles

- [01 : RFC contradictoire](templates/01-RFC-TEMPLATE.md)
- [02 : Journal d'adoption](templates/02-ADOPTION-LOG.md)
- [03 : Revue de mentorat](templates/03-MENTORING-REVIEW.md)
- [04 : Revue d'impact](templates/04-IMPACT-REVIEW.md)
- [05 : Revue de revendication Distinguished](templates/05-DISTINGUISHED-CLAIM-REVIEW.md)

## Gate final

Le statut `READY  : CURRICULUM` signifie que les supports, exercices et critères sont disponibles et contrôlés. Il ne signifie pas que l'apprenant a démontré la portée correspondante. Le statut `FIELD-VALIDATED` exige des preuves externes réellement obtenues et revues. Ne fusionne jamais ces deux états.

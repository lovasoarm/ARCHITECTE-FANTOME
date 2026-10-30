---
stability: perissable
acte: maitrise
noyau: oui
assessment_role: staff_mastery
freshness_registry_id: PATH:05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/12-STAFF-JUDGMENT-ARENA.md
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-04-28
review_status: a_verifier_date_absente
---

# Staff judgment arena : arbitrer quand aucune option n'est parfaite

## 1. Objet de l'épreuve

Cette arène évalue la qualité du jugement technique sous contraintes contradictoires. Une décision Staff ne se reconnaît pas au nombre de buzzwords : elle explicite objectif, faits, incertitudes, options, risques, coût, réversibilité, conséquences d'organisation et signal de réexamen.

## 2. Cadre de décision

Pour chaque décision, écrire :

1. Quel résultat utilisateur/métier doit être protégé ?
2. Quels faits sont établis, lesquels sont hypothèses ?
3. Quelles contraintes ne peuvent pas être négociées (sécurité, intégrité, loi, budget) ?
4. Quelles options sont réellement disponibles, y compris ne rien faire ?
5. Quels compromis changent coût, fiabilité, sécurité, évolutivité et capacité des équipes ?
6. Quelle décision est réversible, et comment ?
7. Quelle autorité doit accepter le risque ?
8. Quel signal déclenchera une réévaluation ?

## 3. Arena : scénario

Une plateforme historique traite les commandes, la facturation et la livraison dans une base partagée. Un lancement important exige une fonctionnalité en six semaines. Une équipe veut extraire trois microservices ; sécurité signale des privilèges trop larges ; finance signale un coût cloud croissant ; le produit demande de ne pas retarder la date.

### Options possibles

- refonte globale immédiate ;
- monolithe modulaire avec frontières renforcées ;
- extraction d'un flux isolé et mesurable ;
- report partiel du lancement ;
- dérogation temporaire bornée et approuvée, si le risque est acceptable.

Aucune option n'est toujours correcte. Tu dois demander les données qui manquent : capacité d'équipe, couplage de données, fréquence de changement, SLO, exposition sécurité, coût de migration et possibilité de retour.

## 4. Arbre de raisonnement

```text
[Résultat métier + contraintes non négociables]
                    |
                    v
             [Faits suffisants ?]
              /             \
            non             oui
            |                |
      [Mesurer / tester]     v
                       [Options + risques]
                              |
                       [Réversibilité ?]
                        /          \
                      oui          non
                      |             |
              [Expérience limitée] [Autorité + preuve forte]
                      |             |
                      +------v------+
                         [Décision]
                             |
                    [Signal de réexamen]
                             |
                    [Résultat / apprentissage]
```

## 5. Exemple de réponse

**Insuffisante :** « Il faut découper en microservices pour mieux scaler et adopter une architecture moderne. » Elle n'établit ni besoin, ni mesure, ni capacité d'exploitation.

**Solide :** « Je ne recommande pas la refonte globale en six semaines. Nous devons d'abord caractériser les invariants et le couplage. Nous isolons la frontière qui change le plus indépendamment, ajoutons tests de contrat et ownership, restreignons les privilèges, puis exécutons un pilote avec un SLO et un budget de coût. Nous définissons un seuil d'arrêt et maintenons la possibilité de revenir au chemin précédent. Si le couplage de données empêche un déploiement indépendant, nous gardons le module dans le même runtime jusqu'à preuve contraire. »

Cette réponse n'est solide que si le candidat fournit métriques, plan, responsabilités et données permettant de tester l'hypothèse.

## 6. Pièges

- Décider trop tôt avec un vocabulaire d'architecture.
- Optimiser l'autonomie de déploiement en ignorant l'astreinte.
- Promettre une scalabilité sans charge mesurée.
- Ignorer le coût de migration et de double-run.
- Confondre réversibilité de code, de configuration et de données.
- Accepter un risque sans autorité ou sans date d'expiration.
- Prendre l'absence de plainte pour une preuve de succès.

## 7. Évaluation /30

| Critère                                  | Points |
| ---------------------------------------- | -----: |
| Problème et résultat utilisateur         |      4 |
| Faits/incertitudes et données manquantes |      4 |
| Options réellement comparées             |      4 |
| Risques sécurité/fiabilité/coût          |      5 |
| Réversibilité et plan de migration       |      4 |
| Ownership et influence organisationnelle |      4 |
| Signal de réexamen et mesure             |      3 |
| Communication claire                     |      2 |

Seuil 24/30, sans zéro sur risques, réversibilité ou ownership. Deux évaluateurs doivent pouvoir identifier les faits et la logique de décision dans le dossier, sans deviner l'intention du candidat.

## 8. Preuve de maîtrise

Une décision réelle ou un exercice annoncé comme tel, ADR, alternatives rejetées, mesures avant/après, commentaires de parties prenantes et revisite datée. Une réponse de cas ne vaut pas preuve d'impact organisationnel durable.

## Manches de jugement conservées

### Manche A : Ambiguïté

Le briefing est volontairement incomplet. Produire inconnues, hypothèses, personnes affectées, décision minimale réversible et éléments qui doivent attendre.

### Manche B : Désaccord légitime

Deux options techniquement défendables sont proposées. Faire converger la décision sans invoquer un titre ; rédiger une note compréhensible aussi par un public non technique.

### Manche C : Meilleure idée externe

Une proposition d'un pair moins expérimenté, d'un contradicteur ou d'un utilisateur peut être meilleure. La preuve attendue est une modification observable du dossier, pas une déclaration d'humilité.

### Manche D : Coût politique

Recommander une action techniquement correcte mais socialement coûteuse (abandon, réduction de scope, gel ou migration). Expliciter le coût humain/organisationnel accepté et comment il est pris en charge.

### Manche E : Décision sans IA parfaite

L'IA est partiellement fiable. Décider ce qui peut être délégué, ce qui doit être vérifié et quand arrêter l'automatisation.

**Condition de passage :** chaque manche laisse une trace dans `PREUVES/STAFF-JUDGMENT.md` selon la chaîne `contexte → options → décision → coût accepté → signal de révision → résultat → révision éventuelle`. Le résultat doit être relu par un pair et revisité à distance.

<!-- AF-P0-2026-10-30: missing_transfer -->

### Transfert : changer de contexte

Applique le mécanisme de « Staff judgment arena : arbitrer quand aucune option n'est parfaite » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

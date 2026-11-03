---
stability: intemporel
acte: maitrise
noyau: oui
assessment_role: staff_mastery
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "PREUVES-STAFF-ENGINEER.md"
source_scope: "Arène d’évaluation interne du jugement Staff, reliée au référentiel de preuves ; elle ne confère aucun titre externe."
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

### Transfert : changer de contexte

Applique le mécanisme de « Staff judgment arena : arbitrer quand aucune option n'est parfaite » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Staff judgment arena : arbitrer quand aucune option n'est parfaite** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Arbitrer un cas sans option parfaite

**Mission liée à « Staff judgment arena : arbitrer quand aucune option n'est parfaite » :** Choisis un cas de l’arène Staff Kintana. Compare options, risques asymétriques, réversibilité, impact inter-équipes et données manquantes ; tranche puis annonce ce qui ferait changer la décision.

**Livrable :** Dossier d’arbitrage et défense orale courte.

**Critères d’acceptation :** Le choix est traçable ; les risques minoritaires sont conservés ; la consultation et l’approbation sont distinctes ; les critères de révision sont définis.

**Transfert obligatoire :** Un nouveau fait change le classement des options : révise explicitement la décision.

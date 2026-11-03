---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, defaut_cache]
anti_recipe_key: fausse_piste+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Santé mentale & rythme du dev

Temps de lecture ~10 min

Le burnout dev est réel. Le curriculum ce parcours = ~250h. Faux rythme = tu abandonnes en mois 3.

## SIGNAUX D'ALARME

- Tu ouvres VSCode et tu n'as envie de rien.
- Tu relis 3 fois la même ligne sans la comprendre.
- Tu es agressif avec les gens qui te posent une question simple.
- Tu ne dors plus ou tu dors trop.

Si 2 de ces signaux durent > 1 semaine : **STOP le curriculum 5 jours.** Sport, sommeil, gens. Reviens frais.

## LE RYTHME QUI DURE

- Max 2h focus deep par jour. Le reste = pratique/lecture légère.
- Pomodoro 25/5. Pas de session > 90 min sans lever le nez.
- 1 jour OFF par semaine, écran ZÉRO.
- Sommeil non négociable : 7h minimum. Zéro dette.

## L'ANTI-COMPARAISON

Un dev senior a mis 10 ans à devenir senior. Tu ne rattrapes pas ça en 6 mois. Compare-toi à TOI d'il y a 30 jours, pas au dev Twitter qui poste 3 side-projects par mois.

## (attention) SI TU SATURES

Arrête. Fais autre chose 48h. Le curriculum t'attend. La motivation revient. Le burnout, non.

## RESSOURCE

Si tu ressens une détresse : contacte un pro. Ce fichier n'est pas un substitut.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une personne constate qu'après trois soirées de travail tardif, elle relit le même bug sans progresser. Elle note pendant une semaine l'heure de début/fin, les pauses et le type de tâche, puis observe que les erreurs de concentration augmentent après plusieurs heures sans interruption. Elle déplace les tâches exigeantes plus tôt, prévoit des pauses et arrête de traiter la fatigue comme un manque de volonté. **Résultat attendu :** une organisation plus soutenable ; ce relevé n'est ni un diagnostic médical ni une règle universelle.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Santé mentale & rythme du dev » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:learning -->

## Repère visuel utile : Rappel actif et transfert

```text
Lire -> masquer la leçon -> rappeler
                         |
                         v
                   pratiquer Kintana
                         |
                         v
                   comparer au test
                         |
                +--------+--------+
                v                 v
             corriger          expliquer
                |                 |
                +--------+--------+
                         v
                   transfert différé
```

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Santé mentale & rythme du dev** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « Santé mentale & rythme du dev » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.

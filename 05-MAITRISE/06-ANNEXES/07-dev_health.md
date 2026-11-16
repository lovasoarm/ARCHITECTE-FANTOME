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

<!-- AF-DIAGRAM:work_sustainability -->

## Repère visuel utile : ajuster une charge soutenable

```text
contraintes et temps réellement disponible
                  |
                  v
       planifier un périmètre réaliste
                  |
                  v
   observer charge, pauses et interruptions
                  |
                  v
      comparer prévu / vécu / résultat
                  |
         +--------+--------+
         v                 v
     réduire scope      adapter rythme
         |                 |
         +--------+--------+
                  v
         réévaluer sans culpabiliser
```

Ce schéma sert à ajuster l'organisation du travail. Il ne constitue ni un outil de diagnostic ni une règle médicale.

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** Un travail durable dépend d'une charge compatible avec le temps, l'énergie, les contraintes personnelles et les conditions de travail réelles.
- **Quand l’utiliser / quand l’éviter :** Utilise cette annexe pour observer ton organisation, ajuster ton périmètre et demander du soutien quand nécessaire. Ne l'utilise pas pour diagnostiquer ta santé ou juger celle d'un collègue.
- **Limites :** Les besoins et capacités varient d'une personne à l'autre. Les signaux cités ne sont pas un diagnostic ; un relevé personnel ne remplace pas l'aide d'un professionnel en cas de détresse ou de difficulté persistante.

## Mécanisme : la version sans magie

Compare la charge planifiée au temps réellement disponible, repère les sources de surcharge, choisis une adaptation limitée (réduire le périmètre, déplacer une tâche exigeante, ajouter une pause ou demander de l'aide), puis observe si elle améliore la soutenabilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Santé mentale & rythme du dev** se rattache à l'organisation d'une itération : le périmètre prévu doit rester compatible avec le temps de travail réellement disponible et les imprévus, sans faire de la surcharge un indicateur d'engagement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : construire un rythme de travail soutenable

**Mission liée à « Santé mentale & rythme du dev » :** prends une semaine de travail ou d'étude ordinaire. Note uniquement les données que tu souhaites conserver : créneaux prévus et réels, taille des tâches, interruptions, pauses et éléments qui ont déplacé le plan. Repère un écart récurrent et propose une seule adaptation concrète pour la semaine suivante (réduire le périmètre, déplacer une tâche, ajouter une marge ou demander un soutien). Tu n'as pas à révéler d'information médicale ou personnelle.

**Livrable :** `RYTHME-TRAVAIL.md` avec un planning anonymisé, les limites de temps disponibles, les écarts prévus/réels, une adaptation choisie et un retour après une semaine. Un exemple fictif est accepté s'il est marqué `SIMULATION`.

**Critères d’acceptation :** le plan reste réaliste ; les signaux sont décrits comme des observations et non des diagnostics ; aucune norme horaire universelle n'est imposée ; l'adaptation réduit une source de surcharge identifiable ; la confidentialité est respectée.

**Transfert obligatoire :** une semaine comporte un imprévu majeur. Ajuste le périmètre et explique ce que tu reportes, délègues ou abandonnes au lieu de compenser automatiquement par davantage d'heures. Si une détresse ou difficulté persiste, le document rappelle de consulter un professionnel adapté.

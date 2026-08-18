---
stability: intemporel
acte: pilotage
noyau: oui
---

# EXERCICE : LA PANNE SUBIE (ET NON CHOISIE)

Durée : 45 min, chronomètre obligatoire.

## Protocole

1. Écris six pannes sur six papiers : base injoignable, disque plein, dépendance externe en timeout,
   certificat expiré, migration ratée, fuite mémoire lente.
2. Tire au sort. **Tu ne choisis pas.** C'est tout l'exercice : on ne s'entraîne jamais sur son
   scénario préféré.
3. Provoque-la réellement en environnement de test (coupe le service, remplis le disque avec un
   fichier, révoque le certificat).
4. Chronomètre : détection → diagnostic → rétablissement.

## Interdits pendant l'exercice

- Regarder le papier avant d'avoir observé un symptôme.
- Corriger sans avoir écrit l'hypothèse. Une ligne : « je pense que X parce que j'observe Y ».

## Rendu

`PANNE-<date>.md` : la panne tirée, les trois délais mesurés, les hypothèses fausses (elles comptent
autant que la bonne), et l'action de détection ajoutée. Ce fichier est une pièce de la famille S3.

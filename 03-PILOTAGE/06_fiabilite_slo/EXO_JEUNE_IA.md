---
stability: intemporel
acte: produire
---

# EXO [JEUNE IA] : 03-PILOTAGE/06_fiabilite_slo : le SLO sans IA

Temps de lecture ~2 min

> Tag `[JEUNE IA]` : IA totalement coupee (Copilot, Claude, ChatGPT desactives).
> Duree : 60 min chrono. Mode de verification : critere binaire du `verification_pack` de ce module ([verification_pack/criteres.md](verification_pack/criteres.md)). Jamais une IA.

## Pourquoi ici et pas ailleurs

Tu t'es deja entraine a decider seul sur du code. Sur une architecture et sur un chiffrage, la dependance a l'IA est plus couteuse et surtout invisible : une reponse plausible et fausse ne plante pas, elle se defend en reunion pendant six mois. Ce module est exactement l'endroit ou l'ecart doit etre mesure.

## Protocole en trois temps, sans exception

**Temps 1 : produire seul (35 min).** IA coupee de bout en bout. Produis le SLI, le SLO et le budget d'erreur d'un parcours critique du fil rouge, plus le seuil d'alerte qui en decoule et ce que tu degrades en premier quand le budget est consomme. Ecris ton hypothese de depart avant de produire, dans `HYPOTHESES.md`, horodatee.

**Temps 2 : demander la meme chose a une IA (10 min).** Meme enonce, mot pour mot, sans lui montrer ta production. Conserve sa reponse telle quelle dans un fichier a cote de la tienne.

**Temps 3 : ecrire les trois ecarts (15 min).** En dix lignes maximum, nomme les trois ecarts les plus importants et, pour chacun, qui a raison, avec une justification chiffree. Cherche notamment : un SLI que l'IA mesure cote serveur quand tu le mesures cote client (ou l'inverse), un objectif chiffre different, et un ordre de degradation different.

Chiffre a comparer explicitement : budget d'erreur en requetes par semaine dans les deux versions.

## Preuve a livrer

- ta production seule, horodatee avant la reponse de l'IA ;
- la reponse de l'IA, non modifiee ;
- `ECARTS.md` : trois ecarts, trois verdicts, trois justifications chiffrees.

Un `ECARTS.md` ou l'IA a raison trois fois sur trois sans que tu expliques pourquoi tu t'es trompe est non recevable : ce n'est pas un aveu, c'est une abdication.

## Verdict

Correction par les drills du [verification_pack](verification_pack/criteres.md) de ce module, jamais par l'IA. Binaire : les trois ecarts sont nommes et chiffres, ou l'exercice est non reussi.

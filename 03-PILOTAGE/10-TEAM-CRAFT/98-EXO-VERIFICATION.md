---
stability: stable
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# EXO : Vérifier une IA séduisante

stability: intemporel
acte: pratiquer

---

# EXO [IA séduisante] : 03-pilotage/10-team-craft

Temps de lecture ~2 min

> Tag `[IA séduisante]` : IA totalement coupée (IA/Claude/ChatGPT desactives).
> Duree : 45 min chrono. Auto-verifiable par le `97-CHECKPOINT-PACK` du module.

## Consigne

Sans aucune assistance solution, sans autocomplétion générative, redige de memoire un mini-drill couvrant le concept-cle du module (definition d'une ligne, exemple minimal runnable, un piege classique qui casse). Ecris le critere binaire de reussite (une commande `node learner-verifier.js`, une sortie attendue exacte), puis lance-le.

## Critere de reussite (deterministe)

```bash
node learner-verifier.js
# doit sortir avec code 0 et afficher "OK"
```

binaire : soit la sortie matche caractere pour caractere ton attendu, soit non. Pas de zone grise.

## Preuve a livrer

- ta `learner-verifier.js` (aucun import solution, aucune completion generative acceptee).
- capture d'ecran de ton editeur avec solution/IA off.
- ton `HYPOTHESES.md` si tu as bloque > 10 min.
- ton `02-TDD-JOURNAL.md` optionnel : temps ecoule, blocages, ce que tu as du re-comprendre.

## Auto-evaluation (a cocher honnetement)

- [ ] solution coupee de bout en bout (0 completion, 0 chat).
- [ ] critere binaire passe en < 45 min.
- [ ] Je peux expliquer le concept a un debutant en 3 minutes, sans notes.

## Pourquoi c'est vital

Ecrire une revue de code, un ADR ou une PR message sans IA, c'est verifier que tu peux formuler une decision technique clairement pour un humain. l'IA parle a tout le monde ; toi tu dois parler a TON equipe.

## Preuve tracable (proof-of-work)

L'auto-evaluation ci-dessus repose sur ton honnetete. Pour transformer ca en preuve horodatee : demarre un chrono visible (`date` avant + `date` apres), colle les deux timestamps + un SHA256 de ta solution (`shasum -a 256 learner-verifier.js`) dans un fichier `FASTING.md` a cote de la solution. C'est ta ligne de progression : relis-la dans 3 mois pour voir la courbe.

---

3. Ensuite seulement, tu ouvres l'editeur.

Un exo `[IA séduisante]` sans ces deux artefacts ecrits **avant** le premier
caractere de code est considere invalide par le `97-CHECKPOINT-PACK`.

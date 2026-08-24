---
stability: stable
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# EXO : Vérifier une IA séduisante

stability: intemporel
acte: pratiquer

---

# EXO [IA séduisante] : 01-cadrage/03-debugging

Temps de lecture ~2 min

> Tag `[IA séduisante]` : solution totalement coupee (IA/Claude/ChatGPT desactives).
> Duree : 45 min chrono. Auto-verifiable par le `97-CHECKPOINT-PACK` du module.
> Convention ce parcours : le `drill_2` est le niveau intermediaire de chaque `97-CHECKPOINT-PACK`, assez concret pour prouver la comprehension du concept-cle, sans etre un simple exercice de decouverte.

## Consigne

Sans aucune assistance solution, sans autocomplétion générative, redige de memoire un mini-drill couvrant le concept-cle du module (definition d'une ligne, exemple minimal runnable, un piege classique qui casse). Ecris le critere binaire de reussite (une commande `node learner-verifier.js`, une sortie attendue exacte), puis lance-le.

## Critere de reussite (deterministe)

```bash
node learner-verifier.js
# doit afficher exactement : drill 2 OK
```

binaire : soit la sortie matche caractere pour caractere, soit non. Pas de zone grise. Ecris toi-meme le `console.log('drill 2 OK')` final quand ton drill valide toutes ses assertions internes.

## Livrable

- ta `learner-verifier.js` (aucun import solution, aucune completion generative acceptee).
- capture d'ecran de ton editeur avec solution/IA off.
- ton `HYPOTHESES.md` si tu as bloque > 10 min.
- ton `02-TDD-JOURNAL.md` optionnel : temps ecoule, blocages, ce que tu as du re-comprendre.

## Auto-evaluation (a cocher honnetement)

- [ ] solution coupee de bout en bout (0 completion, 0 chat).
- [ ] critere binaire passe en < 45 min.
- [ ] Je peux expliquer le concept a un debutant en 3 minutes, sans notes.

## Pourquoi c'est vital

Le debugging, c'est une methode : reproduire, isoler, formuler une hypothese, la refuter. l'IA peut te souffler du code, elle ne peut pas mener l'enquete a ta place. Ce IA séduisante verifie que tu es capable de tenir cette methode a froid.

## Preuve tracable (proof-of-work)

L'auto-evaluation ci-dessus repose sur ton honnetete. Pour transformer ca en preuve horodatee : demarre un chrono visible (`date` avant + `date` apres), colle les deux timestamps + un SHA256 de ta solution (`shasum -a 256 learner-verifier.js`) dans un fichier `FASTING.md` a cote de la solution. C'est ta ligne de progression : relis-la dans 3 mois pour voir la courbe.

---

3. Ensuite seulement, tu ouvres l'editeur.

Un exo `[IA séduisante]` sans ces deux artefacts ecrits **avant** le premier
caractere de code est considere invalide par le `97-CHECKPOINT-PACK`.

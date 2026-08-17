---
stability: intemporel
acte: restituer
---

# 17_polyglot_forge

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~2 min


Deuxième mini-projet cross-language de MyFunnyJS. Prouve que ta modélisation de l'event loop **transfère** d'un langage à l'autre en produisant strictement la même trace pour la même entrée.

- Lis `cahierdescharges.md` pour l'objectif verrouillé et la grille scorée.
- Lis `ADR/ADR-001_choix_langage_secondaire.md` avant de coder.
- Remplis `TDD_JOURNAL.md` au fil de l'eau.
- Rédige `POSTMORTEM.md` à la fin, même si tu as réussi.

Lance :
```bash
bash tests/run_all.sh
```

Attendu : `POLYGLOT PARITY OK`.

---
stability: intemporel

---

## REPRODUCTIBILITÉ

Installation canonique : `npm ci` (pas `npm install`). `npm ci` respecte strictement le `package-lock.json` : deux personnes qui clonent obtiennent exactement les mêmes versions. Committe toujours ton `package-lock.json`. Sans lui, un `npm install` 3 mois plus tard installera d'autres versions et tu debug un fantôme.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `02-CONSTRUCTION/02_mini_projects/17_polyglot_forge` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_SPEC_DRIFT.md](00_SPEC_DRIFT.md)
- [POSTMORTEM.md](POSTMORTEM.md)
- [RULES.md](RULES.md)
- [SECURITY.md](SECURITY.md)
- [SECURITY_GATE.md](SECURITY_GATE.md)
- [SPEC_DRIFT_TRIGGERS.md](SPEC_DRIFT_TRIGGERS.md)
- [TDD_JOURNAL.md](TDD_JOURNAL.md)
- [cahierdescharges.md](cahierdescharges.md)
- [ADR/](ADR/README.md)

<!-- CONTENU-DOSSIER:fin -->

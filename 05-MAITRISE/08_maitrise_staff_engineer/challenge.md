---
stability: intemporel
acte: maitrise
noyau: oui
type: challenge
---

# CHALLENGE FINAL : ASSEMBLER LE DOSSIER UNIQUE

Durée : 1 h 30 (assemblage seulement — les pièces existent déjà).

## Consigne

Tu n'écris aucun contenu neuf. Tu **assembles** et tu **contrôles**.

1. Ouvre les sept pièces de [../../PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).
2. Vérifie que chaque chemin cité dans ton dossier existe réellement dans ton dépôt.
3. Vérifie que chaque chiffre apparaît de façon **identique** partout où il est cité. Un chiffre qui
   diffère entre deux sections invalide les deux.
4. Écris la table des matières et le résumé d'une demi-page en tête, lisible par un non-technique.
5. Fais lire la section 6 à une personne non technique, et note sa reformulation mot pour mot.

## Contrôle automatique conseillé

```bash
grep -rno "[0-9][0-9.,]* *\(€\|ms\|Go\|%\)" DOSSIER.md | sort -k2 | uniq -c | sort -rn | head
```

Repère les nombres orphelins : un nombre cité une seule fois dans tout le dossier est souvent un
nombre non recoupé.

## Barème (12 points, 10 pour passer)

Neuf sections présentes (3) · sept pièces liées et existantes (3) · cohérence des chiffres (3) ·
résumé compréhensible sans jargon (3).

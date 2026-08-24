---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, solution_concurrente]
anti_recipe_key: decision_organisationnelle+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Exercice : auditer ta propre supply chain

<!-- AF-DIAGRAM:supply_chain -->

```text
text
Application
   │
   ▼
Direct dependency
   │
   ▼
Transitive dependency
   │
   ▼
Maintainer / Registry
   │
   └────► compromise / update / CVE
```

La supply chain étend la surface de risque au-delà des dépendances que le projet consomme directement.

Temps de lecture ~40 min

Un dev qui n'inspecte pas ses `node_modules` empoisonnera sa boîte à la première
`postinstall` malveillante. Cet exercice est OBLIGATOIRE avant de valider ce module.

---

## MISSION (sur un mini-projet à toi)

1. `npm audit --production` → note nombre de vulnérabilités par sévérité.
2. `npm ls --all | wc -l` → nombre total de packages transitifs (souvent > 500).
3. Choisis 3 dépendances directes de ton `package.json`. Pour chacune :

- qui est le mainteneur ? (github handle, dernière activité)
- poids réel installé (`du -sh node_modules/<pkg>`)
- présence d'un script `postinstall` (`node -e "console.log(require('./node_modules/<pkg>/package.json').scripts)"`)

4. Génère un SBOM CycloneDX :
   `npx @cyclonedx/cyclonedx-npm --output-file sbom.json`
5. Ajoute dans ton `09-DEPENDENCY_LEDGER.md` une section "Supply chain check" avec
   date, résultats, décisions prises (retirer un package, épingler une version,
   remplacer par une alternative plus légère).

---

## LES 3 SIGNAUX QUI DOIVENT DÉCLENCHER UN REMPLACEMENT

- Dernier commit du mainteneur > 12 mois.
- Un seul mainteneur, sans backup.
- `postinstall` qui exécute du code arbitraire (voir historique event-stream, colors.js).

---

## POURQUOI C'EST NON-NÉGOCIABLE

En 2026, la première ligne d'attaque n'est plus ton code : c'est ton graphe de
dépendances. Un dev qui n'audite jamais sa supply chain est une porte d'entrée
gratuite. Un dev qui l'audite mensuellement est un asset défensif reconnu.

Livrable : ce fichier apparaît coché dans `09-DEPENDENCY_LEDGER.md`, avec date, sbom
attaché au repo, et 1 décision documentée.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

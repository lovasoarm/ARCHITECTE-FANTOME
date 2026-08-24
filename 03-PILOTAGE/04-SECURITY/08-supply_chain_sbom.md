---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# 09 : Supply chain & SBOM

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

Temps de lecture ~5 min

> **Principe universel** : ton code n'est pas seul. Chaque `npm install` est une **décision de confiance** envers des inconnus.

## Histoire à connaître

- **xz backdoor (2024)** : un mainteneur patient a injecté une backdoor dans `xz-utils`, prête à toucher OpenSSH sur des millions de serveurs. Découverte par accident, à 0.5s de latence près.
- **event-stream (2018)** : dépendance transitive, mainteneur cède le repo à un inconnu, injection de code volant du Bitcoin.
- **lockfile poisoning** : un attaquant modifie ton `package-lock.json` avec des tarballs custom.

## Concepts

- **SBOM** (Software Bill Of Materials) : la liste **complète** de ce que tu embarques, transitives incluses. `npm sbom`.
- **Provenance & signatures** : `npm publish --provenance` prouve que le paquet vient bien du repo annoncé.
- **Pin & audit** : `package-lock.json` versionné + `npm audit` régulier + revue des updates majeures.

## Exercice : audit un lockfile fictif

On te donne `package-lock.json.audit` (voir dossier). Trouve :

- 1 dépendance transitive **suspecte** (nom typosquatté).
- 1 tarball dont l'URL ne pointe pas vers le registre officiel.
- 1 paquet abandonné depuis 3 ans.

## Livrable

`AUDIT.md` avec les 3 trouvailles + reco de remédiation par ordre de priorité.

## (attention) Piège

`npm audit` te rassure. Il **ne détecte que ce qui est déjà signalé**. Zero-day supply chain = angle mort.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

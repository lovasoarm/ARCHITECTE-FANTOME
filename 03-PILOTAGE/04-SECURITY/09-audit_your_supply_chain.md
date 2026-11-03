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

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Exercice : auditer ta propre supply chain** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « Exercice : auditer ta propre supply chain » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.

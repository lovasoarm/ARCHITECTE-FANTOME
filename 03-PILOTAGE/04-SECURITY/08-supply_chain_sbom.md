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

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **09 : Supply chain & SBOM** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « 09 : Supply chain & SBOM » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.

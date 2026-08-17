---
stability: perissable_2027
acte: restituer
---

> **CE MODULE RÉUTILISE** : fiabilité et SLO (06_fiabilite_slo), observabilité (05_observability), sécurité (04_security), runtime (02-CONSTRUCTION/13_runtime_env), architecture (02-CONSTRUCTION/14_architecture_patterns). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **OÙ CE MODULE EST RECROISÉ** : au palier [04-EPREUVE](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md), le budget cloud chiffré ici est un livrable obligatoire du capstone, croisé avec le SLO (famille S3, [06_fiabilite_slo](../06_fiabilite_slo/00_why_fiabilite_slo.md)) et l'ADR d'architecture (famille S2, [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md)) : tenir un SLO plus strict coûte plus cher, et ce chiffre doit apparaître dans l'ADR. Recroisé au palier [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), où le même budget doit être défendu face à une contrainte de réduction imposée.

# POURQUOI CE MODULE MÉRITE TON TEMPS : LES FONDATIONS CLOUD

Tu sais faire tourner ton code sur ta machine et tu sais le surveiller. Ce module répond à la question qu'on te posera en entretien d'architecte et en réunion de direction : combien ça coûte par mois, qui a le droit d'y toucher, et qu'est-ce qui se passe quand une zone tombe. Le cloud n'est pas un sujet d'outil : c'est un sujet de facture, de rayon d'impact et de droits d'accès.

Note importante : les noms de services changent tous les deux ans, les catégories, non. On raisonne ici par catégorie, avec les noms AWS, GCP et Azure donnés en repère, pas comme une leçon de fournisseur.

## 1. LES SIX CATÉGORIES QUI COUVRENT 90% DES BESOINS

```
   calcul --> stockage --> base de données --> réseau --> identité --> observabilité
```

| Catégorie | Ce que ça fait | AWS | GCP | Azure |
| --- | --- | --- | --- | --- |
| Calcul | exécuter ton code | EC2, Lambda | Compute Engine, Cloud Run | VM, Functions |
| Stockage objet | garder des fichiers | S3 | Cloud Storage | Blob Storage |
| Base managée | garder des données structurées | RDS | Cloud SQL | Azure SQL |
| Réseau et diffusion | router et rapprocher | VPC, CloudFront | VPC, Cloud CDN | VNet, Front Door |
| Identité et droits | qui a le droit de quoi | IAM | IAM | Entra ID |
| Observabilité | voir ce qui tourne | CloudWatch | Cloud Monitoring | Monitor |

Cycle mental : intuition, puis code, puis technique, puis risque.

Intuition : dans Avengers, chaque membre a une capacité et un périmètre. Personne ne demande à Hulk de piloter un jet furtif. Le cloud, c'est pareil : chaque service fait une chose, et l'erreur classique est de prendre le service le plus puissant pour la tâche la plus banale.

```js
// minimal : un fichier ne se stocke pas dans une base
await storage.put("rapports/2026-08.pdf", buffer);
```

```js
// réaliste : la base garde le pointeur, pas le contenu
await db.insert("rapports", { chemin: "rapports/2026-08.pdf", taille: buffer.length });
```

```js
// qui casse : le PDF stocké en base en base64
await db.insert("rapports", { contenu: buffer.toString("base64") });
// la table gonfle, les sauvegardes passent de 2 minutes à 3 heures,
// et la facture de la base managée triple pour du contenu que le
// stockage objet aurait gardé pour quelques centimes.
```

## 2. LE MODÈLE DE COÛT : CE QUI SE FACTURE VRAIMENT

Quatre lignes suffisent à expliquer 90% d'une facture surprise :

1. Le calcul se facture au temps allumé, pas au temps utile. Une machine oubliée coûte autant qu'une machine utile.
2. Le stockage se facture au volume ET aux opérations. Un million de petites lectures coûte parfois plus cher que le stockage lui-même.
3. La sortie de données (egress : ce qui quitte le cloud) se facture, l'entrée souvent pas. C'est la ligne que personne n'anticipe.
4. Les services managés se facturent à la disponibilité promise. Passer de une à trois zones multiplie le coût, pas de 3 mais souvent de 2,2 : c'est ce chiffre qu'il faut calculer avant de promettre un SLO.

```
budget mensuel = calcul + stockage + opérations + egress + managé
```

Risque réel : un budget cloud non chiffré n'est pas neutre : il est simplement payé par quelqu'un d'autre, qui te le reprochera au premier trimestre serré. Le module [05-MAITRISE/06_annexes/03_finops_greenops.md](../../05-MAITRISE/06_annexes/03_finops_greenops.md) creuse la partie FinOps, ce module te fait produire le chiffre.

## 3. SÉCURITÉ CLOUD : LE MOINDRE PRIVILÈGE, ET LE SECRET QUI NE SE COMMITTE PAS

Trois règles, apprises par tout le monde de la même manière douloureuse :

- **Moindre privilège** : un rôle reçoit exactement les droits de sa tâche, jamais "administrateur, on verra plus tard". Le "plus tard" n'arrive jamais.
- **Secrets hors du dépôt** : un secret vit dans un gestionnaire de secrets, avec rotation. Un secret dans un `.env` commité reste dans l'historique même après suppression.
- **Chiffrement au repos et en transit** : par défaut, pas sur demande. Ce qui n'est pas chiffré par défaut ne le sera jamais rétroactivement.

```js
// qui casse : la clé dans le code, "juste pour tester"
const cle = "sk_live_9f3..."; // partie de l'historique git pour toujours
```

Croisement direct avec le module [04_security](../04_security/00_why_security.md) : OWASP couvre l'application, ce module couvre l'infrastructure qui la porte. Les deux failles les plus fréquentes en 2026 sont un bucket de stockage ouvert et un rôle trop permissif : aucune des deux n'est une faille de code.

## 4. RAYON D'IMPACT ET ZONES

Une **zone de disponibilité** est un centre de données. Une **région** en regroupe plusieurs. Trois questions à te poser pour chaque composant :

1. Si cette zone tombe, qu'est-ce qui s'arrête pour l'utilisateur.
2. Combien de temps avant de revenir (ton RTO du module précédent).
3. Combien coûte le fait de ne pas s'arrêter du tout.

```
mono-zone   : moins cher, s'arrête avec la zone
multi-zone  : plus cher, survit à une zone
multi-région: beaucoup plus cher, survit à une région, complexité forte
```

Risque réel : le multi-région choisi par confort mental, sans SLO qui l'exige, multiplie la facture et la complexité pour un besoin que personne n'a formulé.

## 5. EXERCICES

**Exercice 1 : la facture de ton fil rouge (25 min).** Chiffre ton projet à trois échelles : 100 utilisateurs, 10 000, 1 000 000. Une ligne par catégorie de la section 1. Le but n'est pas d'être exact au centime : c'est de repérer quelle ligne explose en premier.

**Exercice 2 : le procès du rôle admin (15 min).** Liste chaque composant de ton projet qui a besoin d'accéder à une ressource. Écris pour chacun la permission minimale exacte. Chaque fois que tu écris "toutes les opérations", justifie en une phrase, ou réduis.

**Exercice 3 : le prix d'une neuvième (20 min).** Prends ton SLO écrit au module [06_fiabilite_slo](../06_fiabilite_slo/00_why_fiabilite_slo.md). Chiffre ce que coûterait de passer de 99% à 99,9%. Écris la phrase que tu dirais au commanditaire : "cette neuvième supplémentaire coûte X par mois, et voici ce qu'elle évite".

## RÉSUMÉ

Le cloud se raisonne par catégories stables, pas par noms de services périssables. Une facture se compose de calcul, stockage, opérations, sortie de données et disponibilité promise : la sortie de données est la ligne oubliée. La sécurité cloud se joue sur les droits et les secrets, pas sur le code applicatif. Le rayon d'impact se décide en même temps que le SLO, parce que chaque neuvième supplémentaire a un prix qu'on peut écrire.

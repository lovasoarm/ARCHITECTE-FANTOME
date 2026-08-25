---
stability: stable
acte: comprendre
noyau: oui
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : apprenti ninja IA :** l’outil te présente un plan magnifique en 30 secondes. Très bien. Maintenant prouve qu’il n’est ni surdimensionné, ni dangereux, ni coûteux.

# L’ORDRE DE BATAILLE : ARCHITECTE-FANTOME

Temps de lecture ~6 min

> **Une seule route. Une seule carte. Un seul cerveau.**
> Tu apprends les fondations, tu construis, tu exploites, tu subis une épreuve, puis tu démontres que
> tu sais décider et transmettre. Les annexes sont des instruments de navigation, pas un second cursus.

## 1. Fil public canonique

```text
00-SOCLE
  ↓
01-CADRAGE
  ↓
02-CONSTRUCTION
  ↓
03-PILOTAGE
  ↓
04-EPREUVE
  ↓
05-MAITRISE
```

Le fil rouge commence au cadrage et ne disparaît jamais. Les notions anciennes reviennent sous de
nouvelles contraintes ; cette répétition est volontaire.

## 2. Règles de navigation

1. Ouvre le `README.md` du palier avant le premier module.
2. Dans un module, lis `00-PREREQUIS.md` ou son équivalent, puis `README.md`, puis les leçons.
3. Une pratique doit produire un artefact avant qu’un Boss puisse la compter comme acquise.
4. `99A-PONT.md` ferme un module et donne la transition vers le suivant.
5. `PROGRESSION.md` est l’interface de suivi ; `18-COMPTEURS-DU-PARCOURS.md` est l’autorité des compteurs.
6. `PREUVES-STAFF-ENGINEER.md` décrit les preuves attendues ; il ne certifie jamais que l’apprenant les possède.

### 03-PILOTAGE : renforcement 2026

Après `07-CLOUD-FOUNDATIONS`, le parcours réutilise le cloud dans `12-PLATFORM-ENGINEERING` : GitOps, dérive, Internal Developer Platform, golden paths et plateforme comme produit. Cette étape ne remplace ni la sécurité ni l’observabilité ; elle les assemble au niveau multi-équipe.

`08-PRODUIT-COUT-ROI` contient également un lab de décision CMS : couplé vs headless vs custom, avec coût, sécurité et migration. Le CMS est traité comme cas d’architecture produit, jamais comme technologie centrale.

### 02-CONSTRUCTION : Client Systems

`21-CLIENT-SYSTEMS-FLUTTER` applique les invariants backend au client : état, cache, offline, contrats, auth, observabilité et performance. Flutter est un terrain d’application ; la compétence de sortie est la pensée système client.

## 3. Repères du parcours

| Élément                       | Valeur |
| ----------------------------- | -----: |
| Paliers obligatoires          |      6 |
| Modules pédagogiques directs  |     54 |
| Mini-projets                  |     19 |
| Pièces `99-PORTAGE-MENTAL.md` |     38 |
| Familles Staff                |  S1–S6 |
| Preuve transversale obligatoire | S7 |

## 4. Carte des mini-projets

Les 19 mini-projets forment une montée en difficulté :

`fondations → état/async → cache/API → temps réel → legacy → concurrence/mémoire → système distribué → transfert → discernement IA → supervision IA`.

Leur rôle n’est pas de remplacer le fil rouge : ils servent successivement de terrain d’automatisation, de debug, de transfert, d’intégration et de preuve.

## 5. Cartographie Staff

```text
S1  systèmes / backend / cloud
S2  architecture / DDD / contrats / arbitrage
S3  sécurité / fiabilité / observabilité
S4  produit / coût / valeur / décision
S5  leadership / mentorat / communication
S6  IA / automatisation / supervision
S7  transfert transversal multi-langage + multi-fournisseur
              ↓
        fil rouge + capstone
              ↓
      dossier unique + défense
```

La couche de **maturation décisionnelle** du palier `08-MAITRISE-STAFF-ENGINEER` ajoute une exigence différente : l’apprenant doit montrer comment il change d’avis, encaisse la contradiction, reconnaît une erreur, arbitre sous pression et compense ses propres biais.

## 6. Prérequis et topologie

Une relation `CE MODULE RÉUTILISE` doit toujours être satisfaite dans l’ordre public. Si un module suppose une compétence non encore acquise, retourne au prérequis avant de poursuivre.

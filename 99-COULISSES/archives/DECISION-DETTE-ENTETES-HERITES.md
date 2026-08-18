---
stability: perissable_2027
acte: évaluer
---

# Decision : les en-tetes herites incomplets sont une dette assumee, datee et plafonnee

Date de la decision : 2026-08-18 — LOT 5, point 4 du plan de correction.

## Le fait mesure

Le controle de livraison signale des fichiers `.md` sans cle `stability:` et/ou sans cle
`acte:` dans leur en-tete YAML. Ce sont des fichiers **herites** de ProjectFunny et de
MyFunnyJS, absorbes lors de la fusion. Un avertissement porte sur une cle : un fichier sans
les deux cles compte donc pour deux avertissements.

Mesure du jour, produite par la commande, jamais saisie a la main :

```bash
node 99-COULISSES/outillage/controle_livraison.mjs
```

## La decision, tranchee

**On ne rajoute pas les en-tetes en masse.** Poser mecaniquement `stability:` et `acte:` sur
des centaines de fichiers herites reviendrait a declarer une stabilite et un acte
pedagogique que personne n'a relus : ce serait une metadonnee fausse, donc pire que la
metadonnee absente. Un audit ne se paie pas en champs remplis au hasard.

La dette est donc **assumee**, avec trois garde-fous opposables :

1. **Plafond ferme.** Le nombre d'avertissements d'en-tete ne peut plus augmenter. Le plafond
   declare est inscrit ci-dessous, et le controle de livraison **refuse** la livraison si la
   mesure le depasse. Tout fichier neuf porte donc ses deux cles, sans exception.
2. **Sens unique.** Le plafond ne se releve jamais. Quand des en-tetes sont relus et
   completes, on abaisse le plafond a la nouvelle mesure, dans le meme commit.
3. **Peremption.** Cette decision est perissable en 2027 : sa relecture est portee par
   [06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md](../../06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md).

## Plafond declare

<!-- PLAFOND-ENTETES: 686 -->

Plafond : **686** avertissements d'en-tete. Mesure du 2026-08-18 : 686. Marge : 0.

Un fichier ajoute sans ses deux cles fait passer la mesure a 687 et la livraison est refusee
(regle 1 de `99-COULISSES/outillage/controle_livraison.mjs`, test de morsure joue le
2026-08-18).

## Ce que cette dette coute, dit franchement

Les fichiers concernes ne declarent pas leur duree de vie : ils ne remontent pas dans l'index
de perissabilite ([05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md](../../05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md))
avec la meme finesse que les fichiers annotes. C'est un manque de tri, pas un mensonge : aucun
de ces fichiers ne porte de chiffre perissable non source, la regle des montants sourcees
(A5) etant appliquee independamment de l'en-tete.

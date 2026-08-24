## perishability_id: PER-0069

stability: perissable
acte: epreuve
noyau: oui
cognitive_level: L4
perturbation_modes: [changement_echelle, temps_limite]
anti_recipe_key: changement_echelle+temps_limite
transfer_distance: medium
assessment_role: diagnostic_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Semaine à double dérive : technique ET roadmap, en même temps

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

<!-- AF-DIAGRAM:capstone -->

```text
text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

Jusqu'ici, le capstone bouge **une** contrainte à la fois (spec, ou charge, ou pannes).
Cette semaine les deux bougent **ensemble**. Si tu ne traites qu'un axe, tu échoues.

Durée : **5 jours ouvrés**, chronométrés. Fil rouge uniquement. Pas un projet jouet.

## Les deux dérives (imposées, simultanées)

### A : Dérive technique (le système lâche)

Au matin du jour 1, tire **une** panne réelle (même protocole que
[07-injection_panne.md](../../03-PILOTAGE/06-FIABILITE-SLO/07-injection_panne.md)) **et**
applique un facteur **×10** sur une latence mesurée (proxy, flag, ou quota IA).
Le produit doit rester utilisable en dégradé. Trace obligatoire : `traceId`, statut machine,
coût pendant la panne.

### B : Dérive de roadmap (le métier lâche)

Le même jour, une contrainte produit arrive **par écrit** (tu la tires au sort, tu ne la
choisis pas) :

1. la feature phare est **coupée** (régulateur, budget, ou client unique perdu) ;
2. **ou** une feature refusée au MVP devient **non négociable** pour un contrat de 30 jours ;
3. **ou** le délai de livraison est **divisé par deux**.

Tu mets à jour `DECISION-ARBITRAGE.md` le jour 1 : valeur, coût, risque, **ce qui sort du
scope**, chiffre du refus. Sans ce fichier le soir du jour 1, la semaine est nulle.

## Ce que tu ne fais pas

- Traiter A puis B « quand tu auras le temps » : les deux coexistent dès 12 h le jour 1.
- « On verra la roadmap après le hotfix » : c'est exactement le flou d'avant cette leçon.
- Inventer une troisième dérive pour diluer.

## Livrables (un dépôt, cinq fichiers datés)

| Fichier                 | Contenu                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `DERIVE-A.md`           | panne, injection, RTO chrono, fallback utilisateur             |
| `DERIVE-B.md`           | contrainte tirée, scope coupé, coût du refus                   |
| `DECISION-ARBITRAGE.md` | mis à jour **deux fois** (j1 et j5)                            |
| `SLO.md`                | budget d'erreur consommé par A ; si B casse le SLO, tu l'écris |
| `NOTE-DIRECTION.md`     | une page, les deux dérives, zéro jargon non expliqué           |

## Verdict

Réussi si, le vendredi : le parcours critique marche en dégradé **et** la roadmap écrite
n'est plus celle du lundi, avec un chiffre sur chaque coupe.

Échec : une des deux dérives n'a laissé aucune trace datée, ou le produit est down sans
statut métier, ou la spec a bougé « dans ta tête » seulement.

<!-- DECISION-UNIQUE:debut -->

## Une seule décision rendue

Les deux dérives se disputent le même temps : elles ne se traitent donc pas séparément. Tu rends
**une seule décision**, écrite dans `DECISION-DOUBLE-DERIVE.md` de ton dépôt de projet fil rouge.
Elle dit ce que tu abandonnes, ce que tu tiens, et le critère qui a tranché.

Deux décisions séparées ne comptent pas : elles montrent que tu n'as pas vu que les deux dérives
tirent sur la même semaine.

- [ ] **Construire** : `DECISION-DOUBLE-DERIVE.md` existe, daté, une seule décision rendue.
- [ ] **Expliquer** : tu la racontes en cinq lignes à quelqu'un qui n'a pas suivi la semaine.
- [ ] **Justifier** : le critère d'arbitrage est écrit, l'option écartée est nommée.
- [ ] **Défendre** : le contradicteur attaque l'abandon, tu réponds par écrit.

<!-- DECISION-UNIQUE:fin -->

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

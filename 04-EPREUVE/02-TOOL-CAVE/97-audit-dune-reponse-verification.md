---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Audit d'une réponse IA

Temps de lecture ~7 min

## Le piège

Quatre réponses solution suivent : plausibles, bien écrites, formatées proprement, et fausses
d'une manière que la relecture rapide ne voit pas. Le code tourne, un test naïf passe. Ton
travail n'est pas de corriger le code : c'est d'écrire, pour chaque cas, l'hypothèse
silencieuse posée à ta place, et la preuve qu'elle est fausse (mesure, contre-exemple, ou
requête de vérification lançable en dix minutes).

## Ce qui se passe vraiment

Une IA générative complète l'IA le plus probable, pas le problème réel. Quand ton
solution sous-spécifie une contrainte (volume, idempotence, historique, règle de répartition),
le modèle choisit l'hypothèse la plus fréquente de son corpus, souvent une hypothèse de
démo. Cette hypothèse n'est écrite nulle part : elle est encodée dans l'absence d'un
`LIMIT`, d'une clé d'idempotence, d'une table d'archive, ou dans le choix d'une clé de
répartition parmi d'autres. Le code a l'air complet parce qu'il répond littéralement à la
question posée. Il est incomplet parce que ta question réelle était plus large.

```text
solution sous-specifie
        |
        v
Modele choisit l'hypothese statistiquement la plus commune
        |
        v
Reponse plausible, bien formatee, teste "passe" sur cas moyen
        |
        v
Hypothese fausse pour TON cas --> incident en prod, souvent differe dans le temps
```

Analogie : relire une réponse IA sans vérifier ses hypothèses, c'est accepter un plat envoyé
en salle sans y goûter parce qu'il est bien dressé, et c'est larguer les amarres parce que la
météo affichée à quai avait l'air bonne.
Où l'analogie casse : un plat mal assaisonné se corrige en trente secondes, une mauvaise
météo se voit vite au large. Un bug d'hypothèse silencieuse en facturation reste invisible
pendant des semaines avant qu'on le remarque.

## Méthode de démontage

Pour chaque cas, réponds par écrit, dans cet ordre :

1. **L'hypothèse silencieuse** : une phrase vérifiable ("le modèle suppose que X"), jamais
   un défaut vague ("le code n'est pas robuste").
2. **La preuve** : une mesure, un contre-exemple concret, ou une requête de vérification que
   tu lancerais avant de toucher au code.
3. **La correction minimale** : une phrase, pas une réécriture complète.

Ne lis le corrigé qu'après avoir écrit tes quatre réponses. Un corrigé lu avant l'effort ne
forme rien.

---

## Cas A : la requête qui explose à 100 000 lignes

### l'IA

```text
j'ai une table `reservations` (id, client_id, court_id, date_debut, date_fin, statut) dans
un club d'escalade avec plusieurs sites. Je veux la liste des réservations actives
aujourd'hui, avec le nom du client et le nom du site, pour l'écran d'accueil.
```

### La réponse IA

```sql
SELECT
  r.id,
  c.nom AS client_nom,
  c.prenom AS client_prenom,
  s.nom AS site_nom,
  r.date_debut,
  r.date_fin,
  r.statut
FROM reservations r
JOIN clients c ON c.id = r.client_id
JOIN courts co ON co.id = r.court_id
JOIN sites s ON s.id = co.site_id
WHERE r.statut = 'active'
ORDER BY r.date_debut ASC;
```

"Cette requête joint réservations, clients et sites, filtre sur les réservations actives
et trie par date. Directement utilisable dans ton écran d'accueil."

### Consigne de démontage

Le club a huit ans d'historique et le statut `'active'` n'est jamais recalculé
automatiquement : il reste `'active'` tant que personne ne le change à la main.

1. L'hypothèse silencieuse sur la relation entre "statut actif en base" et "actif
   aujourd'hui".
2. La preuve : à combien de lignes cette requête peut-elle monter, et pourquoi l'écran
   d'accueil se met à ramer.
3. La requête de vérification à lancer en premier pour confirmer l'ampleur du problème.

---

## Cas B : la reprise sur erreur qui double un débit bancaire

### l'IA

```text
Dans mon système de tournées de livraison, un chauffeur valide un paiement à la livraison
via une API externe. Si l'appel échoue ou time-out, je veux relancer automatiquement le
paiement au prochain passage dans une zone couverte. Écris la fonction TypeScript.
```

### La réponse IA

```typescript
type PaymentAttempt = {
  deliveryId: string;
  amountCents: number;
  customerId: string;
};

async function chargeCustomer(
  attempt: PaymentAttempt,
): Promise<{ success: boolean }> {
  try {
    const result = await paymentGateway.charge({
      customerId: attempt.customerId,
      amountCents: attempt.amountCents,
    });
    return { success: result.status === "ok" };
  } catch (err) {
    console.error(
      `Paiement echoue pour livraison ${attempt.deliveryId}, nouvelle tentative programmee`,
      err,
    );
    return { success: false };
  }
}

async function retryFailedPayments(pending: PaymentAttempt[]): Promise<void> {
  for (const attempt of pending) {
    const result = await chargeCustomer(attempt);
    if (result.success) {
      await markDeliveryAsPaid(attempt.deliveryId);
    }
    // Si echec, la livraison reste en attente : reprise automatique
    // au prochain cycle de retryFailedPayments.
  }
}
```

"Si le paiement échoue, la livraison reste non payée et sera reprise au prochain passage.
Le client n'est débité qu'une fois que la passerelle répond `ok`."

### Consigne de démontage

Le time-out réseau survient régulièrement dans les zones rurales mal couvertes, exactement
le terrain visé par cette fonction.

1. L'hypothèse silencieuse sur ce que signifie un `catch` déclenché par un time-out.
2. Le contre-exemple : la séquence exacte d'événements qui aboutit à débiter deux fois le
   même client pour la même livraison.
3. La requête à écrire pour vérifier si ce double débit s'est déjà produit sur les trente
   derniers jours.

---

## Cas C : la migration qui perd l'historique

### l'IA

```text
Dans ma bibliothèque de club d'escalade, chaque exemplaire de topo a un statut
(`disponible`, `emprunte`, `perdu`). Je veux un état `en_reparation` et un historique des
changements de statut. Écris la migration SQL.
```

### La réponse IA

```sql
BEGIN;

CREATE TABLE statut_historique (
  id SERIAL PRIMARY KEY,
  exemplaire_id INTEGER NOT NULL REFERENCES exemplaires(id),
  ancien_statut TEXT,
  nouveau_statut TEXT NOT NULL,
  change_le TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE exemplaires
  DROP CONSTRAINT exemplaires_statut_check;

ALTER TABLE exemplaires
  ADD CONSTRAINT exemplaires_statut_check
  CHECK (statut IN ('disponible', 'emprunte', 'perdu', 'en_reparation'));

COMMIT;
```

"Cette migration crée `statut_historique` et élargit la contrainte `CHECK`. Le système est
prêt pour tracer les futurs changements."

### Consigne de démontage

L'équipe a demandé "un historique des changements de statut", pas "un historique à partir
d'aujourd'hui". Des exemplaires ont déjà changé de statut plusieurs fois, information qui
n'existe que dans les logs d'audit applicatifs, jamais rejouée ici.

1. L'hypothèse silencieuse sur la définition du mot "historique" du solution.
2. La preuve : pourquoi un rapport calculé dans trois mois sera faux pour tout exemplaire
   créé avant la migration, même avec un code applicatif futur parfait.
3. La requête de vérification, avant de merger, pour compter les exemplaires dont
   l'historique n'est capturé nulle part ailleurs que dans des logs difficiles à rejouer.

---

## Cas D : la répartition de coûts fondée sur une hypothèse silencieuse

### l'IA

```text
j'ai un immeuble avec des appartements de tailles différentes et un chauffage collectif. Je
veux répartir le coût mensuel du chauffage entre les appartements. Écris la fonction
TypeScript.
```

### La réponse IA

```typescript
type Appartement = {
  id: string;
  surfaceM2: number;
};

function repartirCoutChauffage(
  couttotalCents: number,
  appartements: Appartement[],
): Map<string, number> {
  const surfaceTotale = appartements.reduce((sum, a) => sum + a.surfaceM2, 0);

  const repartition = new Map<string, number>();
  for (const appt of appartements) {
    const part = appt.surfaceM2 / surfaceTotale;
    const montant = Math.round(couttotalCents * part);
    repartition.set(appt.id, montant);
  }

  return repartition;
}
```

"Cette fonction répartit le coût au prorata de la surface, méthode la plus courante pour
ce genre de calcul."

### Consigne de démontage

L'immeuble a des appartements bien exposés et d'autres mal isolés côté nord, avec une
consommation réelle très différente à surface égale. Le règlement de copropriété prévoit
40% au prorata de la surface, 60% au prorata de la consommation mesurée par des
répartiteurs de frais de chauffage.

1. L'hypothèse silencieuse sur la clé de répartition correcte, et pourquoi l'IA ne la
   contredit pas explicitement alors qu'elle est fausse ici.
2. Le contre-exemple : deux appartements de même surface, consommation mesurée très
   différente, calcule ce que chacun paierait avec cette fonction et ce qu'il devrait payer
   selon le règlement réel.
3. Le document ou la mesure à aller chercher en premier pour convaincre quelqu'un pressé de
   ne pas livrer cette fonction telle quelle.

---

## APRÈS TENTATIVE

Aucun corrigé n’est distribué dans la release apprenant. Une correction séparée est détenue côté instructeur.

## Ce que tu dois savoir défendre

- Pour le Cas B, explique pourquoi une clé d'idempotence côté passerelle est une meilleure
  correction qu'un simple `try/catch` autour de `retryFailedPayments` : dis ce que chacune
  des deux garantit réellement quand le même appel part deux fois.
- Donne un exemple d'hypothèse silencieuse que tu as toi-même laissée passer dans une réponse
  d'IA récente, et montre comment la méthode de démontage de ce niveau (hypothèse, preuve,
  vérification, correction minimale) te l'aurait fait détecter avant de livrer.
- Explique pourquoi une réponse d'IA plausible mais fausse est plus dangereuse qu'une réponse
  d'IA qui plante bruyamment, et ce que ça change dans ta façon de relire du code généré.

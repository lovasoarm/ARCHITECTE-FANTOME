---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# 13 : Secrets : stockage, rotation, fuite

<!-- AF-DIAGRAM:secrets -->

```text
text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

Temps de lecture ~9 min

> **Principe universel** : un secret n'est pas une valeur, c'est un **droit d'accès daté**.
> La bonne question n'est jamais « où le ranger ? » mais « en combien de temps je le remplace
> quand il fuit ? ».

Le module traite déjà l'authentification ([05-auth_flows.md](05-auth_flows.md)) et le hachage
des mots de passe ([06-hashing_bcrypt.md](06-hashing_bcrypt.md)). Ici, il s'agit d'autre chose :
les clés que **ton service** utilise pour parler aux autres : base de données, fournisseur de
paiement, API du modèle. Personne ne les tape au clavier, donc personne ne les surveille.

## 1) Où vit un secret

```text
Jamais            : dans le code, dans le dépôt, dans une capture d'écran, dans un ticket.
Acceptable en solo : variables d'environnement de la plateforme d'hébergement,
                     fichier .env local ignoré par git, jamais commité.
Cible              : un magasin de secrets (Vault, AWS Secrets Manager, GCP Secret Manager,
                     Doppler...) qui distribue à l'exécution et journalise chaque lecture.
```

Ce que le magasin apporte et que `.env` n'apporte pas : **la trace de lecture** et **la
rotation sans redéploiement**. Sans trace, après une fuite tu ne peux pas répondre à « qui l'a
lu, quand » : et c'est exactement la question qu'on te posera.

## 2) La rotation : une date, pas une intention

Un secret sans date d'expiration est un secret éternel : il survivra à ton départ. Écris la
règle dans le dépôt, pas dans ta tête.

| Secret                      | Durée de vie | Rotation                        | Coût d'une rotation ratée         |
| --------------------------- | ------------ | ------------------------------- | --------------------------------- |
| Clé d'API fournisseur       | 90 jours     | automatique, chevauchement 24 h | appels refusés côté fournisseur   |
| Mot de passe de base        | 180 jours    | manuel, fenêtre de maintenance  | service à l'arrêt                 |
| Jeton de déploiement        | 30 jours     | automatique                     | pipeline bloqué                   |
| Clé de signature de session | 365 jours    | manuel, double clé acceptée     | tous les utilisateurs déconnectés |

**La règle qui évite la coupure** : toute rotation se fait à **deux clés valides en même
temps**. On publie la nouvelle, on laisse les deux acceptées le temps que tout le parc bascule,
on retire l'ancienne, et seulement là on considère la rotation faite. Une rotation qui
remplace la clé d'un coup est une panne planifiée.

```js
// Accepter deux clés pendant la fenêtre de bascule : la nouvelle signe, les deux vérifient.
const CLES = [process.env.SESSION_KEY_NEW, process.env.SESSION_KEY_OLD].filter(
  Boolean,
);

function signer(charge) {
  return signerAvec(CLES[0], charge); // on signe toujours avec la plus récente
}

function verifier(jeton) {
  // La clé sortante reste acceptée jusqu'à la fin de la fenêtre : sinon, déconnexion générale.
  return CLES.some((cle) => verifierAvec(cle, jeton));
}
```

## 3) L'incident : un secret est parti dans un commit

Le réflexe faux : `git commit --amend`, force-push, et on n'en parle plus. Le secret est déjà
public : sur GitHub, il est indexé en quelques secondes, et les robots l'essaient avant que tu
aies fini ton café. **Réécrire l'historique n'invalide rien.**

Ordre imposé, chronomètre en main :

1. **Révoquer** le secret exposé chez le fournisseur. C'est la seule action qui coupe l'accès.
2. **Émettre** le remplaçant et le déployer via le magasin de secrets.
3. **Chercher l'abus** : journaux du fournisseur, entre l'heure du commit et l'heure de la
   révocation. Combien d'appels, depuis quelles adresses, pour quel montant.
4. **Nettoyer** l'historique (`git filter-repo`, purge des caches du forge) : utile, mais en
   quatrième position, jamais en première.
5. **Post-mortem** : pourquoi le secret est arrivé là, et quel garde-fou l'empêchera demain
   (pré-commit `gitleaks`, `.gitignore` durci, secret jamais lisible en clair par un humain).

## Exercice (45 min) : la fuite, en vrai

Sur ton dépôt fil rouge :

1. Fabrique la fuite volontairement : crée une **clé d'API jetable** chez un fournisseur
   gratuit, commite-la dans une branche locale `fuite-exercice`. Note l'heure exacte.
2. Fais tourner un détecteur dessus : `npx gitleaks detect --source . --no-banner`. Il doit
   sortir la ligne, le fichier et le commit. S'il ne trouve rien, ta règle de détection est le
   vrai problème : corrige-la avant de continuer.
3. Joue les cinq étapes ci-dessus **dans l'ordre**, en notant l'heure de chacune.
4. Installe le garde-fou : un hook de pré-commit qui refuse le commit si le détecteur trouve
   quelque chose. Prouve qu'il fonctionne en réessayant la même fuite : le commit doit échouer.

## Livrable

`REVUE-SECURITE.md` dans ton dépôt fil rouge, section « Secrets » :

- l'inventaire de tes secrets, un par ligne, avec magasin, durée de vie, mode de rotation ;
- le récit daté de l'exercice de fuite : heure du commit, heure de la révocation, **délai en
  minutes entre les deux** ;
- ce que les journaux du fournisseur montraient sur cette fenêtre (zéro appel est une réponse
  valable, à condition de l'avoir vérifié) ;
- le garde-fou installé, avec la commande qui prouve qu'il refuse la fuite.

Ce fichier est la pièce S3 attendue par
[PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md). Il se complète en
[12-chiffrement_repos_transit.md](12-chiffrement_repos_transit.md) et
[13-autorisation_rbac.md](13-autorisation_rbac.md).

## (attention) Piège

Le chiffre qui compte n'est pas « as-tu un vault », c'est **ton délai de révocation**. Une
équipe avec un `.env` et une révocation en 4 minutes est plus sûre qu'une équipe avec un vault
et une révocation en 3 jours, parce que la deuxième n'a jamais fait l'exercice.

## Où l'analogie casse

On compare volontiers un secret à une clé de maison : faux sur un point décisif. Une clé
volée oblige le voleur à se déplacer ; une clé d'API volée est utilisée par mille machines à
la fois, dans la minute, depuis n'importe où. Le temps de réaction n'est pas du même ordre.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

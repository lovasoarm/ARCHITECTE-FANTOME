---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# 14 : Chiffrement : au repos, en transit, et les clés

Temps de lecture ~9 min

> **Principe universel** : chiffrer déplace le problème vers la clé. Une donnée chiffrée dont
> la clé dort à côté n'est pas protégée, elle est **rangée**.

Trois questions, jamais une seule : qu'est-ce qui est chiffré, contre quel adversaire, et qui
détient la clé.

## 1) En transit

TLS partout, y compris entre tes propres services. L'argument « c'est un réseau interne » est
celui qui a coûté le plus cher à l'industrie : un réseau interne est un réseau où l'attaquant
n'a plus besoin de chiffrer ses écoutes.

```text
Minimum tenable :
- TLS 1.2 au plancher, 1.3 par défaut
- HSTS activé (le navigateur refuse le repli en clair)
- certificats renouvelés automatiquement, avec alerte à J-15 (pas J-1)
- pas de terminaison TLS « puis HTTP en clair » sur les derniers mètres sans le dire dans l'ADR
```

Contre quoi cela protège : l'écoute et la modification sur le chemin. Contre quoi cela ne
protège pas : le serveur lui-même, tes journaux, ta base. Beaucoup d'équipes s'arrêtent au
cadenas du navigateur et croient l'affaire close.

## 2) Au repos

| Niveau             | Ce qui est chiffré  | Adversaire couvert                 | Adversaire non couvert      |
| ------------------ | ------------------- | ---------------------------------- | --------------------------- |
| Disque / volume    | tout le disque      | vol de matériel, disque non effacé | toute requête applicative   |
| Base entière (TDE) | fichiers de la base | copie de sauvegarde volée          | requête `SELECT` légitime   |
| Colonne            | un champ précis     | administrateur base, fuite de dump | code applicatif autorisé    |
| Bout en bout       | avant l'envoi       | ton propre service                 | l'appareil de l'utilisateur |

La colonne de gauche coûte de moins en moins cher à activer et de plus en plus cher à
exploiter. Le chiffrement de colonne casse le tri, la recherche partielle et les index :
c'est un choix d'architecture, pas une case à cocher. Il se justifie ligne à ligne : numéro de
carte, donnée de santé, pièce d'identité : pas « sur toute la base, par prudence ».

```js
// Chiffrement de colonne : AES-256-GCM. Le nonce est unique par écriture, jamais réutilisé,
// et l'étiquette d'authentification (tag) est stockée avec : sans elle, on déchiffre du faux.
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

export function chiffrer(clair, cle /* 32 octets, sortie du KMS */) {
  const nonce = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", cle, nonce);
  const corps = Buffer.concat([c.update(clair, "utf8"), c.final()]);
  // On stocke les trois morceaux : sans nonce ni tag, la donnée est perdue, pas protégée.
  return { nonce, corps, tag: c.getAuthTag(), version_cle: 3 };
}

export function dechiffrer({ nonce, corps, tag }, cle) {
  const d = createDecipheriv("aes-256-gcm", cle, nonce);
  d.setAuthTag(tag); // si la donnée a été modifiée, final() jette : c'est le comportement voulu
  return Buffer.concat([d.update(corps), d.final()]).toString("utf8");
}
```

Le champ `version_cle` n'est pas décoratif : sans lui, tu ne peux pas changer de clé sans
réécrire toute la table d'un coup. Avec lui, tu déchiffres avec l'ancienne, tu rechiffres avec
la nouvelle, à ton rythme.

## 3) Les clés

La clé de données ne se balade pas : elle est elle-même chiffrée par une clé maîtresse tenue
par un KMS (Cloud KMS, AWS KMS, Vault Transit). C'est l'**enveloppe** :

```text
KMS (clé maîtresse, ne sort jamais)
  chiffre -> clé de données (DEK), stockée chiffrée à côté des données
                chiffre -> les données

Rotation de la clé maîtresse : on rechiffre les DEK. Les données ne bougent pas.
Rotation d'une DEK          : on rechiffre les données de ce périmètre, par version_cle.
```

Trois règles non négociables : la clé maîtresse ne sort jamais du KMS en clair ; les accès au
KMS sont journalisés ; une sauvegarde chiffrée dont la clé est perdue est une sauvegarde
détruite : donc la restauration se **teste**, chronomètre en main, comme le RTO de
[06-FIABILITE-SLO](../06-FIABILITE-SLO/01-00-why-fiabilite-slo.md).

## Exercice (45 min)

Sur ton dépôt fil rouge, choisis **un** champ réellement sensible de ton modèle de données.

1. Écris en trois lignes contre quel adversaire tu le protèges. Si tu ne sais pas le nommer,
   ne chiffre pas : tu ajouterais de la complexité sans destinataire.
2. Chiffre-le en colonne avec le code ci-dessus, la clé venant d'une variable d'environnement
   (le KMS viendra plus tard ; le `version_cle`, lui, est là dès maintenant).
3. Mesure ce que tu perds : reprends une requête existante qui filtrait ou triait sur ce
   champ, et note en millisecondes l'avant/après, ou la fonctionnalité que tu dois abandonner.
4. Fais une rotation : passe `version_cle` de 1 à 2 sur la moitié des lignes, et vérifie que
   l'application lit correctement les deux versions **en même temps**.
5. Restaure une sauvegarde chiffrée sur une base vide et relis une ligne. Chronomètre.

## Livrable

Section « Chiffrement » de `REVUE-SECURITE.md` : le champ retenu et l'adversaire nommé, le
coût mesuré à l'étape 3, la preuve que deux versions de clé cohabitent, et le temps de
restauration constaté. Un tableau des trois niveaux (transit, repos, colonne) avec ce que tu
as activé et ce que tu as sciemment laissé de côté : et pourquoi.

## (attention) Piège

`AES-ECB`, les nonces réutilisés et le « chiffrement maison » perdent tous pour la même
raison : ils laissent passer la **structure** de la donnée. Deux valeurs identiques y donnent
deux chiffrés identiques, et une base médicale se relit alors sans clé, juste en comptant les
répétitions.

## Où l'analogie casse

Le coffre-fort : commode, puis trompeur. Un coffre protège même quand le propriétaire dort ;
une base chiffrée au repos est, elle, **déchiffrée en permanence** pour servir le trafic. Sur
un serveur en marche, la clé est en mémoire : le chiffrement au repos protège le disque volé,
pas le service compromis.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

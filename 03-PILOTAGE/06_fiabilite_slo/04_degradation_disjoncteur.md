# 04 : DÉGRADER PLUTÔT QUE TOMBER, AVEC DISJONCTEUR, CLOISONS ET REPLI

Temps de lecture ~12 min

Un service qui répond partiellement garde ses utilisateurs. Un service qui répond en 30 secondes puis échoue les perd, et emmène ses voisins avec lui. Cette leçon relie directement les mécanismes async du module [01-CADRAGE/02_async](../../01-CADRAGE/02_async/00_why_async.md) au budget d'erreur de ce module.

## 1. LE TIMEOUT : LA PREMIÈRE LIGNE, ET CELLE QU'ON OUBLIE

Sans timeout, un appel lent devient un appel infini, et un appel infini immobilise une ressource jusqu'à saturation complète.

```js
// qui casse : aucun timeout, la panne du voisin devient la tienne
const reponse = await fetch(urlPaiement);
```

```js
// minimal : une limite explicite
const reponse = await fetch(urlPaiement, { signal: AbortSignal.timeout(2000) });
```

```js
// réaliste : le budget de temps se répartit sur toute la chaîne
// si la requête entrante doit répondre en 3 s, aucune dépendance n'a droit à 3 s
const budgetMs = 3000;
const paiement = await fetch(urlPaiement, { signal: AbortSignal.timeout(budgetMs * 0.4) });
const stock = await fetch(urlStock, { signal: AbortSignal.timeout(budgetMs * 0.3) });
```

## 2. LE RETRY QUI SOIGNE ET LE RETRY QUI TUE

Trois conditions, non négociables, avant d'ajouter un réessai :

1. L'opération est **idempotente** : la rejouer deux fois donne le même résultat.
2. L'attente est **exponentielle avec du bruit aléatoire**, sinon tous les clients reviennent au même instant.
3. Le nombre d'essais est **borné**, et l'échec final est traité comme un cas normal.

```js
// qui casse : retry immédiat, non borné, sur une opération non idempotente
while (true) { try { return await debiter(compte, 50); } catch {} }
// résultat possible : trois débits, une seule commande, et une panne amplifiée
```

```
sans bruit aléatoire : 1000 clients réessaient à t+1s --> nouvelle panne
avec bruit aléatoire : la charge se répartit sur 1 à 3 s --> le service respire
```

## 3. LE DISJONCTEUR : ARRÊTER D'APPELER CE QUI EST TOMBÉ

Trois états, comme un fusible : fermé (tout passe), ouvert (on n'appelle plus, on répond dégradé), semi-ouvert (on laisse passer un essai pour tester le retour).

```js
if (disjoncteur.ouvert()) return reponseDegradee();   // 20 ms, réponse partielle
const r = await appeler();                            // sinon, appel réel
disjoncteur.enregistrer(r.ok);
```

Intuition : dans un immeuble, le disjoncteur ne répare pas le court-circuit. Il empêche l'incendie de gagner les autres étages, et il laisse le temps de comprendre.

## 4. CLOISONNEMENT ET FILE D'ATTENTE BORNÉE

Le **cloisonnement** consiste à réserver des ressources séparées par dépendance : si le service de recommandations sature son pool de 5 connexions, il ne prend pas les 50 connexions du parcours d'achat.

Une **file bornée** refuse tôt plutôt que d'accepter tard :

```js
if (file.taille > 100) return { statut: 503, retryApres: 5 }; // refus rapide et honnête
```

Un refus en 5 ms est une meilleure expérience qu'une réponse en 40 s, et il protège le budget d'erreur au lieu de le brûler par la latence.

## 5. LE REPLI : DÉCIDER À FROID CE QU'ON AFFICHE QUAND ÇA CASSE

| Fonction | Réponse dégradée acceptable | Décidée par |
| --- | --- | --- |
| Recommandations | liste des 10 articles populaires, en cache | produit |
| Recherche | résultats du cache, avec mention "résultats de 2 min" | produit |
| Paiement | aucun repli : échec explicite et immédiat | direction |
| Brique IA | réponse générique + escalade humaine | produit et conformité |

Règle : la ligne "aucun repli" est une décision aussi respectable que les autres, à condition d'être écrite. Ce qui n'est pas acceptable, c'est de découvrir en incident que personne n'avait tranché.

Risque réel : un repli silencieux qui sert des données périmées sans le dire produit un incident invisible, plus coûteux qu'une panne franche parce que personne ne le détecte avant la réclamation client.

## 6. EXERCICES

**Exercice 1 : la chasse aux appels nus (20 min).** Liste tous les appels sortants de ton projet fil rouge. Pour chacun : timeout ? retry idempotent ? repli écrit ? Chaque case vide est une ligne de travail.

**Exercice 2 : le tableau des replis (20 min).** Reproduis le tableau de la section 5 pour ton projet, et nomme pour chaque ligne la personne qui a validé le repli. Si c'est toi partout, écris-le : c'est une information sur ton bus factor.

**Exercice 3 : la panne provoquée (30 min).** Coupe volontairement une dépendance de ton projet, en local. Mesure ce que voit l'utilisateur, et en combien de temps. Compare avec ce que tu croyais.

## RÉSUMÉ

Chaque appel sortant a un timeout dérivé du budget de temps de la requête entrante. Un retry n'est légitime que sur une opération idempotente, avec attente exponentielle bruitée et bornée. Le disjoncteur protège le voisinage, le cloisonnement empêche une dépendance de tout consommer, la file bornée refuse tôt. Le repli de chaque fonction se décide à froid, y compris quand la décision est "pas de repli".

## ET APRÈS

L'[épreuve de panne subie](05_panne_subie_sur_fil_rouge.md) : ce module t'a fait lire comment un système dégrade, elle te fait le vérifier en le cassant toi-même. Puis le grimoire [grimoire.md](grimoire.md) fige le vocabulaire, et le [challenge](challenge.md) te fait produire le fichier `SLO.md` de ton projet.

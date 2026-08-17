# 05 : Le spike borné

Temps de lecture ~8 min

Un spike est une expérience technique courte destinée à réduire une inconnue, pas à livrer une fonctionnalité. Non borné, il avale un sprint entier sans qu'on sache jamais s'arrêter. Borné, il a un budget de temps fixé avant de commencer et un critère d'arrêt explicite : ce qui, une fois observé, met fin au spike, qu'il ait réussi ou non.

```
spike NON borné : "on regarde si telle lib tient la charge"
                  --> 3 semaines plus tard, personne n'a de réponse claire

spike BORNÉ : budget 2 jours, critère d'arrêt :
              "on sait si la lib tient 500 req/s en mémoire stable,
               ou on sait qu'on ne le sait pas encore avec ce budget"
```

## Gabarit de fiche de spike

| Champ | Contenu |
| --- | --- |
| Question | Qu'est-ce qu'on ne sait pas et qui bloque une décision ? |
| Budget de temps | Un chiffre fixé avant de commencer, jamais réévalué en cours de route |
| Critère d'arrêt succès | Ce qu'on observe qui confirme qu'on peut avancer |
| Critère d'arrêt échec | Ce qu'on observe qui dit qu'on abandonne cette piste |
| Livrable | Une réponse écrite, pas du code de production |

Explication technique : le critère d'arrêt est ce qui distingue un spike d'un sprint déguisé. Sans lui, "on n'a pas encore fini d'explorer" devient une phrase qu'on répète indéfiniment.

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** Un spike borné est une expérience dont le budget et les deux critères d'arrêt sont écrits avant la première ligne de code. Son livrable est une réponse écrite, jamais du code destiné à survivre.

**Pourquoi.** Un spike non borné ne se termine pas : il se transforme en implémentation, puis en implémentation à moitié faite qu'on hésite à jeter, puis en fonctionnalité livrée sans avoir été décidée. C'est le chemin le plus courant par lequel un prototype devient un module critique, et personne ne peut dire à quel moment la décision a été prise, parce qu'elle ne l'a jamais été.

**Quand.** Uniquement quand une inconnue bloque une décision. Si tu connais déjà la réponse, tu ne fais pas un spike, tu fais une démonstration : c'est légitime, mais cela s'appelle autrement et cela ne se budgète pas de la même façon.

**Comment, en cinq gestes.**

1. Écris la question sous forme interrogative fermée, avec un chiffre dedans. "Est-ce que cette bibliothèque tient 500 messages par seconde avec une mémoire stable ?" est une question de spike. "Est-ce que cette bibliothèque est bien ?" n'en est pas une.
2. Fixe le budget en jours-homme, avant de commencer, et annonce-le à l'équipe. Un budget non annoncé n'engage personne.
3. Écris le critère d'arrêt succès avec sa mesure et son seuil.
4. Écris le critère d'arrêt échec, qui est le champ que tout le monde oublie : sans lui, le spike ne peut que réussir, donc il durera aussi longtemps qu'il faudra pour réussir.
5. À la fin du budget, écris la réponse et supprime le code. La suppression fait partie du protocole, pas de la propreté optionnelle.

## SCHÉMA : LES DEUX SORTIES D'UN SPIKE BORNÉ

```
 question fermee + chiffre
          |
   budget fixe (ex. 2 j)
          |
   +------+---------------------------+
   |                                  |
 seuil atteint                  budget epuise
   |                                  |
   v                                  v
"OUI, mesure a l'appui"     "NON, ou NON CONCLUANT
 -> decision + ADR            avec ce budget"
 -> on jette le code         -> decision : on renonce,
                                on rebudgete UNE fois,
                                ou on change de question
```

## EXEMPLE MINIMAL

```js
const spike = {
  question: "la file X tient-elle 500 msg/s avec p99 < 200 ms ?",
  budgetJours: 1,
  arretSucces: "500 msg/s pendant 10 min, p99 < 200 ms, memoire stable",
  arretEchec: "p99 > 400 ms ou memoire croissante apres 3 min",
  livrable: "une note de 15 lignes avec les mesures brutes",
};
```

## EXEMPLE RÉALISTE

```js
// le harnais de mesure est le vrai livrable réutilisable d'un spike
const mesurer = async (envoyer, dureeMs = 600_000) => {
  const latences = [];
  const debut = Date.now();
  while (Date.now() - debut < dureeMs) {
    const t = performance.now();
    await envoyer();
    latences.push(performance.now() - t);
  }
  latences.sort((a, b) => a - b);
  return {
    debit: latences.length / (dureeMs / 1000),
    p99: latences[Math.floor(latences.length * 0.99)],
  };
};
// On garde ce harnais et on jette l'intégration testée : c'est
// exactement l'inverse de ce que font la plupart des équipes.
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// le spike qui glisse, formulé tel qu'on l'entend en réunion
const objectif = "on explore la solution X cette semaine";
// Aucun seuil, donc aucune fin. À la fin de la semaine, la phrase
// prononcée sera "on a bien avancé mais il reste deux ou trois
// points à valider", et elle sera sincère. Le coût observable n'est
// pas la semaine perdue : c'est que la décision d'adopter X sera
// prise par accumulation de code, sans jamais avoir été arbitrée.
```

## PIÈGE CLASSIQUE

Le piège central est le critère d'arrêt échec manquant. Un spike qui n'a qu'un critère de succès est une promesse de réussir, et un ingénieur consciencieux tiendra cette promesse en dépassant le budget. Écrire le seuil d'échec est un acte de protection de l'équipe, pas un manque de confiance envers elle.

Second piège : livrer le code du spike. Le code d'un spike n'a pas de gestion d'erreur, pas de tests, et repose sur des raccourcis choisis pour aller vite. Livré, il devient la version de production de la question qu'on se posait, et le spike se transforme rétroactivement en engagement.

Troisième piège, plus subtil : rebudgéter indéfiniment. Un spike peut être rebudgété une fois, avec une question reformulée. Deux fois, cela signifie que la question n'était pas la bonne, et le geste correct est de changer de question, pas de rajouter du temps.

## DEUX ANALOGIES

Une séance d'essai chronométrée en sport automobile : un nombre de tours fixé, un temps cible annoncé, et l'essai s'arrête même si le pilote pense pouvoir faire mieux au tour suivant. Où l'analogie casse : le pilote court contre un chrono objectif, alors que ton seuil est un choix d'ingénierie que tu as fixé toi-même et que tu peux donc être tenté de déplacer.

Le premier plan d'évasion de Prison Break : tester le passage sous une pièce a un coût borné et une réponse binaire, et l'échec du test vaut mieux que l'échec de l'évasion. Où l'analogie casse : le test y est irréversible et risqué, alors qu'un spike est jetable, ce qui rend paradoxalement plus difficile de s'y arrêter à l'heure.

## RÉSUMÉ

Un spike se définit par ce qui l'arrête, pas par ce qu'il explore. Une question fermée avec un chiffre, un budget annoncé, deux critères d'arrêt dont celui d'échec, et une réponse écrite en quinze lignes. Le code produit se jette, le harnais de mesure se garde. Un spike sans critère d'échec ne finira pas, et un spike livré en production est une décision qui n'a jamais été prise.

## Exercice chiffré

**Exercice (20 min).** Ton équipe hésite entre deux bibliothèques de file d'attente pour absorber 500 messages/s. Budget accordé : 1 jour-homme. Écris la fiche de spike complète : la question précise, le budget, un critère d'arrêt succès mesurable (par exemple : "tient 500 msg/s pendant 10 minutes sans erreur, latence p99 < 200 ms"), un critère d'arrêt échec, et le livrable attendu à la fin du jour. Si tu ne peux pas écrire un chiffre de critère d'arrêt, ton spike n'est pas borné : il glissera.

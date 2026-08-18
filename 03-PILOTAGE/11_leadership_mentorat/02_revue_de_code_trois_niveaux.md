# 02 : LA REVUE DE CODE À TROIS NIVEAUX

Temps de lecture ~10 min

Une revue transmet un critère ou ne sert à rien. Trois niveaux, annoncés en tête de chaque commentaire, suffisent à supprimer 90% des malentendus.

## 1. LES TROIS NIVEAUX, ET CE QU'ILS ENGAGENT

| Niveau | Ce que ça veut dire | Ce que l'auteur doit faire |
| --- | --- | --- |
| **Bloquant** | risque nommé, ne part pas en production ainsi | corriger, ou démontrer que le risque n'existe pas |
| **Suggestion** | je ferais autrement, tu décides | rien, s'il assume |
| **Question** | je ne comprends pas | répondre, parfois en documentant |

Un bloquant sans risque nommé n'est pas un bloquant : c'est une préférence déguisée en autorité.

```
"renomme ça"                              --> correction, transmet rien
"bloquant : ce nom dit le comment ;
 dans six mois, personne ne saura
 quoi passer ici"                         --> critère transmis
```

## 2. L'ORDRE DE LECTURE D'UN DIFF

1. Le titre et la description : quel problème est censé être résolu.
2. Les tests : ce qu'ils prouvent, et surtout ce qu'ils ne prouvent pas.
3. Les frontières : contrats d'API, schéma de données, droits.
4. Le corps du code, en dernier.

Relire le corps en premier, c'est passer une heure sur un style et rater une rupture de contrat.

## 3. LE BUDGET DE REVUE

- Trois bloquants maximum par revue. Au-delà, ce n'est pas une revue, c'est un désaccord de conception : on en parle de vive voix.
- 400 lignes maximum d'attention utile. Au-delà, on demande un découpage plutôt que de faire semblant de lire.
- 24 h maximum d'attente. Une revue tardive coûte plus cher que ses défauts corrigés.

Risque réel : la revue-cimetière, où quinze commentaires de style noient l'unique problème de sécurité. L'auteur corrige les quinze et laisse le seul qui comptait.

## 4. EXERCICE

**La revue à trois niveaux (20 min).** Reprends la dernière modification de ton fil rouge, relis-la comme si elle venait d'un autre, écris trois commentaires, un par niveau, avec le risque exact pour le bloquant. Garde-la : c'est une des deux pièces de la preuve S5.

**Publiée sur un dépôt open source public, vérifiable sans personne (obligatoire).** Une revue
qui reste dans ton `JOURNAL.md` n'est vérifiable par personne. Et une revue qui exige la réponse
d'un mainteneur fait dépendre ta preuve d'un inconnu qui n'a rien promis. La preuve S5 se produit
donc **en solo**, en trois pièces qui ne dépendent que de toi :

1. **Un dépôt open source public, nommé, actif.** Tu choisis un dépôt dont tu comprends le
   domaine. Tu notes son URL et sa licence.
2. **Un commit ou une pull request réellement audité, lien permanent.** Pas « le dépôt » : un
   `commit` précis, avec son SHA complet dans l'URL, pour que n'importe qui relise exactement le
   diff que tu as relu.
3. **Ta revue à trois niveaux, publiée là où elle est lisible publiquement** : en commentaire sur
   la PR ou l'issue si le dépôt l'autorise, sinon dans `REVUE-CODE.md` de ton propre dépôt public,
   citant le SHA et les numéros de ligne. Les deux voies valent la même chose : ce qui est exigé,
   c'est qu'un tiers puisse ouvrir le diff et juger ta revue.

Critère binaire : URL du dépôt + URL permanente du commit audité + trois commentaires, un par
niveau, le bloquant portant un risque nommé. Sans le lien du commit, la revue n'est pas recevable.

**La réponse du mainteneur est un bonus daté, plus jamais une condition.** Si quelqu'un te répond,
tu colles l'échange avec sa date : un désaccord public assumé vaut plus qu'un commentaire jamais
contesté. S'il ne répond pas, ta preuve est complète quand même. Aucun délai d'attente, aucune
mention « en attente de réponse » : le silence d'un tiers n'est pas ton échec.

**Sous opposition, à l'oral (5 min).** Une revue écrite sans personne en face pour la contester ne prouve rien de plus qu'un exercice de rédaction. C'est la **passe de contradiction S5**, décrite dans le [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md) : tu tires l'objection 6.1 ou 6.2, groupe 6, et tu joues les deux rôles à voix haute, seul : quelqu'un conteste un de tes bloquants avec un vrai argument (code stable depuis deux ans, test automatisé jugé suffisant). Réponds à voix haute, 5 minutes, puis note-toi sur la grille du CONTRADICTEUR. Un bloquant qui ne survit pas à une seule objection sourcée n'était probablement pas un bloquant.

## RÉSUMÉ

Trois niveaux annoncés, un risque nommé pour chaque bloquant, une lecture qui commence par les tests et les frontières, et un budget de revue borné. Le reste est du bruit.

## ET APRÈS

[03_mentorat_protocole.md](03_mentorat_protocole.md).

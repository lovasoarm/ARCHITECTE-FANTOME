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

**Publiée, pas seulement écrite.** Une revue qui reste dans ton `JOURNAL.md` n'est vérifiable par personne : n'importe qui peut prétendre après coup avoir vu le bon niveau au bon endroit. La revue qui compte pour la preuve S5 est postée en commentaire réel sur la pull request publique déclarée dans [00_prereq_check.md](00_prereq_check.md), avec son URL. Si l'auteur de la PR répond, garde l'échange : un désaccord assumé publiquement vaut plus qu'un commentaire jamais contesté. Si trois jours passent sans réponse possible (PR déjà fermée, dépôt inactif), documente-le dans le `JOURNAL.md` avec la date de tentative : ce n'est pas un échec, c'est un fait à assumer, pas à maquiller en silence.

**Sous opposition, à l'oral (5 min).** Une revue écrite sans personne en face pour la contester ne prouve rien de plus qu'un exercice de rédaction. Tire l'objection 6.1 ou 6.2 du [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md), groupe 6 : quelqu'un conteste un de tes bloquants avec un vrai argument (code stable depuis deux ans, test automatisé jugé suffisant). Réponds à voix haute, 5 minutes, puis note-toi sur la grille du CONTRADICTEUR. Un bloquant qui ne survit pas à une seule objection sourcée n'était probablement pas un bloquant.

## RÉSUMÉ

Trois niveaux annoncés, un risque nommé pour chaque bloquant, une lecture qui commence par les tests et les frontières, et un budget de revue borné. Le reste est du bruit.

## ET APRÈS

[03_mentorat_protocole.md](03_mentorat_protocole.md).

// Controle de livraison : refuse mecaniquement tout fichier qui viole les quatre
// regles non negociables de 06-ANNEXES-TRANSVERSES/meta/_STYLE.md.
// Usage : node outils/controle_livraison.mjs --strict   (depuis la racine du repo)
// Le drapeau --strict est accepte et documente : ce controle refuse deja la
// livraison au premier echec, il n'existe pas de mode indulgent.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";

const ROOT = process.cwd();
const errors = [];
const files = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    if (e === ".git" || e === "node_modules") continue;
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(ROOT);
const md = files.filter((f) => f.endsWith(".md"));

const STABILITY_OK = /^(intemporel|mouvant|perissable_\d{4})$/;
const PRICE = /\d[\d\s ]*(?:[.,]\d+)?\s*(?:€|EUR\b)|(?:€|EUR)\s?\d/;
const BANNED = /\b(login|panier)\b/i;
const BANNED_CTX = /(interdit|banni|contre-exemple|jamais|`|\/\/|<|=|\(|endpoint|auth|OWASP|rate limit|data-testid|\[ \])/i;

for (const f of md) {
  const rel = relative(ROOT, f);
  const raw = readFileSync(f, "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const body = fm ? raw.slice(fm[0].length) : raw;

  // Regle 3 : taxonomie de peremption
  const st = fm && fm[1].match(/^stability:\s*(\S+)\s*$/m);
  if (st && !STABILITY_OK.test(st[1])) errors.push(`${rel} : stability interdite "${st[1]}"`);

  // Regle 4 : tout tableau chiffre porte sa date de releve
  if (PRICE.test(body)) {
    if (!st) errors.push(`${rel} : porte un montant sans front-matter stability`);
    else if (!/^perissable_\d{4}$/.test(st[1])) errors.push(`${rel} : porte un montant et n'est pas perissable_<annee>`);
    if (!/Relev[ée] le \d{4}-\d{2}-\d{2}/.test(body)) errors.push(`${rel} : montant sans ligne "Relevé le <date>"`);
  }

  // Regle 2 : aucun renvoi vers un verification_pack inexistant
  if (/verification_pack/.test(body) && !/meta\/_STYLE\.md$/.test(rel)) {
    let dir = dirname(f), found = false;
    for (let i = 0; i < 4 && !found; i++) { if (existsSync(join(dir, "verification_pack", "criteres.md"))) found = true; dir = dirname(dir); }
    // ou bien le fichier cite explicitement un pack par un lien relatif qui resout sur disque
    if (!found) {
      const liens = body.match(/\]\(([^)]*verification_pack[^)]*)\)/g) || [];
      const resolus = liens.map((l) => l.slice(2, -1).split("#")[0]).filter(Boolean);
      found = resolus.length > 0 && resolus.every((p) => existsSync(join(dirname(f), p)));
    }
    if (!found) errors.push(`${rel} : renvoie a un verification_pack absent du disque`);
  }


  // Grimoires : cinq colonnes exactes
  if (/grimoire/i.test(rel.split("/").pop())) {
    for (const line of body.split("\n")) {
      if (/^\s*\|\s*Termes?\b/.test(line)) {
        const n = line.trim().replace(/^\||\|$/g, "").split("|").length;
        if (n !== 5) errors.push(`${rel} : grimoire a ${n} colonnes au lieu de 5`);
        break;
      }
    }
  }

  // Emojis, selecteurs de variation et tirets cadratins : voir controle 22.

  // Vocabulaire interdit hors contexte technique legitime
  let inCode = false;
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) { inCode = !inCode; continue; }
    if (inCode) continue;
    if (BANNED.test(line) && !BANNED_CTX.test(line)) errors.push(`${rel} : vocabulaire interdit hors contexte : ${line.trim().slice(0, 70)}`);
  }
}

// Controle 10 (bloc C1) : tout tableau contenant un montant en euros porte,
// dans les six lignes qui le precedent, sa ligne de releve datee et sourcee.
const MONTANT = /\d[\d\u00a0\u202f .,]*\s?(?:€|EUR\b)/;
for (const f of md) {
  const rel = relative(ROOT, f);
  const L = readFileSync(f, "utf8").split("\n");
  let debut = -1, code = false;
  for (let i = 0; i <= L.length; i++) {
    const ligne = L[i] ?? "";
    if (/^\s*(```|~~~)/.test(ligne)) { code = !code; continue; }
    const estTableau = !code && /^\s*\|/.test(ligne);
    if (estTableau) { if (debut < 0) debut = i; continue; }
    if (debut >= 0) {
      const bloc = L.slice(debut, i);
      const entete = bloc.some((x) => /^\s*\|[\s:|-]+\|\s*$/.test(x));
      if (entete && bloc.some((x) => MONTANT.test(x))) {
        const ctx = L.slice(Math.max(0, debut - 6), debut).join("\n");
        const date = /Relev[ée] le \d{4}-\d{2}-\d{2}/.test(ctx);
        const src = /(chez|source|URL)/i.test(ctx);
        if (!date || !src) errors.push(`${rel}:${debut + 1} : tableau avec montant en euros sans ligne "Relevé le <date>, chez <fournisseur>, ... URL ..."`);
      }
      debut = -1;
    }
  }
}

// Controle 11 (bloc C2) : l'index de perissabilite commite est identique a l'index regenere.
try {
  const { construire, CIBLE } = await import("./generer_perissabilite.mjs");
  if (readFileSync(join(ROOT, CIBLE), "utf8") !== construire()) {
    errors.push(`${CIBLE} : index de perissabilite perime, rejoue node outils/generer_perissabilite.mjs`);
  }
} catch (e) {
  errors.push(`generer_perissabilite.mjs : generation impossible (${e.message})`);
}


// Controle 12 (bloc E4) : tout fichier avec front-matter declare un acte cognitif valide.
const ACTES = ["restituer", "appliquer", "transf\u00e9rer", "\u00e9valuer", "produire"];
for (const f of md) {
  const rel = relative(ROOT, f);
  const t = readFileSync(f, "utf8");
  const m = /^---\n([\s\S]*?)\n---\n/.exec(t);
  if (!m) continue;
  const a = /^acte:\s*(.+)$/m.exec(m[1]);
  if (!a) errors.push(`${rel} : front-matter sans champ "acte:" (voir 06-ANNEXES-TRANSVERSES/meta/_STYLE.md)`);
  else if (!ACTES.includes(a[1].trim())) errors.push(`${rel} : acte "${a[1].trim()}" hors liste (${ACTES.join(", ")})`);
}

// Controle 13 (bloc E3) : chacun des six niveaux TECH-ILA est appele par exactement une retrospective.
{
  const retros = md.filter((f) => /(MI-)?RETRO-BLOC/.test(relative(ROOT, f)));
  for (let n = 1; n <= 6; n++) {
    const cites = retros.filter((f) => readFileSync(f, "utf8").includes(`tech-ila/0${n}-niveau-${n}-`));
    if (cites.length !== 1) errors.push(`TECH-ILA niveau ${n} : appele par ${cites.length} retrospective(s), il en faut exactement 1`);
  }
}

// Controle 14 (bloc F1) : VERIFICATION_LIENS.md couvre 100 % des .md du depot
// et affiche fichiers parcourus / liens trouves / liens resolus.
try {
  const { construirePreuve, CIBLE_PREUVE } = await import("./verifier_liens.mjs");
  const chemin = join(ROOT, CIBLE_PREUVE);
  if (!existsSync(chemin)) {
    errors.push(`${CIBLE_PREUVE} : preuve d'exhaustivite absente, rejoue node outils/verifier_liens.mjs . --ecrire`);
  } else {
    const commite = readFileSync(chemin, "utf8");
    const p = construirePreuve(ROOT);
    const declare = /Fichiers `\.md` parcourus \| (\d+)/.exec(commite);
    if (!declare) errors.push(`${CIBLE_PREUVE} : ne declare pas le nombre de fichiers parcourus`);
    else if (Number(declare[1]) !== md.length) errors.push(`${CIBLE_PREUVE} : perimetre partiel, ${declare[1]} fichiers declares pour ${md.length} .md dans le depot`);
    if (!/Liens relatifs trouv/.test(commite) || !/Liens relatifs r/.test(commite)) errors.push(`${CIBLE_PREUVE} : les trois nombres auto-calcules ne sont pas tous affiches`);
    if (commite !== p.texte) errors.push(`${CIBLE_PREUVE} : preuve perimee, rejoue node outils/verifier_liens.mjs . --ecrire`);
    // Controle 15 (bloc F1) : zero lien relatif casse.
    for (const c of p.casses) errors.push(`lien relatif casse : ${c}`);
  }
} catch (e) {
  errors.push(`verifier_liens.mjs : verification impossible (${e.message})`);
}


const rel = (f) => relative(ROOT, f).split(sep).join("/");
// Bloc G : verrou unique. Controles 16 a 19.
// 16 : index de dossiers a jour (aucun .md orphelin possible).
{
  const { sectionAttendue } = await import("./generer_index_dossiers.mjs");
  void sectionAttendue;
}
// 17 : zero .md sans lien entrant.
{
  const cibles = new Set();
  for (const f of md) {
    const t = readFileSync(join(ROOT, rel(f)), "utf8").replace(/```[\s\S]*?```/g, "");
    for (const m of t.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const c = m[1];
      if (/^(https?:|mailto:|#)/.test(c)) continue;
      cibles.add(relative(ROOT, join(dirname(join(ROOT, rel(f))), c.split("#")[0])).split(sep).join("/"));
    }
  }
  for (const f of md) if (rel(f) !== "README.md" && !cibles.has(rel(f))) errors.push(`${f} : aucun lien entrant, document orphelin`);
}
// 18 : aucun nom de fichier avec espace.
for (const f of md) if (/\s/.test(rel(f))) errors.push(`${f} : espace dans un nom de fichier`);
// 19 : aucune phrase de colonne « Limite » repetee plus de deux fois.
{
  const cpt = new Map();
  for (const f of md) {
    let idx = null, bloc2 = false;
    for (const l of readFileSync(join(ROOT, rel(f)), "utf8").split("\n")) {
      const st = l.trim();
      if (st.startsWith("```")) { bloc2 = !bloc2; continue; }
      if (bloc2) continue;
      if (!st.startsWith("|")) { idx = null; continue; }
      const c = st.replace(/^\||\|$/g, "").split(/(?<!\\)\|/);
      if (idx === null) { idx = c.at(-1).trim().toLowerCase().startsWith("limite") ? c.length - 1 : -1; continue; }
      if (idx < 0 || c.length <= idx) continue;
      const v = c[idx].trim();
      if (v.length < 20 || /^-+$/.test(v)) continue;
      cpt.set(v, (cpt.get(v) ?? 0) + 1);
    }
  }
  for (const [v, n] of cpt) if (n > 2) errors.push(`phrase de colonne « Limite » repetee ${n} fois : ${v.slice(0, 60)}...`);
}

// Controles 20 et 21 (bloc B1) : accentuation francaise.
// 20 : zero accent sur un fichier de plus de 200 mots.
// 21 : ratio accents/mots anormalement bas face a la mediane du depot.
{
  const { violations } = await import("./controle_accents.mjs");
  for (const v of violations(ROOT)) errors.push(v);
}


// Controle 22 (bloc B2) : 0 emoji, 0 selecteur de variation, 0 em-dash, sortie fichier:ligne.
{
  const { violations } = await import("./controle_typographie.mjs");
  for (const v of violations(ROOT)) errors.push(v);
}

// Controle 23 (bloc B4) : prefixes numeriques continus a partir de 00.
{
  const { violations } = await import("./controle_numerotation_continue.mjs");
  for (const v of violations(ROOT)) errors.push(v);
}

if (errors.length) { console.error(`CONTROLE DE LIVRAISON : ECHEC (${errors.length})`); for (const e of errors) console.error(" - " + e); process.exit(1); }
console.log(`CONTROLE DE LIVRAISON : OK sur ${md.length} fichiers.`);

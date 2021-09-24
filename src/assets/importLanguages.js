import fs from 'fs';
const SEPARATOR = '~';
const loadTsv = (filename) => {
  return fs.readFileSync(filename).toString().split(/\r?\n/).reduce((prev, cur) => {
    const verbs = cur.split(SEPARATOR);
    const lang = verbs.shift();
    if (lang !== 'Key' && lang !== '') {
      prev[lang] = verbs;
    }
    return prev;
  }, {});
}
const ueqTrans = loadTsv('raw/UEQ_Texts.txt');
const auxTranslations = [
  loadTsv('raw/webcomponent.tsv'),
  loadTsv('raw/UEQPLUS_Texts.txt')
];

// Map default language to another locale
const langMap = {
  en: 'us'
}

const translations = {};
// We premise the uew contains the most translated languages. So untranslated content from wc or plus will be filled english
Object.entries(ueqTrans).forEach(([k, v]) => {
  translations[k] = v.reduce((prev, cur, i) => {
    prev[ueqTrans.en[i].toLowerCase()] = cur;
    return prev;
  }, {});
});
// Append additional contents
Object.keys(ueqTrans).forEach(lang => auxTranslations.forEach(aux =>
  (aux.hasOwnProperty(lang) ? aux[lang] : aux.en).forEach((t, i) => {
    if (!translations[lang][aux.en[i].toLowerCase()]) {
      translations[lang][aux.en[i].toLowerCase()] = (t === '' ? aux.en[i] : t);
    }
  })
));

// save json files
const tsMapping = {};
Object.entries(translations).forEach(([lang, trans]) => {
  const code = `${lang}-${(langMap[lang] || lang).toUpperCase()}`;
  tsMapping[lang] = [
    langMap[lang] || lang,
    code
  ];
  fs.writeFileSync(`i18n/${code}.json`, JSON.stringify({
    code,
    description: trans.english, // translated language name
    translations: trans
  }, null, 2))
})

// Recreate import index
const indexFile = fs.createWriteStream('i18n/index.ts', { flags: 'w+' });
indexFile.write(`import { Languages } from "./i18n";\n`);
Object.values(tsMapping).forEach(([_, code]) => indexFile.write(`import * as ${code.replace(/-/, '_')} from "./${code}.json";\n`));
indexFile.write(`\nconst i18n: Languages = {`);
Object.entries(tsMapping).forEach(([prim, [sec, code]]) => {
  const cv = code.replace(/-/, '_');
  indexFile.write(`
  ${prim}: {
    ${sec}: ${cv},
    default: ${cv}
  },`);
});
indexFile.write(`\n};\n\nexport { i18n };`);
indexFile.close();

console.log(`Done saved ${Object.keys(translations).length} translation files!`);

import fs from 'fs';
const ueqTsv = fs.readFileSync('raw/UEQ_Texts.txt').toString().split(/\r?\n/);
ueqTsv.shift(); // remove headline (we use english as leading translation)

// Map default language to another locale
const langMap = {
  en: 'US'
}

const keys = [];
const translations = {};
// Fetch english as leading translation
translations.en = ueqTsv.find(t => t.startsWith('en~')).split('~').reduce((prev, cur, i) => {
  keys.push(cur);
  prev[cur] = cur;
  return prev;
}, {});
// Translate others
ueqTsv.filter(v => !v.startsWith('en~')).forEach(v => {
  translations[v.substr(0, 2)] = v.split('~').reduce((prev, cur, i) => {
    prev[keys[i]] = cur;
    return prev;
  }, {});
});
// Append

// save json files

console.log(translations);

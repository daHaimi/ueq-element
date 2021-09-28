import fs from "fs";

const readme = 'README.md';

const rows = fs.readdirSync('src/assets/i18n')
    .filter(n => n.match('[a-z]+[_-].+\.json'))
    .map(f => {
        const t = JSON.parse(fs.readFileSync(`src/assets/i18n/${f}`).toString());
        return `<tr>
        <td>${t.description}</td>
        <td><img src="https://img.shields.io/badge/lang-${t.code.replace(/-/, '_')}-brightgreen" alt="${t.code}" /></td>
    </tr>`;
    });
fs.writeFileSync(readme,
    fs.readFileSync(readme).toString()
        .replace(/<tbody id="i18n">[\s\S]*<\/tbody>/imu, `<tbody id="i18n">${rows.join('\n')}</tbody>`)
);

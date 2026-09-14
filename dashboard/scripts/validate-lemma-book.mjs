import fs from 'node:fs';
import katex from 'katex';

const path = process.argv[2] ?? 'public/research-data.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const lemmas = data.lemma_book?.lemmas ?? data.lemmas ?? [];
const failures = [];
let mathSegments = 0;

function validateMarkdown(markdown, reference) {
  const control = [...markdown].find((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && character !== '\n' && character !== '\t';
  });
  if (control) failures.push(`${reference}: contains a control character`);

  const mathPattern = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g;
  const prose = markdown.replace(mathPattern, (_, display, inline) => {
    const expression = display ?? inline ?? '';
    mathSegments += 1;
    try {
      katex.renderToString(expression, { throwOnError: true, strict: 'warn' });
    } catch (error) {
      failures.push(`${reference}: ${error.message}`);
    }
    return ' ';
  });
  const dollarCount = (markdown.match(/\$/g) ?? []).length;
  if (dollarCount % 2 !== 0) failures.push(`${reference}: unbalanced math delimiter`);
  if (/\\[A-Za-z]+/.test(prose)) failures.push(`${reference}: TeX command outside math delimiters`);
}

for (const lemma of lemmas) {
  validateMarkdown(String(lemma.statement_markdown ?? ''), `${lemma.id} statement`);
  validateMarkdown(String(lemma.proof_markdown ?? ''), `${lemma.id} proof`);
}

if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify({ passed: true, lemmas: lemmas.length, math_segments: mathSegments })}\n`);

import fs from 'node:fs';
import katex from 'katex';

const path = process.argv[2] ?? 'public/research-data.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const roadmaps = data.proof_roadmaps?.roadmaps ?? (data.nodes ? [data] : []);
const messages = data.message_board?.messages ?? data.messages ?? [];
const failures = [];
let mathSegments = 0;

function validateMarkdown(markdown, reference) {
  const value = String(markdown ?? '');
  const control = Array.from(value).find((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && character !== '\n' && character !== '\t';
  });
  if (control) failures.push(`${reference}: contains a control character`);
  const mathPattern = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g;
  const prose = value.replace(mathPattern, (_, display, inline) => {
    const expression = display ?? inline ?? '';
    mathSegments += 1;
    try {
      katex.renderToString(expression, { throwOnError: true, strict: 'warn' });
    } catch (error) {
      failures.push(`${reference}: ${error.message}`);
    }
    return ' ';
  });
  if ((value.match(/\$/g) ?? []).length % 2 !== 0) {
    failures.push(`${reference}: unbalanced math delimiter`);
  }
  if (/\\[A-Za-z]+/.test(prose)) {
    failures.push(`${reference}: TeX command outside math delimiters`);
  }
}

for (const roadmap of roadmaps) {
  validateMarkdown(roadmap.target_statement, `${roadmap.roadmap_id} target`);
  for (const node of roadmap.nodes ?? []) {
    validateMarkdown(node.statement_markdown, `${roadmap.roadmap_id}:${node.id}`);
  }
}
for (const message of messages) {
  validateMarkdown(message.body_markdown, `${message.id ?? 'draft-message'} body`);
}

if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exit(1);
}
process.stdout.write(`${JSON.stringify({ passed: true, roadmaps: roadmaps.length, messages: messages.length, math_segments: mathSegments })}\n`);

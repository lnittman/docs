#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Root of MDX content
const CONTENT_ROOT = path.join(__dirname, 'content');

// Directories to include in normalization
// Focus on practice docs; still include diagrams and ecosystem standards
const TARGET_DIRS = [
  'architecture',
  'tools',
  'stack',
  'ecosystem',
  'diagrams'
];

// Heuristic thresholds
const LONG_DOC_LINE_THRESHOLD = 120;

const SEE_ALSO_BY_DIR = {
  'architecture': [
    'architecture/standards',
    'tools/stack/turborepo',
    'tools/stack/ai-sdk',
    'tools/integrations/orpc-turborepo-guide'
  ],
  'tools/stack': [
    'architecture/patterns',
    'tools/stack/turborepo',
    'stack/cicd/cicd',
    'stack/testing/testing'
  ],
  'tools/integrations': [
    'tools/stack/hono',
    'tools/stack/swr',
    'architecture/turborepo'
  ],
  'stack': [
    'architecture/overview',
    'stack/cicd/cicd',
    'stack/testing/testing'
  ],
  'ecosystem': [
    'architecture/standards',
    'ecosystem/compliance/README',
    'ecosystem/technology/README'
  ],
  'diagrams': [
    'architecture/overview',
    'architecture/turborepo',
    'tools/stack/ai-sdk'
  ]
};

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function hasFrontmatter(content) {
  return content.startsWith('---\n');
}

function extractFrontmatter(content) {
  if (!hasFrontmatter(content)) return null;
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;
  const body = match[1];
  const fm = {};
  body.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      fm[key] = val.replace(/^"|^'|"$|'$/g, '');
    }
  });
  return { raw: match[0], map: fm };
}

function ensureFrontmatter(content, filePath) {
  if (hasFrontmatter(content)) return content;
  const fileName = path.basename(filePath, '.mdx');
  const title = toTitleCase(fileName.replace(/[-_]/g, ' '));
  const firstParagraph = content.split('\n\n')[0].replace(/^#+\s*/, '').trim();
  const description = truncate(firstParagraph || `Documentation for ${title}`, 160);
  const fm = `---\n` +
             `title: ${title}\n` +
             `description: ${description}\n` +
             `---\n\n`;
  return fm + content.trim() + '\n';
}

function ensureH1(content) {
  // Find frontmatter end
  let body = content;
  let prefix = '';
  const fm = extractFrontmatter(content);
  if (fm) {
    prefix = fm.raw;
    body = content.slice(prefix.length);
  }
  const lines = body.split('\n');
  const firstContentIndex = lines.findIndex((l) => l.trim().length > 0);
  if (firstContentIndex === -1) return content; // empty file

  if (!lines[firstContentIndex].startsWith('# ')) {
    const title = (fm && fm.map.title) ? fm.map.title : 'Documentation';
    const h1 = `# ${title}`;
    const newBody = [h1, ''].concat(lines.slice(firstContentIndex)).join('\n');
    return prefix + newBody;
  }
  return content;
}

function ensureTOC(content) {
  const totalLines = content.split('\n').length;
  if (totalLines < LONG_DOC_LINE_THRESHOLD) return content;
  if (/^##\s+Table of Contents$/m.test(content)) return content;

  // Insert after first H1
  const parts = content.split('\n');
  let h1Index = parts.findIndex((l) => /^#\s+/.test(l));
  if (h1Index === -1) return content;
  const insertionIndex = h1Index + 2; // leave one blank line
  const tocBlock = [
    '## Table of Contents',
    '',
    '<!-- Generated placeholder; add anchors as needed -->',
    ''
  ];
  parts.splice(insertionIndex, 0, ...tocBlock);
  return parts.join('\n');
}

function normalizeHeadings(content) {
  // Title-Case all headings except those containing code/backticks or file paths
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (full, hashes, text) => {
    if (text.includes('`') || /[\w-]+\.[\w]+/.test(text) || text.includes('/')) {
      return full; // skip headings with code/file paths
    }
    return `${hashes} ${toTitleCase(text)}`;
  });
}

function applyPolicyUpdates(content) {
  let updated = content;
  // Promote apps/ai in turborepo as current standard
  updated = updated.replace(/NO\s+apps\/ai[\s\S]*?\n/g, (m) => {
    return m.replace(/NO\s+apps\/ai[\s\S]*/, 'Use apps/ai inside the Turborepo for AI functionality. Standalone AI service repos are optional for special cases.');
  });

  updated = updated.replace(/Standalone\s+AI\s+Service\s*\([^\)]*\)/gi, 'AI Service App In Turborepo');
  updated = updated.replace(/Standalone\s+`\[project(Name)?\]-ai`/gi, '`apps/ai` in the monorepo');
  updated = updated.replace(/Check for legacy apps\/ai/gi, 'Check Apps/ai App Exists');

  // Prefer sentence: "Use apps/ai ..." if we see strongly worded "never" rules
  updated = updated.replace(/never\s+put\s+ai\s+in\s+the\s+turborepo[^\.]*\./gi, 'Use apps/ai inside the Turborepo; standalone repos are optional when necessary.');

  return updated;
}

function ensureSeeAlso(content, filePath) {
  if (/^##\s+See also$/im.test(content) || /^##\s+See Also$/im.test(content)) return content;
  const rel = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, '/');
  const top = rel.split('/')[0];
  const second = rel.split('/').slice(0, 2).join('/');
  const candidates = SEE_ALSO_BY_DIR[second] || SEE_ALSO_BY_DIR[top] || SEE_ALSO_BY_DIR['architecture'];
  const items = candidates
    .filter((p) => !rel.startsWith(p))
    .slice(0, 4)
    .map((p) => `- [${prettyLabel(p)}](/${p})`)
    .join('\n');
  return content.trimEnd() + `\n\n## See Also\n\n${items}\n`;
}

function prettyLabel(p) {
  const name = p.split('/').slice(-1)[0];
  return toTitleCase(name.replace(/[-_]/g, ' '));
}

function truncate(s, max) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

function toTitleCase(str) {
  if (!str) return str;
  // Preserve acronyms and special tokens
  const exceptions = new Map([
    ['ai', 'AI'],
    ['api', 'API'],
    ['ci/cd', 'CI/CD'],
    ['ui/ux', 'UI/UX'],
    ['jwt', 'JWT'],
    ['oauth', 'OAuth'],
    ['sql', 'SQL'],
    ['json', 'JSON'],
    ['yaml', 'YAML'],
    ['xml', 'XML'],
    ['css', 'CSS'],
    ['html', 'HTML'],
    ['js', 'JS'],
    ['ts', 'TS'],
    ['jsx', 'JSX'],
    ['tsx', 'TSX'],
    ['ios', 'iOS'],
    ['next.js', 'Next.js'],
  ]);
  const small = new Set(['a','an','the','and','or','but','for','nor','as','at','by','in','of','on','to','with','from']);

  return str.replace(/(^|\s|[-/:])([A-Za-z][A-Za-z0-9\.\-]*)/g, (m, sep, word, idx) => {
    const lower = word.toLowerCase();
    if (exceptions.has(lower)) return sep + exceptions.get(lower);
    if (word.includes('.')) {
      const lowerDot = word.toLowerCase();
      if (exceptions.has(lowerDot)) return sep + exceptions.get(lowerDot);
    }
    if (small.has(lower)) return sep + (sep.trim() === '' ? capitalize(word) : lower);
    return sep + capitalize(word);
  });
}

function capitalize(w) {
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

function processFile(filePath) {
  let content = readFile(filePath);
  let before = content;

  content = ensureFrontmatter(content, filePath);
  content = ensureH1(content);
  content = ensureTOC(content);
  content = normalizeHeadings(content);
  content = applyPolicyUpdates(content);
  content = ensureSeeAlso(content, filePath);

  if (content !== before) {
    writeFile(filePath, content);
    return true;
  }
  return false;
}

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, cb);
    else if (e.isFile() && p.endsWith('.mdx')) cb(p);
  }
}

function main() {
  console.log('🚀 Normalizing documentation...');
  let fixed = 0;

  // Also handle top-level index.mdx if present
  const topIndex = path.join(CONTENT_ROOT, 'index.mdx');
  if (fs.existsSync(topIndex)) {
    if (processFile(topIndex)) fixed++;
  }

  // Walk entire content tree to ensure complete coverage
  walk(CONTENT_ROOT, (file) => {
    if (processFile(file)) {
      fixed++;
      console.log('  ✓', path.relative(CONTENT_ROOT, file));
    }
  });

  console.log(`\n✨ Complete. Updated ${fixed} file(s).`);
}

if (require.main === module) {
  main();
}

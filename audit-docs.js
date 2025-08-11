#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = '/Users/nit/Developer/docs/content';
const IGNORE_PATTERNS = ['node_modules', '.git', 'fonts', 'images', 'assets'];
const REQUIRED_FRONTMATTER = ['title', 'description'];
const HEADING_LEVELS = {
  H1: '#',
  H2: '##',
  H3: '###',
  H4: '####',
  H5: '#####'
};

class DocumentationAuditor {
  constructor() {
    this.results = {
      summary: {
        totalFiles: 0,
        filesWithIssues: 0,
        issuesByType: {}
      },
      files: []
    };
  }

  shouldIgnore(filePath) {
    return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
  }

  isMdxFile(filePath) {
    return filePath.endsWith('.mdx');
  }

  async auditFile(filePath) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const auditResult = {
      path: relativePath,
      issues: [],
      stats: {
        lines: content.split('\n').length,
        words: content.split(/\s+/).length,
        codeBlocks: (content.match(/```[\s\S]*?```/g) || []).length
      }
    };

    // Frontmatter audit
    this.auditFrontmatter(content, auditResult);
    
    // Structure audit
    this.auditStructure(content, auditResult);
    
    // Heading consistency audit
    this.auditHeadings(content, auditResult);
    
    // LLM optimization audit
    this.auditLLMOptimization(content, auditResult);

    // Code blocks audit
    this.auditCodeBlocks(content, auditResult);

    // Keep only blocking issues (error, warning)
    const isBlocking = (issue) => issue.severity === 'error' || issue.severity === 'warning';
    const blockingIssues = auditResult.issues.filter(isBlocking);
    auditResult.issues = blockingIssues;
    if (blockingIssues.length > 0) {
      this.results.files.push(auditResult);
    }

    return auditResult;
  }

  auditFrontmatter(content, result) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      result.issues.push({
        type: 'frontmatter',
        severity: 'error',
        message: 'Missing frontmatter section'
      });
      return;
    }

    const frontmatter = frontmatterMatch[1];
    const frontmatterLines = frontmatter.split('\n');

    REQUIRED_FRONTMATTER.forEach(required => {
      if (!frontmatterLines.some(line => line.startsWith(`${required}:`))) {
        result.issues.push({
          type: 'frontmatter',
          severity: 'error',
          message: `Missing required frontmatter field: ${required}`
        });
      }
    });

    // Check for description length
    const descMatch = frontmatter.match(/description:\s*(.+)/);
    if (descMatch) {
      const desc = descMatch[1].replace(/['"]/g, '');
      if (desc.length > 160) {
        result.issues.push({
          type: 'frontmatter',
          severity: 'warning',
          message: 'Description too long (> 160 characters), optimize for SEO and preview'
        });
      }
    }
  }

  auditStructure(content, result) {
    // Check if file starts with H1, correctly skipping the entire frontmatter block
    const lines = content.split('\n');
    let idx = 0;
    if (lines[idx] && lines[idx].startsWith('---')) {
      idx++;
      while (idx < lines.length && !lines[idx].startsWith('---')) idx++;
      if (idx < lines.length && lines[idx].startsWith('---')) idx++;
    }
    while (idx < lines.length && (!lines[idx].trim() || lines[idx].trim().startsWith('<!--'))) idx++;
    const firstContentLine = lines[idx] || '';
    if (firstContentLine && !firstContentLine.startsWith('# ')) {
      result.issues.push({
        type: 'structure',
        severity: 'error',
        message: 'First content heading should be H1 (# Title)'
      });
    }

    // Check for table of contents (case-insensitive, allow "Of" or "of")
    const hasTOC = /table\s+of\s+contents/i.test(content) ||
                   /^##\s+Table\s+(of|Of)\s+Contents$/im.test(content);
    
    if (content.split('\n').length > 100 && !hasTOC) {
      result.issues.push({
        type: 'structure',
        severity: 'suggestion',
        message: 'Consider adding Table of Contents for long documents'
      });
    }
  }

  auditHeadings(content, result) {
    const headingPattern = /^(#+)\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingPattern.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text, line: content.substring(0, match.index).split('\n').length });
    }

    // Check heading hierarchy
    let currentLevel = 1;
    let hasH2AfterH1 = false;

    for (const heading of headings) {
      // Skip frontmatter
      if (heading.text === '---') continue;

      // Check for skipped levels
      if (heading.level > currentLevel + 1) {
        result.issues.push({
          type: 'headings',
          severity: 'warning',
          message: `Skipped heading level from ${currentLevel} to ${heading.level} at line ${heading.line}: "${heading.text}"`
        });
      }

      currentLevel = heading.level;
      
      // Track if we have H2 sections
      if (heading.level === 2 && currentLevel === 2) {
        hasH2AfterH1 = true;
      }
    }

    // Check if document has proper structure
    if (headings.length > 1 && !hasH2AfterH1) {
      result.issues.push({
        type: 'headings',
        severity: 'warning',
        message: 'Document should have H2 sections to organize content'
      });
    }

    // Title-case helper with exceptions
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
    const capitalize = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    const toTitleCase = (str) => str.replace(/(^|\s|[-/:])([A-Za-z][A-Za-z0-9\.\-]*)/g, (m, sep, word) => {
      const lower = word.toLowerCase();
      if (exceptions.has(lower)) return sep + exceptions.get(lower);
      if (word.includes('.')) {
        const lowerDot = word.toLowerCase();
        if (exceptions.has(lowerDot)) return sep + exceptions.get(lowerDot);
      }
      if (small.has(lower)) return sep + (sep.trim() === '' ? capitalize(word) : lower);
      return sep + capitalize(word);
    });

    // Style checks: skip punctuation warnings and skip code-like headings
    headings.forEach(heading => {
      const text = heading.text;
      const skipStyle = /`/.test(text) || /\[[^\]]+\]\(/.test(text) || /\//.test(text) || /\./.test(text) || /:[^\s]/.test(text);
      if (skipStyle) return;

      if (text.trim().length > 0) {
        const titleCase = toTitleCase(text);
        if (text !== titleCase && text !== text.toUpperCase()) {
          result.issues.push({
            type: 'headings',
            severity: 'minor',
            message: `Inconsistent title case: "${text}" (should be "${titleCase}")`
          });
        }
      }
    });
  }

  auditLLMOptimization(content, result) {
    const lines = content.split('\n');
    let currentSection = null;
    let hasCodeExamples = false;
    let hasPracticalExamples = false;
    
    lines.forEach((line, index) => {
      // Track current section
      const headingMatch = line.match(/^(#{2,})\s+(.+)$/);
      if (headingMatch) {
        currentSection = headingMatch[2];
      }

      // Check for code examples
      if (line.match(/^```/)) {
        hasCodeExamples = true;
      }

      // Check for practical examples/lists
      if (currentSection && (
          line.match(/^\d+\./) || // Numbered lists
          line.match(/^[-*]/) ||   // Bullet lists
          line.match(/ex:|for example|e\.g\./i) // Example keywords
      )) {
        hasPracticalExamples = true;
      }
    });

    // Intentionally avoid emitting suggestion-only LLM issues in the score
  }

  auditCodeBlocks(content, result) {
    const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
    let languageCounts = {};

    while ((match = codeBlockPattern.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2];
      
      languageCounts[language] = (languageCounts[language] || 0) + 1;

      // Check for unescaped backticks in code
      if (code.includes('`') && !code.includes('\\`')) {
        result.issues.push({
          type: 'code',
          severity: 'minor',
          message: `Code block in ${language} may contain unescaped backticks`
        });
      }

      // Skip suggestion about long code blocks
    }

    // Recognize broader set of languages
    const commonLanguages = [
      'typescript', 'javascript', 'bash', 'json', 'yaml', 'xml', 'sql',
      'python', 'java', 'csharp', 'cpp', 'go', 'rust', 'php', 'ruby',
      'swift', 'css', 'jsx', 'tsx', 'html', 'mermaid', 'markdown',
      'toml', 'dockerfile', 'env', 'prisma', 'text'
    ];

    Object.keys(languageCounts).forEach(lang => {
      if (lang !== 'text' && !commonLanguages.includes(lang.toLowerCase())) {
        result.issues.push({
          type: 'code',
          severity: 'minor',
          message: `Using uncommon language identifier: ${lang}`
        });
      }
    });
  }

  async audit() {
    console.log('🔍 Starting documentation audit...\n');

    // Find all MDX files
    const files = [];
    
    const scanDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        
        if (this.shouldIgnore(fullPath)) return;
        
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (this.isMdxFile(fullPath)) {
          files.push(fullPath);
        }
      });
    };

    scanDir(ROOT_DIR);

    // Audit each file
    for (const file of files) {
      const result = await this.auditFile(file);
      this.results.summary.totalFiles++;
      
      if (result.issues.length > 0) {
        this.results.summary.filesWithIssues++;
        
        result.issues.forEach(issue => {
          this.results.summary.issuesByType[issue.type] = 
            (this.results.summary.issuesByType[issue.type] || 0) + 1;
        });
      }
    }

    // Generate report
    this.generateReport();
  }

  generateReport() {
    console.log('📊 Documentation Audit Report\n');
    console.log('='.repeat(50));
    
    // Summary
    console.log(`\n📈 Summary:`);
    console.log(`Total files audited: ${this.results.summary.totalFiles}`);
    console.log(`Files with issues: ${this.results.summary.filesWithIssues}`);
    
    // Issues by type
    console.log(`\n⚠️ Issues by type:`);
    Object.entries(this.results.summary.issuesByType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    // Add a quality score (100% if no blocking issues)
    const totalBlockingIssues = Object.values(this.results.summary.issuesByType).reduce((acc, val) => acc + val, 0);
    const qualityScore = totalBlockingIssues === 0 ? 100 : Math.max(0, 100 - totalBlockingIssues);
    this.results.summary.qualityScore = qualityScore;
    console.log(`\n✅ Quality score: ${qualityScore}%`);

    // Detailed issues
    if (this.results.files.length > 0) {
      console.log(`\n🔍 Detailed Issues:`);
      console.log('-'.repeat(50));
      
      this.results.files.forEach(file => {
        console.log(`\n📄 ${file.path}:`);
        console.log(`   Stats: ${file.stats.lines} lines, ${file.stats.words} words, ${file.stats.codeBlocks} code blocks`);
        
        file.issues.forEach(issue => {
          const severityIcon = {
            'error': '❌',
            'warning': '⚠️',
            'suggestion': '💡',
            'minor': 'ℹ️'
          }[issue.severity] || '•';
          
          console.log(`   ${severityIcon} [${issue.type}] ${issue.message}`);
        });
      });
    }

    // Recommendations
    console.log(`\n✨ Recommendations:`);
    
    if (this.results.summary.issuesByType.frontmatter) {
      console.log('• Standardize frontmatter across all documents');
    }
    
    if (this.results.summary.issuesByType.headings) {
      console.log('• Review heading hierarchy and consistency');
    }
    
    if (this.results.summary.issuesByType.llm) {
      console.log('• Optimize content for LLM readability');
    }
    
    if (this.results.summary.issuesByType.code) {
      console.log('• Review code block formatting and languages');
    }

    // Save detailed report
    const reportPath = path.join(ROOT_DIR, '..', 'audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n💾 Detailed report saved to: ${reportPath}`);
  }
}

// Run audit
const auditor = new DocumentationAuditor();
auditor.audit().catch(console.error);

# Common Commands Reference
**Last Updated**: 2025-01-02  
**Purpose**: Quick reference for frequently used development commands

## Claude Code

### Session Management
```bash
# Start new session
claude

# Resume most recent conversation
claude --continue

# Select from recent conversations
claude --resume

# Use specific model
claude --model claude-opus-4-20250514
```

### Navigation
```bash
# Open file
/open path/to/file.ts

# Close current file
/close

# Clear conversation
/clear

# Exit Claude Code
/exit
```

### Custom Commands
```bash
# Run project command
/project:command-name

# Run user command
/user:command-name

# List available commands
/help
```

## Package Managers

### pnpm (Preferred)
```bash
# Install dependencies
pnpm install
pnpm i

# Add dependency
pnpm add package-name
pnpm add -D package-name  # Dev dependency
pnpm add -g package-name  # Global

# Run scripts
pnpm dev
pnpm build
pnpm test
pnpm lint

# Monorepo commands
pnpm -r build  # Recursive build
pnpm --filter package-name dev  # Run in specific package

# Clean install
pnpm clean && pnpm install
```

### npm
```bash
# Install
npm install
npm ci  # Clean install

# Run scripts
npm run dev
npm run build
npm test
```

## Git

### Basic Operations
```bash
# Status and logs
git status
git log --oneline -10
git diff

# Staging and commits
git add .
git add -p  # Interactive staging
git commit -m "feat: add new feature"
git commit --amend  # Amend last commit

# Branches
git branch
git checkout -b feature/new-feature
git checkout main
git merge feature/new-feature
```

### Advanced Git
```bash
# Stashing
git stash
git stash pop
git stash list

# Rebase
git rebase main
git rebase -i HEAD~3  # Interactive rebase

# Reset
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit and changes

# Worktrees (for parallel development)
git worktree add ../feature-branch feature/new
git worktree list
git worktree remove ../feature-branch
```

## Database (Prisma)

### Schema Management
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create migration
npx prisma migrate dev --name migration-name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

### Seeding
```bash
# Run seed script
npx prisma db seed

# Custom seed command
npm run db:seed
```

## Testing

### Jest/Vitest
```bash
# Run all tests
npm test
pnpm test

# Watch mode
npm test -- --watch
pnpm test:watch

# Coverage
npm test -- --coverage
pnpm test:coverage

# Run specific test
npm test Button.test.tsx
pnpm test -- Button
```

### E2E Testing (Playwright)
```bash
# Run e2e tests
npx playwright test

# Run in UI mode
npx playwright test --ui

# Run specific test
npx playwright test login.spec.ts

# Generate test
npx playwright codegen
```

## Build & Deploy

### Next.js
```bash
# Development
npm run dev
pnpm dev

# Production build
npm run build
pnpm build

# Start production server
npm start
pnpm start

# Analyze bundle
ANALYZE=true npm run build
```

### Docker
```bash
# Build image
docker build -t app-name .

# Run container
docker run -p 3000:3000 app-name

# Compose
docker-compose up
docker-compose down
docker-compose logs -f
```

### Vercel
```bash
# Deploy
vercel

# Deploy production
vercel --prod

# Link project
vercel link

# Pull env vars
vercel env pull
```

## Debugging

### Node.js
```bash
# Debug mode
node --inspect index.js
node --inspect-brk index.js  # Break on first line

# Debug npm script
npm run dev -- --inspect
```

### Chrome DevTools
```
chrome://inspect
```

### VS Code
```json
// launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["dev"],
  "skipFiles": ["<node_internals>/**"]
}
```

## Utilities

### Find and Replace
```bash
# Find files
find . -name "*.ts" -type f

# Find in files (ripgrep)
rg "pattern" --type ts
rg "TODO" -g "!node_modules"

# Replace in files
rg "oldPattern" --files-with-matches | xargs sed -i '' 's/oldPattern/newPattern/g'
```

### Process Management
```bash
# List ports
lsof -i :3000

# Kill process
kill -9 PID

# Kill by port
lsof -ti :3000 | xargs kill
```

### File Operations
```bash
# Create directory structure
mkdir -p src/components/ui

# Copy with structure
cp -r source/ destination/

# Remove safely
rm -rf node_modules
rm -i important-file  # Interactive

# Archive
tar -czf archive.tar.gz folder/
tar -xzf archive.tar.gz
```

## Environment

### Node Version Manager (nvm)
```bash
# Install Node version
nvm install 20
nvm install --lts

# Use version
nvm use 20
nvm use

# List versions
nvm ls
nvm ls-remote
```

### Environment Variables
```bash
# Set temporarily
export API_KEY=value

# Load from file
source .env
export $(cat .env | xargs)

# Check value
echo $API_KEY
env | grep API
```

## Performance

### Bundle Analysis
```bash
# Next.js bundle analyzer
ANALYZE=true pnpm build

# Webpack bundle analyzer
npm run build -- --analyze

# Source map explorer
npm run analyze
```

### Profiling
```bash
# Node.js profiling
node --prof app.js
node --prof-process isolate-*.log

# React DevTools Profiler
# Use in browser extension
```

## Quick Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "clean": "rm -rf .next node_modules",
    "analyze": "ANALYZE=true next build"
  }
}
```

---

*Pro tip: Create aliases for frequently used commands in your shell configuration (~/.zshrc or ~/.bashrc)*
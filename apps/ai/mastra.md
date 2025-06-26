# Comprehensive Mastra Implementation Guide

This guide provides detailed implementation patterns for building production-ready AI applications with Mastra, covering all 15 requested areas with practical code examples and configurations.

## 1. Latest Mastra Version & AI SDK v5 Beta Compatibility

**Current Status:**
- **Latest stable version**: 0.10.6 (@mastra/core)
- **AI SDK Integration**: Currently uses AI SDK v4.2.2
- **v5 Beta Compatibility**: Not yet available - framework preparing for migration

```typescript
// Current stable setup
npm install @mastra/core@latest zod @ai-sdk/openai

// Basic agent implementation with current AI SDK
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

const agent = new Agent({
  name: "assistant",
  instructions: "You are a helpful AI assistant",
  model: openai("gpt-4o-mini"),
  tools: { /* your tools */ }
});

// Streaming implementation
const stream = await agent.stream(messages);
return stream.toDataStreamResponse();
```

## 2. Best Practices for Vercel Deployment

**Native Vercel Deployer:**
```typescript
import { Mastra } from "@mastra/core";
import { VercelDeployer } from "@mastra/deployer-vercel";
import { PinoLogger } from "@mastra/loggers";

export const mastra = new Mastra({
  agents: { /* your agents */ },
  workflows: { /* your workflows */ },
  tools: { /* your tools */ },
  logger: new PinoLogger({
    name: "MyMastraApp",
    level: "info"
  }),
  deployer: new VercelDeployer({
    teamSlug: "your-team-slug",
    projectName: "your-project-name", 
    token: process.env.VERCEL_TOKEN,
  })
});
```

**Generated vercel.json:**
```json
{
  "version": 2,
  "installCommand": "npm install --omit=dev",
  "builds": [
    {
      "src": "index.mjs",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.mjs"
    }
  ],
  "functions": {
    "api/agents/**": {
      "runtime": "nodejs18.x",
      "memory": 512,
      "maxDuration": 30
    }
  }
}
```

## 3. Neon Postgres Integration

**Complete Setup with Memory and Vector Storage:**
```typescript
import { Memory } from "@mastra/memory";
import { PostgresStore, PgVector } from "@mastra/pg";
import { Agent } from "@mastra/core/agent";

// Neon connection string with pooler
const connectionString = "postgresql://user:password@ep-project-id-pooler.region.aws.neon.tech/database?sslmode=require";

// Initialize memory with PostgreSQL storage and vector search
const memory = new Memory({
  storage: new PostgresStore({
    connectionString,
    schemaName: "mastra_memory"
  }),
  vector: new PgVector({
    connectionString
  }),
  options: {
    lastMessages: 10,
    semanticRecall: {
      topK: 3,
      messageRange: 2,
    },
  },
});

// Create agent with persistent memory
const agent = new Agent({
  name: "aiAgent",
  instructions: "You are a helpful AI assistant",
  model: openai("gpt-4o-mini"),
  memory,
});
```

**Database Schema (Auto-created):**
```sql
-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  thread_id VARCHAR(255) NOT NULL,
  resource_id VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vector embeddings with HNSW index
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops)
WITH (m = 32, ef_construction = 64);
```

## 4. XML Prompt Organization (Anthropic Standards)

**Structured XML Templates:**
```typescript
const ragAgent = new Agent({
  name: "Expert RAG Assistant",
  instructions: `
    <role>
    You are an expert research assistant specializing in document analysis.
    </role>
    
    <capabilities>
    - Use the vector search tool to find relevant context
    - Analyze retrieved information systematically
    - Provide structured, accurate responses
    - Cite sources when available
    </capabilities>
    
    <response_format>
    <analysis>
    Your step-by-step reasoning
    </analysis>
    
    <sources>
    Relevant sources and citations
    </sources>
    
    <answer>
    Final comprehensive answer
    </answer>
    </response_format>
    
    <guidelines>
    - Always search for relevant context before answering
    - If context is insufficient, explicitly state this
    - Prioritize accuracy over completeness
    </guidelines>
  `,
  model: openai("gpt-4o-mini"),
  tools: { vectorQueryTool }
});
```

## 5. RAG Implementation Patterns

**Document Processing and Chunking:**
```typescript
import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

// Process documents with advanced chunking
const doc = MDocument.fromText("Your document content...");
const chunks = await doc.chunk({
  strategy: "recursive",  // Options: recursive, sliding, markdown
  size: 512,             // Chunk size in tokens
  overlap: 50,           // Overlap between chunks
  separator: "\n",       
  extract: {
    metadata: true,      // Extract metadata using LLM
    summary: true,       // Generate summaries
    keywords: true       // Extract keywords
  }
});

// Generate embeddings
const { embeddings } = await embedMany({
  model: openai.embedding("text-embedding-3-small", {
    dimensions: 1536
  }),
  values: chunks.map(chunk => chunk.text)
});

// Store in vector database
await pgVector.upsert({
  indexName: "knowledge_base",
  vectors: embeddings.map((embedding, i) => ({
    id: chunks[i].id,
    vector: embedding,
    metadata: chunks[i].metadata,
    content: chunks[i].text
  }))
});
```

**RAG Tool Implementation:**
```typescript
import { createVectorQueryTool } from "@mastra/rag";

const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  indexName: "knowledge_base",
  model: openai.embedding("text-embedding-3-small"),
  searchParams: {
    topK: 15,
    threshold: 0.75
  }
});
```

## 6. Bundle Optimization for Vercel

**Optimization Techniques:**
```typescript
// Use subpath imports for tree shaking
import { Agent } from "@mastra/core/agent";
import { Workflow } from "@mastra/core/workflow";
import { Tool } from "@mastra/core/tool";

// package.json optimization
{
  "name": "my-mastra-app",
  "sideEffects": false,
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  }
}

// Rollup configuration
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    terser()
  ],
  external: ['@mastra/core']
};
```

## 7. Memory System Configuration

**Advanced Memory Configuration:**
```typescript
const memory = new Memory({
  storage: new PostgresStore({
    connectionString: process.env.DATABASE_URL,
    schemaName: "production_memory"
  }),
  options: {
    lastMessages: 20,
    workingMemory: {
      enabled: true,
      template: `
        <context>
          <user_preferences>
            {{preferences}}
          </user_preferences>
          <conversation_goals>
            {{goals}}
          </conversation_goals>
        </context>
      `
    },
    semanticRecall: {
      enabled: true,
      topK: 5,
      messageRange: 2
    }
  }
});

// Masked streaming to hide memory updates
import { maskStreamTags } from "@mastra/core/utils";

const maskedStream = maskStreamTags(response.textStream, "working_memory", {
  onStart: () => console.log("Updating memory..."),
  onEnd: () => console.log("Memory updated"),
  onMask: (content) => console.log("Hidden content:", content)
});
```

## 8. Tool Registry & MCP Server Integration

**Tool Definition Pattern:**
```typescript
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const weatherTool = createTool({
  id: "get-weather",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City name")
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async ({ context, runtimeContext }, { abortSignal }) => {
    const temperatureUnit = runtimeContext.get("temperature-scale");
    // Implementation with abort signal support
    return { output: "The weather is sunny" };
  }
});
```

**MCP Server Integration:**
```typescript
import { MCPClient } from "@mastra/mcp";

const mcp = new MCPClient({
  servers: {
    filesystem: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", "/path"],
    },
    weather: {
      url: new URL("https://weather-api.com/sse"),
      requestInit: {
        headers: { Authorization: "Bearer token" }
      }
    }
  },
  timeout: 30000
});

// Dynamic tool loading
const tools = await mcp.getTools();
```

## 9. Runtime Context for Multi-Tenant Applications

**Multi-Tenant Configuration:**
```typescript
import { RuntimeContext } from "@mastra/core/di";

type TenantContext = {
  "tenant-id": string;
  "user-tier": "free" | "premium";
  "locale": string;
};

// Middleware for tenant isolation
export const mastra = new Mastra({
  server: {
    middleware: [
      async (c, next) => {
        const tenantId = c.req.header("X-Tenant-ID");
        const runtimeContext = c.get("runtimeContext");
        runtimeContext.set("tenant-id", tenantId);
        await next();
      }
    ]
  }
});

// Dynamic agent per tenant
const dynamicAgent = new Agent({
  tools: ({ runtimeContext }) => {
    const tier = runtimeContext.get("user-tier");
    return tier === "premium" ? premiumTools : basicTools;
  },
  model: ({ runtimeContext }) => {
    const tier = runtimeContext.get("user-tier");
    return tier === "premium" ? openai('gpt-4') : openai('gpt-3.5-turbo');
  }
});
```

## 10. Production Deployment Configurations

**Complete Production Setup:**
```typescript
import { Mastra } from "@mastra/core";
import { PostgresStore, PgVector } from "@mastra/pg";
import { PinoLogger } from "@mastra/loggers";

export const mastra = new Mastra({
  storage: new PostgresStore({
    connectionString: process.env.DATABASE_URL,
    schemaName: "mastra_prod"
  }),
  logger: new PinoLogger({
    name: "MastraApp",
    level: process.env.LOG_LEVEL || "info"
  }),
  telemetry: {
    serviceName: "mastra-production",
    enabled: true,
    sampling: {
      type: "parent_based",
      root: { probability: 0.05 }
    },
    export: {
      type: "otlp",
      endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      headers: JSON.parse(process.env.OTEL_EXPORTER_OTLP_HEADERS || '{}')
    }
  },
  server: {
    port: 4111,
    host: 'localhost',
    cors: {
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: false
    },
    build: {
      openAPIDocs: true,
      swaggerUI: true
    }
  }
});
```

## 11. Error Handling and Retry Strategies

**Exponential Backoff Implementation:**
```typescript
import { createStep, createWorkflow } from '@mastra/core/workflows';

const resilientApiStep = createStep({
  id: 'api-call',
  execute: async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  },
  retryConfig: {
    attempts: 5,
    delay: 1000,
    backoffStrategy: 'exponential'
  }
});

// Circuit breaker pattern
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}
```

## 12. Telemetry and Monitoring Setup

**OpenTelemetry Configuration:**
```typescript
import { Mastra } from '@mastra/core';
import { PinoLogger } from '@mastra/loggers';

export const mastra = new Mastra({
  telemetry: {
    serviceName: "mastra-app",
    enabled: true,
    sampling: {
      type: "ratio",
      probability: 0.1, // Sample 10% of traces
    },
    export: {
      type: "otlp",
      endpoint: "http://localhost:4318",
      headers: {
        'x-api-key': process.env.OTEL_API_KEY
      }
    }
  },
  logger: new PinoLogger({
    name: 'MastraApp',
    level: 'info',
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => ({
        pid: bindings.pid,
        hostname: bindings.hostname,
        service: 'mastra-app',
        version: process.env.APP_VERSION
      })
    }
  })
});

// Custom metrics
import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('mastra-app');
const workflowCounter = meter.createCounter('workflow_executions_total');
const workflowDuration = meter.createHistogram('workflow_duration_seconds');
```

## 13. Security Best Practices

**API Key Management:**
```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

class SecretManager {
  private client = new SecretsManagerClient({ region: 'us-east-1' });
  private cache = new Map<string, { value: string; expiry: number }>();
  
  async getSecret(secretName: string): Promise<string> {
    const cached = this.cache.get(secretName);
    if (cached && cached.expiry > Date.now()) {
      return cached.value;
    }
    
    const command = new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: 'AWSCURRENT'
    });
    
    const response = await this.client.send(command);
    const secret = response.SecretString;
    
    // Cache for 5 minutes
    this.cache.set(secretName, {
      value: secret,
      expiry: Date.now() + 300000
    });
    
    return secret;
  }
}

// Rate limiting
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

const createRateLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rl:',
    }),
    windowMs,
    max,
    standardHeaders: true,
    keyGenerator: (req) => {
      return req.headers['x-api-key'] as string || req.ip;
    }
  });
};

// Security headers
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openai.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 14. Client Application Integration

**Mastra Client SDK:**
```typescript
import { MastraClient } from "@mastra/client";

const client = new MastraClient({
  baseUrl: "http://localhost:4111",
  retries: 3,
  backoffMs: 300,
  headers: { "Authorization": "Bearer token" }
});

// Type-safe agent interaction
const agent = client.getAgent("agent-id");
const response = await agent.generate({
  messages: [{ role: "user", content: "Hello" }]
});

// React integration with AI SDK
import { useChat } from "ai/react";

const { messages, input, handleInputChange, handleSubmit } = useChat({ 
  api: '/api/chat' // Mastra agent endpoint
});
```

## 15. Streaming and Real-time Features

**Server-Side Streaming:**
```typescript
// Agent streaming
const stream = await agent.stream("What's the weather?", {
  onStepFinish: (step) => console.log("Step completed:", step),
  abortSignal: controller.signal
});

// Data stream with annotations
import { createDataStream } from "ai";

const stream = createDataStream({
  async execute(dataStream) {
    dataStream.writeData({ value: "Processing..." });
    
    dataStream.writeMessageAnnotation({ 
      type: "status", 
      value: "processing" 
    });
    
    const agentStream = await agent.stream("Query");
    agentStream.mergeIntoDataStream(dataStream);
  }
});
```

**Real-time Voice Integration:**
```typescript
import { OpenAIRealtimeVoice } from "@mastra/voice-openai-realtime";

const voice = new OpenAIRealtimeVoice({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini-realtime", 
  speaker: "alloy"
});

const voiceAgent = new Agent({
  name: "Voice Assistant",
  instructions: "You are a voice assistant",
  model: openai("gpt-4o"),
  voice
});

// WebSocket connection
await voiceAgent.voice.connect();
voiceAgent.voice.speak("Hello!");
```

## Directory Structure

```
mastra-app/
├── .github/
│   └── workflows/
│       ├── production.yml
│       └── preview.yml
├── src/
│   ├── mastra/
│   │   ├── index.ts
│   │   ├── agents/
│   │   │   ├── assistant.ts
│   │   │   └── rag-agent.ts
│   │   ├── workflows/
│   │   │   └── data-processing.ts
│   │   └── tools/
│   │       ├── weather.ts
│   │       └── search.ts
│   └── api/
│       ├── agents/
│       │   └── [agentId]/
│       │       └── route.ts
│       └── health/
│           └── route.ts
├── .env.production
├── .env.local
├── next.config.ts
├── package.json
├── rollup.config.js
├── vercel.json
└── tsconfig.json
```

## Environment Variables

```bash
# .env.production
# AI Provider Keys
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...

# Database
DATABASE_URL=postgresql://user:pass@ep-project-pooler.region.aws.neon.tech/db?sslmode=require
DIRECT_URL=postgresql://user:pass@ep-project.region.aws.neon.tech/db?sslmode=require

# Monitoring
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.region.signoz.cloud:443
OTEL_EXPORTER_OTLP_HEADERS=signoz-ingestion-key=your_token

# Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=team_id
VERCEL_PROJECT_ID=project_id

# Application
NODE_ENV=production
LOG_LEVEL=info
MASTRA_CONCURRENCY=4
```

## Deployment Scripts

```json
// package.json
{
  "scripts": {
    "dev": "mastra dev",
    "build": "mastra build && npm run build:next",
    "deploy": "vercel --prod",
    "deploy:preview": "vercel",
    "db:migrate": "npx prisma migrate deploy",
    "db:seed": "npx prisma db seed"
  }
}
```

## GitHub Actions CI/CD

```yaml
# .github/workflows/production.yml
name: Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build Mastra application
        run: npx mastra build
        
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
        
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Production Checklist

### Pre-deployment
- [ ] Configure all environment variables
- [ ] Set up Neon database with pgvector extension
- [ ] Configure API key management (AWS Secrets Manager)
- [ ] Set up monitoring (OpenTelemetry/SigNoz)
- [ ] Configure rate limiting
- [ ] Implement security headers

### Deployment
- [ ] Run database migrations
- [ ] Deploy with Vercel deployer
- [ ] Verify health endpoints
- [ ] Test streaming functionality
- [ ] Monitor error rates

### Post-deployment
- [ ] Set up alerting rules
- [ ] Configure log retention
- [ ] Schedule security audits
- [ ] Monitor performance metrics
- [ ] Set up backup strategies

This comprehensive guide provides production-ready implementation patterns optimized for Vercel deployment with Neon Postgres, following best practices for security, performance, and scalability.

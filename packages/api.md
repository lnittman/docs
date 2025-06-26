## Guide: Building a Shared, Type-Safe API Service Layer


This document outlines the architecture and implementation of a shared API service layer within a Turborepo monorepo. This pattern centralizes business logic, ensures type safety with Zod and Prisma, and provides a clean, maintainable interface for all applications (`apps/app`, `apps/api`) that interact with the database and external services.
### Core Architecture

The `@repo/api` package is designed with a clear separation of concerns:

1.  **`schemas/`**: Defines the shape of your data using Zod. These schemas are the single source of truth for data validation, input/output types, and are used across services and API routes.
2.  **`services/`**: Contains the core business logic. Each service class encapsulates all operations for a specific data entity (e.g., `WebsService`, `SpaceService`). They are the only part of the application that should directly interact with the database.
3.  **`utils/`**: Provides higher-order functions and utilities for standardizing API behavior, such as authentication checks, error handling, and response formatting.
4.  **`constants/`**: Holds shared constants like default values and error message templates to ensure consistency.

This structure ensures that your frontend applications remain lean and focused on presentation, while all complex logic is centralized, reusable, and easy to test.

---

### Step 1: Package Setup

Create a new package named `api` in your `packages` directory.

`packages/api/package.json`
```json
{
  "name": "@repo/api",
  "version": "0.0.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": { "import": "./index.ts" },
    "./utils/*": { "import": "./utils/*.ts" },
    "./constants": { "import": "./constants/index.ts" }
  },
  "dependencies": {
    "@repo/auth": "workspace:*",
    "@repo/cache": "workspace:*",
    "@repo/database": "workspace:*",
    "@mastra/client-js": "...",
    "server-only": "...",
    "zod": "..."
  },
  ...
}
```
> **Note**: This package uses `server-only` to ensure its code is never accidentally bundled into a client-side application, which is a critical security and performance measure.

---

### Step 2: Defining Data Schemas with Zod

The `schemas/` directory is the foundation of your type-safe API. For each database model, create a corresponding schema file.

**Example: `schemas/web.ts`**

```typescript
import { z } from 'zod';

// Define enums to match your database
export const webStatusSchema = z.enum(['PENDING', 'PROCESSING', 'COMPLETE', 'FAILED']);

// Define the main entity schema, mirroring the Prisma model
export const webSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  url: z.string().url(),
  urls: z.array(z.string().url()),
  title: z.string().nullable(),
  status: webStatusSchema,
  createdAt: z.string(),
  // ... other fields
});

// Infer the TypeScript type directly from the Zod schema
export type Web = z.infer<typeof webSchema>;

// Define schemas for specific operations (e.g., creation, updates)
export const createWebSchema = z.object({
  url: z.string().url('Invalid URL format'),
  urls: z.array(z.string().url('Invalid URL format')).optional(),
  prompt: z.string().optional(),
  userId: z.string(),
});

export type CreateWeb = z.infer<typeof createWebSchema>;
```

**Best Practice**: Create a `schemas/user/` subdirectory to group all user-related settings schemas (`ai.ts`, `appearance.ts`, etc.), keeping the structure organized as your application grows.

---

### Step 3: Building the Service Layer

The `services/` directory abstracts all data operations. Each service class is responsible for one entity.

**Key Responsibilities of a Service:**

*   Perform CRUD (Create, Read, Update, Delete) operations.
*   Interact directly with the database (`@repo/database`).
*   Handle data serialization (e.g., converting `Date` objects to ISO strings).
*   Implement caching logic (`@repo/cache`).
*   Integrate with external services (e.g., the Mastra AI service).

**Example: `services/web.ts`**

```typescript
import 'server-only';
import { database } from '@repo/database';
import { cache, cacheKeys } from '@repo/cache';
import { createWebSchema, type Web } from '../schemas/web';

export class WebsService {
  /**
   * List all webs for a user with caching.
   */
  async listWebs(userId: string): Promise<Web[]> {
    const cacheKey = cacheKeys.userWebs(userId);
    const cached = await cache.get<Web[]>(cacheKey);
    if (cached) return cached;

    const webs = await database.web.findMany({ where: { userId } });
    const serialized = webs.map(w => this.serializeWeb(w));
    
    await cache.set(cacheKey, serialized, 900); // Cache for 15 minutes
    return serialized;
  }

  /**
   * Create a new web.
   */
  async createWeb(input: unknown): Promise<Web> {
    const data = createWebSchema.parse(input);
    const domain = new URL(data.url).hostname.replace('www.', '');

    const web = await database.web.create({
      data: {
        ...data,
        urls: data.urls || [data.url],
        domain,
        status: 'PENDING',
      },
    });

    // Invalidate the cache for the user's web list
    await cache.invalidate(cacheKeys.userWebs(data.userId));
    return this.serializeWeb(web);
  }

  // ...other methods like updateWeb, deleteWeb, etc.

  /**
   * Serialize web data to ensure consistent API responses.
   */
  private serializeWeb(web: any): Web {
    return {
      ...web,
      createdAt: web.createdAt.toISOString(),
      updatedAt: web.updatedAt.toISOString(),
      // Ensure arrays are not null
      topics: web.topics || [],
      insights: web.insights || [],
    };
  }
}

export const websService = new WebsService();
```

---

### Step 4: Implementing Standardized API Utilities

The `utils/` directory contains higher-order functions (HOCs) and helpers to standardize how your API routes and server actions behave.

*   **`response.ts`**: Creates a consistent JSON envelope for all API responses.

    ```typescript
    export class ApiResponse {
      static success<T>(data: T, status = 200) {
        return NextResponse.json({ success: true, data }, { status });
      }
      static error(error: ApiError) {
        return NextResponse.json({ success: false, error: { ... } }, { status: error.status });
      }
    }
    ```

*   **`error.ts`**: Defines a custom `ApiError` class for structured error handling.

    ```typescript
    export class ApiError extends Error {
      constructor(code: ErrorType, message?: string, details?: any) { ... }
    }
    ```

*   **`auth.ts`**: A HOC (`withAuthenticatedUser`) that wraps API route handlers to ensure a user is authenticated before executing the logic.

    ```typescript
    export function withAuthenticatedUser(handler) {
      return async (request, context) => {
        const { userId } = await auth();
        if (!userId) {
          throw new ApiError(ErrorType.AUTHENTICATION);
        }
        return handler(request, { ...context, userId });
      };
    }
    ```

*   **`validation.ts`**: Helpers for validating request bodies and query parameters using Zod schemas.

---

### Step 5: Integrating with the Mastra AI Service

Your `@repo/api` package acts as the client for your `apps/ai` service. This is a clean way to handle inter-service communication.

`services/mastra/workflow.ts`
```typescript
import 'server-only';
import { MastraClient } from '@mastra/client-js';

const mastra = new MastraClient({
  baseUrl: process.env.NEXT_PUBLIC_AI_URL,
});

export class MastraWorkflowService {
  async triggerAnalyzeWeb(data: WorkflowAnalysisData): Promise<string> {
    const workflow = mastra.getWorkflow('analyzeWeb');
    const run = await workflow.createRun();
    workflow.startAsync({ runId: run.runId, inputData: data });
    return run.runId;
  }

  async streamWorkflowExecution(workflowId: string, runId: string): Promise<ReadableStream> {
    const response = await mastra.request(
      `/api/workflows/${workflowId}/watch?runId=${runId}`,
      { stream: true, headers: { Accept: 'text/event-stream' } }
    );
    // ... error handling
    return response.body!;
  }
}

export const mastraWorkflowService = new MastraWorkflowService();
```

---

### Step 6: Exposing the Public API

The root `index.ts` file of the package serves as the main entry point. It should export all the necessary services, schemas, types, and utilities for the applications to consume.

`packages/api/index.ts`
```typescript
// Export all API services
export { websService } from './services/web';
export { spaceService } from './services/space';
// ... other services

// Export all schemas and their types
export * from './schemas/web';
export * from './schemas/space';
// ... other schemas

// Export utilities
export { withAuthenticatedUser } from './utils/auth';
export { ApiResponse, withErrorHandling } from './utils/response';
// ... other utils
```


# Common Application Patterns
**Version**: 1.0.0  
**Last Updated**: 2025-01-02  
**Purpose**: Reusable patterns for modern application development

## Table of Contents

1. [State Management](#state-management)
2. [API Patterns](#api-patterns)
3. [Error Handling](#error-handling)
4. [Authentication](#authentication)
5. [Performance](#performance)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [Deployment](#deployment)

## Design Philosophy & Principles

These patterns are informed by timeless design principles and modern development philosophies:

### Core Influences
- **[Dieter Rams](../inspo/dieter-rams/)** - "Less, but better" applied to code
- **[John Maeda](../inspo/design-and-aesthetics/john-maeda/)** - Laws of Simplicity in software design
- **[Martin Fowler](../inspo/software-architecture/martin-fowler/)** - Evolutionary architecture and refactoring
- **[Kent Beck](../inspo/software-architecture/kent-beck/)** - Simple design and test-driven development
- **[Andrej Karpathy](../inspo/ai-and-modern-development/andrej-karpathy/)** - Software 2.0 paradigm

### Applied Principles
1. **Simplicity First** (Rams, Maeda): Start with the simplest solution that works
2. **Progressive Enhancement** (Beck): Add complexity only when proven necessary
3. **Human-Centered** (Norman): Design for developer experience and end-user needs
4. **Transparent Architecture** (Mastra Team): Make system behavior observable and debuggable
5. **Incremental & Iterative** (Vercel AI SDK): Build small, test, then scale

## State Management

### React Server Components + Client State

```typescript
// Server Component (data fetching)
export default async function PageLayout() {
  const data = await fetchData() // Direct DB/API call
  
  return (
    <ClientBoundary initialData={data}>
      <InteractiveComponents />
    </ClientBoundary>
  )
}

// Client Component (interactivity)
'use client'
export function InteractiveComponents({ initialData }) {
  // UI state with Jotai
  const [uiState, setUiState] = useAtom(uiStateAtom)
  
  // Server state with SWR
  const { data, mutate } = useSWR('/api/data', fetcher, {
    fallbackData: initialData
  })
  
  return <>{/* Interactive UI */}</>
}
```

### State Management Rules

1. **Server State**: SWR for caching and revalidation
2. **UI State**: Jotai atoms for reactive UI
3. **Form State**: React Hook Form + Zod validation
4. **Global State**: Context only for truly global data (user, theme)

### Optimistic Updates Pattern

```typescript
const updateData = async (newData: Data) => {
  // Optimistic update
  mutate(newData, false)
  
  try {
    // Actual update
    const updated = await api.update(newData)
    // Revalidate with server data
    mutate(updated)
  } catch (error) {
    // Revert on error
    mutate()
    throw error
  }
}
```

## API Patterns

### RESTful API Design

```typescript
// Server Actions (Next.js App Router)
export async function createResource(formData: FormData) {
  'use server'
  
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  
  const validated = schema.parse({
    name: formData.get('name'),
    // ... other fields
  })
  
  const resource = await db.resource.create({
    data: { ...validated, userId }
  })
  
  revalidatePath('/resources')
  return resource
}
```

### API Route Pattern

```typescript
// app/api/resources/[id]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const resource = await getResource(params.id, userId)
    if (!resource) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(resource)
  } catch (error) {
    return handleApiError(error)
  }
}
```

### Error Response Standard

```typescript
interface ApiError {
  error: string
  code?: string
  details?: Record<string, any>
  timestamp: string
}

function handleApiError(error: unknown): NextResponse<ApiError> {
  console.error('API Error:', error)
  
  if (error instanceof ZodError) {
    return NextResponse.json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.errors,
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }
  
  // Default error
  return NextResponse.json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  }, { status: 500 })
}
```

## Error Handling

### Error Boundary Pattern

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error)
  }, [error])
  
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Try-Catch Wrapper Pattern

```typescript
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context: string
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn()
    return [result, null]
  } catch (error) {
    console.error(`Error in ${context}:`, error)
    return [null, error as Error]
  }
}

// Usage
const [data, error] = await withErrorHandling(
  () => fetchData(id),
  'fetchData'
)

if (error) {
  // Handle error
}
```

## Authentication

### Clerk Integration Pattern

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/protected(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

// In Server Components
import { auth } from '@clerk/nextjs/server'

export default async function ProtectedPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  // Fetch user-specific data
  const userData = await getUserData(userId)
  
  return <>{/* Protected content */}</>
}
```

### Role-Based Access Pattern

```typescript
// lib/auth/permissions.ts
export async function checkPermission(
  userId: string,
  resource: string,
  action: string
): Promise<boolean> {
  const user = await getUser(userId)
  const role = user.role
  
  const permissions = {
    admin: ['*'],
    editor: ['read', 'write', 'delete'],
    viewer: ['read']
  }
  
  return permissions[role]?.includes(action) || 
         permissions[role]?.includes('*') || 
         false
}

// Usage in API route
if (!await checkPermission(userId, 'posts', 'write')) {
  return NextResponse.json(
    { error: 'Forbidden' },
    { status: 403 }
  )
}
```

## Performance

### Image Optimization Pattern

```typescript
import Image from 'next/image'

export function OptimizedImage({ 
  src, 
  alt, 
  priority = false 
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority={priority}
      placeholder="blur"
      blurDataURL={generateBlurDataURL()}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### Data Loading Pattern

```typescript
// Parallel data loading
export default async function DashboardPage() {
  // Start all queries in parallel
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics()
  ])
  
  return (
    <Dashboard 
      user={user}
      posts={posts}
      analytics={analytics}
    />
  )
}

// Streaming with Suspense
export default function StreamingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </>
  )
}
```

### Caching Strategies

```typescript
// Redis caching pattern
import { redis } from '@/lib/redis'

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600 // 1 hour default
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached)
  }
  
  // Fetch fresh data
  const fresh = await fetcher()
  
  // Cache for next time
  await redis.setex(key, ttl, JSON.stringify(fresh))
  
  return fresh
}
```

## Testing

### Component Testing Pattern

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('can be disabled', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

### API Testing Pattern

```typescript
// __tests__/api/resources.test.ts
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/resources/route'

describe('/api/resources', () => {
  it('GET returns resources', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    
    await GET(req)
    
    expect(res._getStatusCode()).toBe(200)
    const json = JSON.parse(res._getData())
    expect(Array.isArray(json)).toBe(true)
  })
  
  it('POST creates resource', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test Resource'
      }
    })
    
    await POST(req)
    
    expect(res._getStatusCode()).toBe(201)
    const json = JSON.parse(res._getData())
    expect(json.name).toBe('Test Resource')
  })
})
```

## Documentation

### Self-Documenting Code Pattern

```typescript
/**
 * Fetches user data with caching and error handling
 * @param userId - The unique identifier of the user
 * @param options - Configuration options
 * @returns User data or null if not found
 * @throws {AuthError} If user is not authenticated
 * @example
 * ```typescript
 * const user = await fetchUser('user_123', { 
 *   includeMetadata: true 
 * })
 * ```
 */
export async function fetchUser(
  userId: string,
  options: FetchUserOptions = {}
): Promise<User | null> {
  // Implementation
}
```

### README Pattern

```markdown
# Component Name

## Overview
Brief description of what this component does and why it exists.

## Installation
\`\`\`bash
npm install package-name
\`\`\`

## Usage
\`\`\`typescript
import { Component } from 'package-name'

export function Example() {
  return <Component prop="value" />
}
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |
| prop2? | number | 0 | Optional prop |

## Examples
[Working examples with common use cases]

## API Reference
[Detailed API documentation]
```

## Deployment

### Environment Configuration Pattern

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  // ... other env vars
})

export const env = envSchema.parse(process.env)

// Usage
import { env } from '@/lib/env'
console.log(env.DATABASE_URL) // Type-safe
```

### Feature Flags Pattern

```typescript
// lib/features.ts
export const features = {
  newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
  aiIntegration: process.env.FEATURE_AI === 'true',
  // ... other features
} as const

// Usage
import { features } from '@/lib/features'

export function Dashboard() {
  if (features.newDashboard) {
    return <NewDashboard />
  }
  return <LegacyDashboard />
}
```

### Health Check Pattern

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    server: 'ok',
    database: 'unknown',
    redis: 'unknown',
  }
  
  // Check database
  try {
    await db.$queryRaw`SELECT 1`
    checks.database = 'ok'
  } catch {
    checks.database = 'error'
  }
  
  // Check Redis
  try {
    await redis.ping()
    checks.redis = 'ok'
  } catch {
    checks.redis = 'error'
  }
  
  const allOk = Object.values(checks).every(s => s === 'ok')
  
  return NextResponse.json(
    { 
      status: allOk ? 'healthy' : 'unhealthy',
      checks,
      timestamp: new Date().toISOString()
    },
    { status: allOk ? 200 : 503 }
  )
}
```

---

*These patterns are battle-tested and optimized for modern web development. Adapt them to your specific needs while maintaining their core principles.*
## Guide: Implementing Custom Authentication with Clerk Elements in a Next.js Turborepo

This guide provides a complete walkthrough for setting up a robust, scalable, and customizable authentication system in a Next.js Turborepo monorepo using Clerk. It focuses on creating a custom UI with Clerk Elements and structuring the application using App Router's route groups for a clean separation between public and private routes.

### Core Architecture

This pattern achieves the following:

*   **Shared Auth Logic**: A dedicated `@repo/auth` package centralizes all authentication configuration, components, and utilities.
*   **Custom UI**: Full control over the look and feel of sign-in and sign-up forms using Clerk Elements, ensuring brand consistency.
*   **Protected Routes**: A clear and secure separation of authenticated and unauthenticated routes using Next.js Middleware and route groups.
*   **Type Safety**: Environment variables are validated and typed using `@t3-oss/env-nextjs`.

---

### Step 1: Prerequisites & Setup

Before you begin, ensure you have a Clerk account and have created a new application to get your API keys.

1.  **Install Dependencies**:
    In your monorepo's root, install the necessary packages.

    ```bash
    pnpm add @clerk/nextjs @clerk/elements @clerk/themes next-themes zod @t3-oss/env-nextjs
    ```

2.  **Environment Variables**:
    You will need the following keys from your Clerk dashboard. Add them to the `.env.local` file in your Next.js app (e.g., `apps/app/.env.local`).

    ```env
    # Clerk Server Keys
    CLERK_SECRET_KEY="sk_..."

    # Clerk Client Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
    ```

---

### Step 2: Create the Shared `@repo/auth` Package

This package will be the single source of truth for authentication logic across your monorepo.

1.  **Create the Package**:
    If it doesn't exist, create a new package using Turbo's generator or manually.

    ```bash
    turbo gen init
    # Follow prompts, enter "auth" as the package name
    ```

2.  **Define `package.json`**:
    The package should include dependencies for Clerk and React.

    `packages/auth/package.json`
    ```json
    {
      "name": "@repo/auth",
      "version": "0.0.0",
      "private": true,
      "scripts": { ... },
      "dependencies": {
        "@clerk/elements": "^0.23.29",
        "@clerk/nextjs": "*",
        "@clerk/themes": "^2.2.31",
        "@t3-oss/env-nextjs": "^0.13.4",
        "next-themes": "^0.4.6",
        "react": "^19.1.0",
        "server-only": "^0.0.1",
        "zod": "^3.25.50"
      },
      ...
    }
    ```

3.  **Type-Safe Environment Variables**:
    Define a schema to validate and type your environment variables.

    `packages/auth/keys.ts`
    ```typescript
    import { createEnv } from '@t3-oss/env-nextjs';
    import { z } from 'zod';

    export const keys = () =>
      createEnv({
        server: {
          CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_'),
        },
        client: {
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
          NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
          NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
          NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
        },
        runtimeEnv: {
          CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
          NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
          NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
          NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
        },
      });
    ```

4.  **Create API Boundaries**:
    Re-export Clerk's functions to create a clear API for your application. This makes it easy to swap out the auth provider in the future if needed.

    `packages/auth/client.ts`
    ```typescript
    export * from '@clerk/nextjs';
    ```

    `packages/auth/server.ts`
    ```typescript
    import 'server-only';
    export * from '@clerk/nextjs/server';
    ```

    `packages/auth/middleware.ts`
    ```typescript
    export { clerkMiddleware as authMiddleware } from '@clerk/nextjs/server';
    ```

5.  **Create the Auth Provider**:
    This component wraps Clerk's provider and integrates it with your design system's theme.

    `packages/auth/provider.tsx`
    ```tsx
    'use client';

    import type { ComponentProps } from 'react';
    import { ClerkProvider } from '@clerk/nextjs';
    import { dark } from '@clerk/themes';
    import { useTheme } from 'next-themes';
    import { keys } from './keys';

    export const AuthProvider = (properties: ComponentProps<typeof ClerkProvider>) => {
      const env = keys();
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';

      return (
        <ClerkProvider
          {...properties}
          publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            baseTheme: isDark ? dark : undefined,
            elements: { /* Your custom shadcn/design system overrides here */ }
          }}
          signInUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
          signUpUrl={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
          afterSignInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
          afterSignUpUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
        />
      );
    };
    ```

---

### Step 3: Configure the Next.js App (`apps/app`)

Now, consume the `@repo/auth` package to implement the authentication flow.

1.  **Protect Routes with Middleware**:
    Create a `middleware.ts` file at the root of your `src` directory to protect all routes by default.

    `apps/app/src/middleware.ts`
    ```typescript
    import { authMiddleware } from '@repo/auth/middleware';

    // All routes are protected by default
    export default authMiddleware({});

    export const config = {
      matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
    };
    ```

2.  **Structure Routes with Groups**:
    Use App Router's route groups to separate layouts for authenticated and unauthenticated users.

    ```
    apps/app/src/app/
    ├── (authenticated)/
    │   └── layout.tsx
    ├── (unauthenticated)/
    │   ├── sign-in/
    │   │   └── [[...sign-in]]/
    │   │       └── page.tsx
    │   ├── sign-up/
    │   │   └── [[...sign-up]]/
    │   │       └── page.tsx
    │   └── layout.tsx
    └── layout.tsx
    ```

3.  **Create the Root Layout**:
    Wrap your entire application with your design system provider, which in turn contains the `AuthProvider`.

    `apps/app/src/app/layout.tsx`
    ```tsx
    import { DesignSystemProvider } from '@repo/design'; // Your design system provider

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en" suppressHydrationWarning>
          <body>
            <DesignSystemProvider>
              {children}
            </DesignSystemProvider>
          </body>
        </html>
      );
    }
    ```

4.  **Create Unauthenticated Layout and Pages**:
    This layout provides a simple shell for your sign-in/up forms.

    `apps/app/src/app/(unauthenticated)/layout.tsx`
    ```tsx
    export default function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          {children}
        </div>
      );
    }
    ```

    The sign-in/up pages will render your custom components. The `[[...sign-in]]` folder structure is a required convention for Clerk.

    `apps/app/src/app/(unauthenticated)/sign-in/[[...sign-in]]/page.tsx`
    ```tsx
    import { CustomSignIn } from '@/components/auth/sign-in'; // Your custom component

    export default function SignInPage() {
      return <CustomSignIn />;
    }
    ```

5.  **Build Custom Auth Forms with Clerk Elements**:
    This is where you build your custom UI. Create these components inside your app's `src/components` directory.

    `apps/app/src/components/auth/sign-in.tsx`
    ```tsx
    'use client';

    import * as Clerk from '@clerk/elements/common';
    import * as SignIn from '@clerk/elements/sign-in';
    // Import your UI components
    import { Button } from '@repo/design/components/ui/button';
    import { Input } from '@repo/design/components/ui/input';

    export function CustomSignIn() {
      return (
        <SignIn.Root>
          <SignIn.Step name="start">
            {/* Social sign-in buttons */}
            <Clerk.Connection name="google" className="...">
              Continue with Google
            </Clerk.Connection>
            
            <div className="divider">or</div>

            {/* Email/Password Form */}
            <Clerk.Field name="identifier">
              <Clerk.Label>Email</Clerk.Label>
              <Clerk.Input asChild>
                <Input type="email" />
              </Clerk.Input>
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="password">
              <Clerk.Label>Password</Clerk.Label>
              <Clerk.Input asChild>
                <Input type="password" />
              </Clerk.Input>
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit asChild>
              <Button>Sign In</Button>
            </SignIn.Action>
          </SignIn.Step>
          
          {/* Add other steps like 'verifications' as needed */}
        </SignIn.Root>
      );
    }
    ```
    > **Note**: The code above is a simplified example. Refer to your existing `apps/app/src/components/auth/sign-in.tsx` file for the complete, styled implementation with password visibility toggles and other features.

6.  **Create the Authenticated Layout**:
    This layout wraps all protected pages. It can perform an auth check and provide user-specific context.

    `apps/app/src/app/(authenticated)/layout.tsx`
    ```tsx
    import { auth } from '@repo/auth/server';

    export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
      const { userId } = await auth();

      // This check is redundant if middleware is configured correctly,
      // but provides an extra layer of security.
      if (!userId) {
        // The middleware should have already redirected.
        return null;
      }
      
      // You can fetch user-specific data here and provide it to children
      // via providers or props.

      return (
        <div className="flex flex-col min-h-screen">
          {/* Your main app navigation/header would go here */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      );
    }
    ```

---

### Summary of the Flow

1.  A user attempts to access a protected route (e.g., `/`).
2.  `apps/app/middleware.ts` intercepts the request, sees the user is not authenticated, and redirects them to `/sign-in`.
3.  The `/sign-in` page (`apps/app/(unauthenticated)/sign-in/[[...sign-in]]/page.tsx`) is rendered within the simple `(unauthenticated)/layout.tsx`.
4.  This page renders the `<CustomSignIn />` component, which uses Clerk Elements to display a fully branded form.
5.  After a successful sign-in, Clerk redirects the user to the `afterSignInUrl` (`/`), as configured in the `.env.local` file and used by the `AuthProvider`.
6.  The request for `/` is now authenticated. The middleware allows it, and the page is rendered within the `(authenticated)/layout.tsx`, which has access to the user's session.

This setup provides a professional, secure, and highly customizable authentication experience that is neatly organized within the monorepo structure.

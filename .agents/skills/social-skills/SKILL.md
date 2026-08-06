```markdown
# social-skills Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and workflows used in the `social-skills` TypeScript codebase. It covers file and code conventions, API route workflows, type safety practices, and testing patterns. The repository focuses on building and maintaining API endpoints, with a strong emphasis on code consistency and maintainability.

## Coding Conventions

- **File Naming:**  
  Use camelCase for file names.  
  _Example:_  
  ```
  journeyRoute.ts
  userProfile.ts
  ```

- **Import Style:**  
  Use alias imports for modules and files.  
  _Example:_  
  ```typescript
  import { getUser } from '@/lib/userService';
  ```

- **Export Style:**  
  Mixed usage of default and named exports.  
  _Example:_  
  ```typescript
  // Named export
  export function getJourney() { ... }

  // Default export
  export default handler;
  ```

- **Commit Messages:**  
  Follow [Conventional Commits](https://www.conventionalcommits.org/) with prefixes like `feat`, `fix`, and `docs`.  
  _Example:_  
  ```
  feat: add operator-only journey endpoint
  fix: correct authorization logic for journey API
  docs: update API usage instructions
  ```

## Workflows

### API Endpoint Refactor or Addition
**Trigger:** When changing the behavior or access control of an API endpoint, especially to split public and operator-only routes.  
**Command:** `/new-api-endpoint`

1. **Create or modify a route handler:**  
   - Add or update files under `src/app/api/[feature]/[route]/route.ts`.
   - _Example:_  
     ```
     src/app/api/journey/route.ts
     src/app/api/journey/operator/route.ts
     ```
2. **Adjust authentication/authorization logic:**  
   - Implement checks for user roles or authentication.
   - _Example:_  
     ```typescript
     if (!user) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     ```
3. **Update the public route:**  
   - Change data source or response shape as needed.
4. **Reference or close relevant planning docs/issues:**  
   - Link to issues or planning documents in your PR or commit message.

---

### API Route Type Safety and Config Sync
**Trigger:** When adding or modifying an API route and ensuring type safety and correct TypeScript configuration.  
**Command:** `/sync-types`

1. **Annotate API route handler return types:**  
   - Use explicit return types such as `Promise<NextResponse>`.
   - _Example:_  
     ```typescript
     import { NextResponse } from 'next/server';

     export async function GET(): Promise<NextResponse> {
       // handler logic
       return NextResponse.json({ data: 'example' });
     }
     ```
2. **Update or reformat `tsconfig.json`:**  
   - Ensure compatibility with Next.js and TypeScript best practices.
   - _Example:_  
     ```json
     {
       "compilerOptions": {
         "baseUrl": ".",
         "paths": {
           "@/*": ["src/*"]
         }
       }
     }
     ```

## Testing Patterns

- **Test File Naming:**  
  Test files use the `*.test.*` pattern.  
  _Example:_  
  ```
  journeyRoute.test.ts
  ```

- **Testing Framework:**  
  The specific testing framework is not detected, but standard TypeScript test patterns apply.

- **Test Example:**  
  ```typescript
  import { getJourney } from './journeyRoute';

  test('returns journey data', () => {
    expect(getJourney()).toEqual({ ... });
  });
  ```

## Commands

| Command            | Purpose                                                      |
|--------------------|--------------------------------------------------------------|
| /new-api-endpoint  | Start a refactor or addition of an API endpoint              |
| /sync-types        | Ensure type safety and sync TypeScript config with Next.js   |
```

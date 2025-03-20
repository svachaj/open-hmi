# Using with React and Next.js

## Basic Usage with React

```tsx
// Import the components - this registers the custom elements
import 'open-hmi';
// Import the type definitions for React
import 'open-hmi/react';

function MyComponent() {
  // Use the component via its HTML tag name
  return <hmi-counter></hmi-counter>;
}
```

## Usage with Next.js (or other SSR frameworks)

When using with Next.js, you need to ensure the components are only loaded in browser environments:

```tsx
import dynamic from 'next/dynamic';
import 'open-hmi/react'; // Import just the types

// Import components dynamically with ssr: false
const HmiComponents = dynamic(
  () => import('open-hmi'),
  { ssr: false }
);

function MyNextComponent() {
  return (
    <>
      {/* This loads the component only on client-side */}
      <HmiComponents />
      <hmi-counter></hmi-counter>
    </>
  );
}
```

## Troubleshooting TypeScript Errors

If you're still seeing TypeScript errors, create a `custom-elements.d.ts` file in your project:

```ts
declare namespace JSX {
  interface IntrinsicElements {
    'hmi-counter': any;
  }
}
```

Make sure this file is included in your tsconfig.json.

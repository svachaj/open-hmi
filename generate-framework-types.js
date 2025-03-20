// Script to generate framework-specific type definition files
const fs = require("fs");
const path = require("path");

// Ensure directories exist
if (!fs.existsSync("dist/react")) {
  fs.mkdirSync("dist/react", { recursive: true });
}

if (!fs.existsSync("dist/vue")) {
  fs.mkdirSync("dist/vue", { recursive: true });
}

// Create React types
const reactTypes = `import type { HmiCounter } from '..';

// This enables using the web components in React/Next.js applications
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // The 'any' type here helps prevent SSR type issues
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      // Add more components as they are created
    }
  }
}

export {};
`;

// Create Vue types
const vueTypes = `import { HmiCounter } from '..';

declare module 'vue' {
  export interface GlobalComponents {
    'hmi-counter': typeof HmiCounter;
    // Add more components as they are created
  }
}

export {};
`;

// Write files
fs.writeFileSync("dist/react/index.d.ts", reactTypes);
fs.writeFileSync("dist/vue/index.d.ts", vueTypes);

// Also create a README file to explain usage with Next.js
const usageReadme = `# Using with React and Next.js

## Basic Usage with React

\`\`\`tsx
// Import the components - this registers the custom elements
import 'open-hmi';
// Import the type definitions for React
import 'open-hmi/react';

function MyComponent() {
  // Use the component via its HTML tag name
  return <hmi-counter></hmi-counter>;
}
\`\`\`

## Usage with Next.js (or other SSR frameworks)

When using with Next.js, you need to ensure the components are only loaded in browser environments:

\`\`\`tsx
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
\`\`\`

## Troubleshooting TypeScript Errors

If you're still seeing TypeScript errors, create a \`custom-elements.d.ts\` file in your project:

\`\`\`ts
declare namespace JSX {
  interface IntrinsicElements {
    'hmi-counter': any;
  }
}
\`\`\`

Make sure this file is included in your tsconfig.json.
`;

fs.writeFileSync("dist/react/README.md", usageReadme);

console.log("Framework types generated successfully!");

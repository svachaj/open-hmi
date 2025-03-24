// Script to generate framework-specific type definition files
const fs = require('fs');
const path = require('path');

// Ensure directories exist
if (!fs.existsSync('dist/react')) {
  fs.mkdirSync('dist/react', { recursive: true });
}

if (!fs.existsSync('dist/vue')) {
  fs.mkdirSync('dist/vue', { recursive: true });
}

// Create a main React index.d.ts that will be referenced in package.json
const reactIndexTypes = `import { HmiCounter } from '..';

// Export component types for direct use
export { HmiCounter };

// Default export for dynamic imports in Next.js
export default function HmiComponents(): null;

// This makes the custom elements available in JSX automatically
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      // Add more components as they are created
    }
  }
}
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
fs.writeFileSync('dist/react/index.d.ts', reactIndexTypes);
fs.writeFileSync('dist/vue/index.d.ts', vueTypes);

// Create global ambient types that will be automatically included
const globalAmbientTypes = `/// <reference types="react" />

// Add JSX declarations for all web components
// This file is automatically included when the package is imported

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      // Add more components as they are created
    }
  }
}

export {};
`;

// Write the global ambient declarations file
fs.writeFileSync('dist/global.d.ts', globalAmbientTypes);

// Create a README file for React usage
const reactReadme = `# Using OpenHMI with React

OpenHMI is designed to work seamlessly with React. The custom elements are automatically typed,
so you don't need to create any additional type declaration files.

## Basic Usage

\`\`\`tsx
// Import the package with React support
import 'open-hmi/react';

function MyComponent() {
  return <hmi-counter></hmi-counter>;
}
\`\`\`

## Usage with Next.js (or other SSR frameworks)

For frameworks with server-side rendering, use dynamic imports:

\`\`\`tsx
import dynamic from 'next/dynamic';

// Import components dynamically with ssr: false
const HmiComponents = dynamic(
  () => import('open-hmi/react'),
  { ssr: false }
);

function MyNextComponent() {
  return (
    <>
      {/* This loads the component script only on client-side */}
      <HmiComponents />
      <hmi-counter></hmi-counter>
    </>
  );
}
\`\`\`
`;

fs.writeFileSync('dist/react/README.md', reactReadme);

console.log('Framework types generated successfully!');

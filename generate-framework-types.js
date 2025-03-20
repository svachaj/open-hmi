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
const reactTypes = `import { HmiCounter } from '..';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<HmiCounter>, HmiCounter>;
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

console.log("Framework types generated successfully!");

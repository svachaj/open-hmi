/// <reference types="react" />

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

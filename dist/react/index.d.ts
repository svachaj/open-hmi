import type { HmiCounter } from '..';

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

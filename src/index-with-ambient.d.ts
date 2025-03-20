// Import and re-export component classes
import { HmiCounter } from './components/hmi-counter';
export { HmiCounter };

// Default export for dynamic imports
export default function HmiComponents(): null;

// Ambient JSX declarations that will be automatically included
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      // Add more components as they are created
    }
  }
}

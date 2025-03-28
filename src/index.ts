// Dynamically import components only in browser environments
if (
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof customElements !== 'undefined'
) {
  // Import and register components
  import('./components/hmi-counter');
  import('./components/layout/hmi-pane');
  import('./components/layout/hmi-sidebar');
  import('./components/navigation/hmi-navbar');
}

// Export types for direct use
export { HmiCounter } from './components/hmi-counter';
export { HmiNavbar } from './components/navigation/hmi-navbar';
export { HmiPane } from './components/layout/hmi-pane';
export { HmiSidebar } from './components/layout/hmi-sidebar';

// Add empty export component for Next.js dynamic imports
export default function HmiComponents() {
  // This is just a dummy component that doesn't render anything
  // It's used for dynamic imports in Next.js
  return null;
}

// Add JSX declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hmi-counter': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      'hmi-pane': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      'hmi-navbar': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
      'hmi-sidebar': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
    }
  }
}

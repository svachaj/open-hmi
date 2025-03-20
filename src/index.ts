// Dynamically import components only in browser environments
if (
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  typeof customElements !== "undefined"
) {
  // Import and register components
  import("./components/hmi-counter");
}

// Export types for direct use
export { HmiCounter } from "./components/hmi-counter";

// Add empty export component for Next.js dynamic imports
export default function HmiComponents() {
  // This is just a dummy component that doesn't render anything
  // It's used for dynamic imports in Next.js
  return null;
}

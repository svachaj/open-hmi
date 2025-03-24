// Type guard for browser environment
export const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof customElements !== 'undefined';

// Define a type for the constructor
export type HTMLElementConstructor = typeof HTMLElement;

// Create a function that returns the appropriate base class
export function getBaseClass(): HTMLElementConstructor | (new () => Object) {
  if (isBrowser) {
    return HTMLElement;
  }
  return class DummyElement {};
}

// Export the base class for use in components
export const BaseElement = getBaseClass();

// Type guard for browser environment
const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof customElements !== 'undefined';

// Define a type for the constructor
type HTMLElementConstructor = typeof HTMLElement;

// Create a function that returns the appropriate base class
function getBaseClass(): HTMLElementConstructor | (new () => Object) {
  if (isBrowser) {
    return HTMLElement;
  }
  return class DummyElement {};
}

// Use the function to get the base class
const BaseElement = getBaseClass();

export class HmiCounter extends BaseElement {
  private _count: number = 0;
  private counterSpan: HTMLSpanElement | null = null;

  constructor() {
    super();

    // Skip DOM operations in non-browser environments
    if (!isBrowser) return;

    // Attach a shadow root for encapsulation
    const shadow = (this as unknown as HTMLElement).attachShadow({
      mode: "open",
    });

    // Create a wrapper div for styling
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.padding = '10px';
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.borderRadius = '4px';
    wrapper.style.fontFamily = 'sans-serif';

    // Create the decrement button
    const decrementButton = document.createElement('button');
    decrementButton.textContent = '–';
    decrementButton.addEventListener('click', () => this.decrement());

    // Create the span to show the count
    this.counterSpan = document.createElement('span');
    this.counterSpan.textContent = this._count.toString();
    this.counterSpan.style.margin = '0 10px';

    // Create the increment button
    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', () => this.increment());

    // Assemble the elements
    wrapper.appendChild(decrementButton);
    wrapper.appendChild(this.counterSpan);
    wrapper.appendChild(incrementButton);
    shadow.appendChild(wrapper);
  }

  increment() {
    if (!isBrowser) return;
    this._count++;
    if (this.counterSpan) {
      this.counterSpan.textContent = this._count.toString();
    }
  }

  decrement() {
    if (!isBrowser) return;
    this._count--;
    if (this.counterSpan) {
      this.counterSpan.textContent = this._count.toString();
    }
  }
}

// Only register the component in browser environments
if (isBrowser) {
  customElements.define(
    "hmi-counter",
    HmiCounter as unknown as CustomElementConstructor
  );
}

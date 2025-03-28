import { BaseElement, isBrowser } from '../../base-element';

export class HmiSidebar extends BaseElement {
  constructor() {
    super();

    // Skip DOM operations in non-browser environments
    if (!isBrowser) return;

    // Attach a shadow root for encapsulation
    const shadow = (this as unknown as HTMLElement).attachShadow({
      mode: 'open',
    });

    // Create a wrapper div for styling
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = '#949494';

    wrapper.style.width = '300px';
    wrapper.style.height = '100%';

    // Create a slot element to accept children
    const slot = document.createElement('slot');

    // Append the slot to the wrapper
    wrapper.appendChild(slot);

    // Append the wrapper to the shadow root
    shadow.appendChild(wrapper);
  }
}

// Only register the component in browser environments
if (isBrowser) {
  customElements.define(
    'hmi-sidebar',
    HmiSidebar as unknown as CustomElementConstructor,
  );
}

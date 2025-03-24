import { BaseElement, isBrowser } from '../../base-element';

export class HmiNavbar extends BaseElement {
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
    wrapper.style.backgroundColor = '#454545';
    wrapper.style.color = '#FFFFFF';
    wrapper.style.width = '100%';
    wrapper.style.height = '32px';

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
    'hmi-navbar',
    HmiNavbar as unknown as CustomElementConstructor,
  );
}

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

    // define styles for the navbar
    const styles = document.createElement('style');
    styles.textContent = ` 
                        :host {
                            display: block;
                            width: 100%;
                        }
                        
                        .nav-container {
                            display: flex;
                            background-color: #454545;
                            color: white;                           
                            height: 32px;
                            align-items: center;
                            padding: 0;
                            margin: 0;
                            padding-left: 24px;
                            width: 100%;
                        }
                        
                        .nav-item {
                            padding-right: 32px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                            letter-spacing: 0.5px;
                            cursor: pointer;
                            transition: background-color 0.2s;
                        }

                        .nav-item a {
                            text-decoration: none;
                            color: white;
                        }
                        
                        .nav-item:hover {
                            opacity: 0.6;
                        }
                        
                        .nav-item.active {
                            background-color: #333;
                        }
                        
                        .system-title {
                            font-weight: bold;
                        }
                        
                        .spacer {
                            flex-grow: 1;
                        }
                        
                        .title-absolute {
                            position: absolute;
                            right: 24px;
                            top: 56px;
                            padding: 20px 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 60px;
                            font-weight: bold;
                            color: #B0B0B0;
                            pointer-events: none;
                            text-align: center;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            background-color: #454545;
                        }`;
    // Append styles to the shadow root
    shadow.appendChild(styles);

    // Create a wrapper div for styling
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-container';
    wrapper.innerHTML = `
    <div class="nav-item system-title" data-section="e3">
        <a href="/e3-vacuum/p3">E3 VACUUM SYSTEM</a>
    </div>  
    <div class="nav-item" data-section="p3">
        <a href="/e3-vacuum/p3">P3 Controls</a>
    </div>
    <div class="nav-item" data-section="l3bt">
        <a href="/e3-vacuum/l3bt">L3BT Controls</a>
    </div>
    <div class="title-absolute">P3</div>`;

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

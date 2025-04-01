// src/components/hmi-counter.ts
import { ProviderComponent } from '../provider/provider-component';

export class HmiCounter extends ProviderComponent<number> {
  private counterSpan: HTMLSpanElement | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a simple UI for displaying the PV value.
    const container = document.createElement('div');
    container.style.fontFamily = 'sans-serif';

    this.counterSpan = document.createElement('span');
    this.counterSpan.textContent = '0';

    container.appendChild(this.counterSpan);
    shadow.appendChild(container);
  }

  protected onDataUpdate(): void {
    if (this.data && typeof this.data.value === 'number' && this.counterSpan) {
      this.counterSpan.textContent = this.data.value.toExponential(2);
    }
  }
}

customElements.define('hmi-counter', HmiCounter);

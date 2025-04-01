import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HmiCounter } from '../../src/components/hmi-counter';

// Add shadowRoot accessor type for tests
interface HmiCounterElement extends HmiCounter {
  shadowRoot: ShadowRoot;
}

describe('HmiCounter', () => {
  let counter: HmiCounterElement;

  beforeEach(() => {
    // Register the custom element if not already registered and create a new instance
    if (!customElements.get('hmi-counter')) {
      customElements.define(
        'hmi-counter',
        HmiCounter as unknown as CustomElementConstructor,
      );
    }
    counter = new HmiCounter() as HmiCounterElement;
    document.body.appendChild(counter as unknown as Node);
  });

  afterEach(() => {
    document.body.removeChild(counter as unknown as Node);
  });

  it('should be defined', () => {
    expect(counter).toBeDefined();
    expect(customElements.get('hmi-counter')).toBeDefined();
  });

  it('should start with a count of 0', () => {
    const shadowRoot = counter.shadowRoot;
    const counterSpan = shadowRoot?.querySelector('span');
    expect(counterSpan?.textContent).toBe('0');
  });
});

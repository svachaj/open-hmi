import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HmiCounter } from "../../src/components/hmi-counter";

describe("HmiCounter", () => {
  let counter: HmiCounter;

  beforeEach(() => {
    // Register the custom element if not already registered and create a new instance
    if (!customElements.get("hmi-counter")) {
      customElements.define("hmi-counter", HmiCounter);
    }
    counter = new HmiCounter();
    document.body.appendChild(counter);
  });

  afterEach(() => {
    document.body.removeChild(counter);
  });

  it("should be defined", () => {
    expect(counter).toBeDefined();
    expect(customElements.get("hmi-counter")).toBeDefined();
  });

  it("should start with a count of 0", () => {
    const shadowRoot = counter.shadowRoot;
    const counterSpan = shadowRoot?.querySelector("span");
    expect(counterSpan?.textContent).toBe("0");
  });

  it("should increment the count when the + button is clicked", () => {
    const shadowRoot = counter.shadowRoot;
    const incrementButton = shadowRoot?.querySelector("button:last-of-type") as HTMLButtonElement;
    const counterSpan = shadowRoot?.querySelector("span");

    incrementButton?.click();
    expect(counterSpan?.textContent).toBe("1");

    incrementButton?.click();
    expect(counterSpan?.textContent).toBe("2");
  });

  it("should decrement the count when the - button is clicked", () => {
    const shadowRoot = counter.shadowRoot;
    const decrementButton = shadowRoot?.querySelector("button:first-of-type") as HTMLButtonElement;
    const incrementButton = shadowRoot?.querySelector("button:last-of-type") as HTMLButtonElement;
    const counterSpan = shadowRoot?.querySelector("span");

    // First increment to 1
    incrementButton?.click();
    expect(counterSpan?.textContent).toBe("1");

    // Then decrement back to 0
    decrementButton?.click();
    expect(counterSpan?.textContent).toBe("0");

    // Decrement below 0
    decrementButton?.click();
    expect(counterSpan?.textContent).toBe("-1");
  });
});

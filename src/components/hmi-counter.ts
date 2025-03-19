export class HmiCounter extends HTMLElement {
  private _count: number = 0;
  private counterSpan: HTMLSpanElement | null = null;

  constructor() {
    super();

    // Attach a shadow root for encapsulation
    const shadow = this.attachShadow({ mode: "open" });

    // Create a wrapper div for styling
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.padding = "10px";
    wrapper.style.border = "1px solid #ccc";
    wrapper.style.borderRadius = "4px";
    wrapper.style.fontFamily = "sans-serif";

    // Create the decrement button
    const decrementButton = document.createElement("button");
    decrementButton.textContent = "–";
    decrementButton.addEventListener("click", () => this.decrement());

    // Create the span to show the count
    this.counterSpan = document.createElement("span");
    this.counterSpan.textContent = this._count.toString();
    this.counterSpan.style.margin = "0 10px";

    // Create the increment button
    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", () => this.increment());

    // Assemble the elements
    wrapper.appendChild(decrementButton);
    wrapper.appendChild(this.counterSpan);
    wrapper.appendChild(incrementButton);
    shadow.appendChild(wrapper);
  }

  increment() {
    this._count++;
    if (this.counterSpan) {
      this.counterSpan.textContent = this._count.toString();
    }
  }

  decrement() {
    this._count--;
    if (this.counterSpan) {
      this.counterSpan.textContent = this._count.toString();
    }
  }
}

// Register the custom element (note the tag name must include a hyphen)
customElements.define("hmi-counter", HmiCounter);

class c extends HTMLElement {
  constructor() {
    super(), this._count = 0, this.counterSpan = null;
    const o = this.attachShadow({ mode: "open" }), t = document.createElement("div");
    t.style.display = "inline-block", t.style.padding = "10px", t.style.border = "1px solid #ccc", t.style.borderRadius = "4px", t.style.fontFamily = "sans-serif";
    const e = document.createElement("button");
    e.textContent = "–", e.addEventListener("click", () => this.decrement()), this.counterSpan = document.createElement("span"), this.counterSpan.textContent = this._count.toString(), this.counterSpan.style.margin = "0 10px";
    const n = document.createElement("button");
    n.textContent = "+", n.addEventListener("click", () => this.increment()), t.appendChild(e), t.appendChild(this.counterSpan), t.appendChild(n), o.appendChild(t);
  }
  increment() {
    this._count++, this.counterSpan && (this.counterSpan.textContent = this._count.toString());
  }
  decrement() {
    this._count--, this.counterSpan && (this.counterSpan.textContent = this._count.toString());
  }
}
customElements.define("hmi-counter", c);
export {
  c as HmiCounter
};

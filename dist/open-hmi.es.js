const e = typeof window < "u" && typeof document < "u" && typeof customElements < "u";
function c() {
  return e ? HTMLElement : class {
  };
}
const u = c();
class i extends u {
  constructor() {
    if (super(), this._count = 0, this.counterSpan = null, !e)
      return;
    const r = this.attachShadow({
      mode: "open"
    }), t = document.createElement("div");
    t.style.display = "inline-block", t.style.padding = "10px", t.style.border = "1px solid #ccc", t.style.borderRadius = "4px", t.style.fontFamily = "sans-serif";
    const n = document.createElement("button");
    n.textContent = "–", n.addEventListener("click", () => this.decrement()), this.counterSpan = document.createElement("span"), this.counterSpan.textContent = this._count.toString(), this.counterSpan.style.margin = "0 10px";
    const o = document.createElement("button");
    o.textContent = "+", o.addEventListener("click", () => this.increment()), t.appendChild(n), t.appendChild(this.counterSpan), t.appendChild(o), r.appendChild(t);
  }
  increment() {
    e && (this._count++, this.counterSpan && (this.counterSpan.textContent = this._count.toString()));
  }
  decrement() {
    e && (this._count--, this.counterSpan && (this.counterSpan.textContent = this._count.toString()));
  }
}
e && customElements.define(
  "hmi-counter",
  i
);
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HmiCounter: i
}, Symbol.toStringTag, { value: "Module" }));
typeof window < "u" && typeof document < "u" && typeof customElements < "u" && Promise.resolve().then(() => d);
function a() {
  return null;
}
export {
  i as HmiCounter,
  a as default
};

const t = typeof window < "u" && typeof document < "u" && typeof customElements < "u";
function a() {
  return t ? HTMLElement : class {
  };
}
const i = a();
class c extends i {
  constructor() {
    if (super(), this._count = 0, this.counterSpan = null, !t)
      return;
    const o = this.attachShadow({
      mode: "open"
    }), e = document.createElement("div");
    e.style.display = "inline-block", e.style.padding = "10px", e.style.border = "1px solid #ccc", e.style.borderRadius = "4px", e.style.fontFamily = "sans-serif";
    const n = document.createElement("button");
    n.textContent = "–", n.addEventListener("click", () => this.decrement()), this.counterSpan = document.createElement("span"), this.counterSpan.textContent = this._count.toString(), this.counterSpan.style.margin = "0 10px";
    const r = document.createElement("button");
    r.textContent = "+", r.addEventListener("click", () => this.increment()), e.appendChild(n), e.appendChild(this.counterSpan), e.appendChild(r), o.appendChild(e);
  }
  increment() {
    t && (this._count++, this.counterSpan && (this.counterSpan.textContent = this._count.toString()));
  }
  decrement() {
    t && (this._count--, this.counterSpan && (this.counterSpan.textContent = this._count.toString()));
  }
}
t && customElements.define(
  "hmi-counter",
  c
);
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HmiCounter: c
}, Symbol.toStringTag, { value: "Module" }));
class d extends i {
  constructor() {
    if (super(), !t)
      return;
    const o = this.attachShadow({
      mode: "open"
    }), e = document.createElement("div");
    e.style.backgroundColor = "#454545", e.style.color = "#FFFFFF", e.style.width = "100%", e.style.height = "32px";
    const n = document.createElement("slot");
    e.appendChild(n), o.appendChild(e);
  }
}
t && customElements.define(
  "hmi-navbar",
  d
);
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HmiNavbar: d
}, Symbol.toStringTag, { value: "Module" }));
class l extends i {
  constructor() {
    if (super(), !t)
      return;
    const o = this.attachShadow({
      mode: "open"
    }), e = document.createElement("div");
    e.style.backgroundColor = "#B0B0B0", e.style.color = "#000000";
    const n = document.createElement("slot");
    e.appendChild(n), o.appendChild(e);
  }
}
t && customElements.define(
  "hmi-pane",
  l
);
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HmiPane: l
}, Symbol.toStringTag, { value: "Module" }));
typeof window < "u" && typeof document < "u" && typeof customElements < "u" && (Promise.resolve().then(() => u), Promise.resolve().then(() => p), Promise.resolve().then(() => m));
function f() {
  return null;
}
export {
  c as HmiCounter,
  d as HmiNavbar,
  l as HmiPane,
  f as default
};

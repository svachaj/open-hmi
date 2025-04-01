"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const n=typeof window<"u"&&typeof document<"u"&&typeof customElements<"u";function p(){return n?HTMLElement:class{}}const r=p();class u extends r{constructor(){super(...arguments),this._pvName=null,this._provider=null,this._callback=null,this.data=null}static get observedAttributes(){return["pvname"]}get pvname(){return this._pvName}set pvname(e){this._pvName!==e&&(this._pvName&&this._provider&&this._callback&&this._provider.unsubscribe(this._pvName,this._callback),this._pvName=e,this.isConnected&&this._provider&&this._pvName&&this.subscribeToPV(this._pvName))}attributeChangedCallback(e,t,s){e==="pvname"&&(this.pvname=s)}get provider(){return this._provider}set provider(e){this._provider!==e&&(this._pvName&&this._provider&&this._callback&&this._provider.unsubscribe(this._pvName,this._callback),this._provider=e,this.isConnected&&this._provider&&this._pvName&&this.subscribeToPV(this._pvName))}connectedCallback(){!this._provider&&window.__GLOBAL_DATA_PROVIDER__&&(this.provider=window.__GLOBAL_DATA_PROVIDER__),this._provider&&this._pvName&&this.subscribeToPV(this._pvName)}disconnectedCallback(){this._provider&&this._pvName&&this._callback&&(this._provider.unsubscribe(this._pvName,this._callback),this._callback=null)}subscribeToPV(e){if(!this._provider){console.warn("No data provider set for ProviderComponent");return}this._callback=t=>{this.data=t,this.onDataUpdate()},this._provider.subscribe(e,this._callback)}}class o extends u{constructor(){super(),this.counterSpan=null;const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.style.fontFamily="sans-serif",this.counterSpan=document.createElement("span"),this.counterSpan.textContent="0",t.appendChild(this.counterSpan),e.appendChild(t)}onDataUpdate(){this.data&&typeof this.data.value=="number"&&this.counterSpan&&(this.counterSpan.textContent=this.data.value.toExponential(2))}}customElements.define("hmi-counter",o);const m=Object.freeze(Object.defineProperty({__proto__:null,HmiCounter:o},Symbol.toStringTag,{value:"Module"}));class a extends r{constructor(){if(super(),!n)return;const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=` 
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
                            font-size: 1.1rem;
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
                        }`,e.appendChild(t);const s=document.createElement("div");s.className="nav-container",s.innerHTML=`
    <div class="nav-item system-title" data-section="e3">
        <a href="/e3-vacuum/p3">E3 VACUUM SYSTEM</a>
    </div>  
    <div class="nav-item" data-section="p3">
        <a href="/e3-vacuum/p3">P3 Controls</a>
    </div>
    <div class="nav-item" data-section="l3bt">
        <a href="/e3-vacuum/l3bt">L3BT Controls</a>
    </div>
    <div class="title-absolute">P3</div>`,e.appendChild(s)}}n&&customElements.define("hmi-navbar",a);const b=Object.freeze(Object.defineProperty({__proto__:null,HmiNavbar:a},Symbol.toStringTag,{value:"Module"}));class c extends r{constructor(){if(super(),!n)return;const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.style.backgroundColor="#B0B0B0",t.style.color="#000000",t.style.height="100%";const s=document.createElement("slot");t.appendChild(s),e.appendChild(t)}}n&&customElements.define("hmi-pane",c);const v=Object.freeze(Object.defineProperty({__proto__:null,HmiPane:c},Symbol.toStringTag,{value:"Module"}));class l extends r{constructor(){if(super(),!n)return;const e=this.attachShadow({mode:"open"}),t=document.createElement("div");t.style.backgroundColor="#949494",t.style.width="25rem",t.style.height="100%";const s=document.createElement("slot");t.appendChild(s),e.appendChild(t)}}n&&customElements.define("hmi-sidebar",l);const f=Object.freeze(Object.defineProperty({__proto__:null,HmiSidebar:l},Symbol.toStringTag,{value:"Module"}));class _{constructor(e){this.subscribers={},this.ws=new WebSocket(e),this.ws.addEventListener("message",t=>{try{const s=JSON.parse(t.data),d=s.name;this.subscribers[d]&&this.subscribers[d].forEach(h=>h(s))}catch(s){console.error("Error parsing WebSocket message:",s)}})}subscribe(e,t){if(!this.subscribers[e]){this.subscribers[e]=[];const s=()=>{this.ws.readyState===WebSocket.OPEN?this.ws.send(JSON.stringify({type:"subscribe",pvs:[e]})):console.warn(`WebSocket not open when trying to subscribe to ${e}`)};this.ws.readyState===WebSocket.OPEN?s():this.ws.addEventListener("open",s,{once:!0})}this.subscribers[e].push(t)}unsubscribe(e,t){this.subscribers[e]&&(this.subscribers[e]=this.subscribers[e].filter(s=>s!==t),this.subscribers[e].length===0&&(this.ws.send(JSON.stringify({type:"unsubscribe",name:e})),delete this.subscribers[e]))}}function g(i){return new _(i)}typeof window<"u"&&typeof document<"u"&&typeof customElements<"u"&&(Promise.resolve().then(()=>m),Promise.resolve().then(()=>v),Promise.resolve().then(()=>f),Promise.resolve().then(()=>b));function w(){return null}exports.HmiCounter=o;exports.HmiNavbar=a;exports.HmiPane=c;exports.HmiSidebar=l;exports.createWsProvider=g;exports.default=w;

// import { wsProvider } from './provider'; // Your singleton WebSocket provider
// import { Message } from './message';

// /**
//  * A base class for data-driven components.
//  * It subscribes to a data provider using the 'pvname' property (and attribute).
//  * The generic type T represents the expected type of the message value.
//  */
// export abstract class ProviderComponent<T> extends HTMLElement {
//   private _pvName: string | null = null;
//   // Hold a reference to the subscription callback to allow unsubscription.
//   private _callback: ((msg: Message<T>) => void) | null = null;
//   // Last received message.
//   protected data: Message<T> | null = null;

//   // Let the attribute system know that "pvname" should be observed.
//   static get observedAttributes() {
//     return ['pvname'];
//   }

//   // Getter and setter for the pvname property.
//   get pvname(): string | null {
//     return this._pvName;
//   }
//   set pvname(value: string | null) {
//     if (this._pvName !== value) {
//       // If changing from an existing pv, unsubscribe.
//       if (this._pvName && this._callback) {
//         wsProvider.unsubscribe<T>(this._pvName, this._callback);
//       }
//       this._pvName = value;
//       // If connected and a valid key is provided, subscribe to the new PV.
//       if (this.isConnected && this._pvName) {
//         this.subscribeToPV(this._pvName);
//       }
//     }
//   }

//   // Reflect attribute changes to the property.
//   attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
//     if (name === 'pvname') {
//       this.pvname = newValue;
//     }
//   }

//   connectedCallback() {
//     if (this._pvName) {
//       this.subscribeToPV(this._pvName);
//     }
//   }

//   disconnectedCallback() {
//     if (this._pvName && this._callback) {
//       wsProvider.unsubscribe<T>(this._pvName, this._callback);
//       this._callback = null;
//     }
//   }

//   // Helper method to subscribe to a PV.
//   private subscribeToPV(pvName: string) {
//     // Create the callback that saves the message and calls the abstract update method.
//     this._callback = (msg: Message<T>) => {
//       this.data = msg;
//       this.onDataUpdate();
//     };
//     wsProvider.subscribe<T>(pvName, this._callback);
//   }

//   /**
//    * This method is called whenever new data is received.
//    * Derived classes must implement onDataUpdate to update their UI accordingly.
//    */
//   protected abstract onDataUpdate(): void;
// }

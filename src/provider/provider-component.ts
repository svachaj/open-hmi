// src/components/ProviderComponent.ts
import { BaseElement } from '../base-element';
import { KeyedDataProvider } from './keyed-data-provider';
import { Message } from './message';

export abstract class ProviderComponent<
  T,
> extends (BaseElement as typeof HTMLElement) {
  private _pvName: string | null = null;
  private _provider: KeyedDataProvider | null = null;
  private _callback: ((msg: Message<T>) => void) | null = null;
  protected data: Message<T> | null = null;

  static get observedAttributes() {
    return ['pvname'];
  }

  get pvname(): string | null {
    return this._pvName;
  }
  set pvname(value: string | null) {
    if (this._pvName !== value) {
      if (this._pvName && this._provider && this._callback) {
        this._provider.unsubscribe<T>(this._pvName, this._callback);
      }
      this._pvName = value;
      if (this.isConnected && this._provider && this._pvName) {
        this.subscribeToPV(this._pvName);
      }
    }
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'pvname') {
      this.pvname = newValue;
    }
  }

  get provider(): KeyedDataProvider | null {
    return this._provider;
  }
  set provider(value: KeyedDataProvider | null) {
    if (this._provider !== value) {
      if (this._pvName && this._provider && this._callback) {
        this._provider.unsubscribe<T>(this._pvName, this._callback);
      }
      this._provider = value;
      if (this.isConnected && this._provider && this._pvName) {
        this.subscribeToPV(this._pvName);
      }
    }
  }

  connectedCallback() {
    // Automatically inject global provider if not already set.
    if (!this._provider && (window as any).__GLOBAL_DATA_PROVIDER__) {
      this.provider = (window as any).__GLOBAL_DATA_PROVIDER__;
    }
    if (this._provider && this._pvName) {
      this.subscribeToPV(this._pvName);
    }
  }

  disconnectedCallback() {
    if (this._provider && this._pvName && this._callback) {
      this._provider.unsubscribe<T>(this._pvName, this._callback);
      this._callback = null;
    }
  }

  private subscribeToPV(key: string) {
    if (!this._provider) {
      console.warn('No data provider set for ProviderComponent');
      return;
    }
    this._callback = (msg: Message<T>) => {
      this.data = msg;
      this.onDataUpdate();
    };
    this._provider.subscribe<T>(key, this._callback);
  }

  /**
   * Called when new data is received.
   * Derived classes must implement onDataUpdate to update their UI.
   */
  protected abstract onDataUpdate(): void;
}

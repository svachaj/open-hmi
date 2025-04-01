import { KeyedDataProvider } from './keyed-data-provider';
import { Message } from './message';
declare const ProviderComponent_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
export declare abstract class ProviderComponent<T> extends ProviderComponent_base {
    private _pvName;
    private _provider;
    private _callback;
    protected data: Message<T> | null;
    static get observedAttributes(): string[];
    get pvname(): string | null;
    set pvname(value: string | null);
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
    get provider(): KeyedDataProvider | null;
    set provider(value: KeyedDataProvider | null);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private subscribeToPV;
    /**
     * Called when new data is received.
     * Derived classes must implement onDataUpdate to update their UI.
     */
    protected abstract onDataUpdate(): void;
}
export {};
//# sourceMappingURL=provider-component.d.ts.map
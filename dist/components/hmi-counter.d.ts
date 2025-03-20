declare const BaseElement: {
    new (): HTMLElement;
    prototype: HTMLElement;
} | (new () => Object);
export declare class HmiCounter extends BaseElement {
    private _count;
    private counterSpan;
    constructor();
    increment(): void;
    decrement(): void;
}
export {};
//# sourceMappingURL=hmi-counter.d.ts.map
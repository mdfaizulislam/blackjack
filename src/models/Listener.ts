export class Listener {
    private mCallbackListeners: Function[] = [];
    public static createListener(): Listener {
        return new Listener();
    }
    constructor() {}

    public addCallbackListener(callback: Function): void {
        this.mCallbackListeners.push(callback);
    }

    public getList(): Function[] {
        return this.mCallbackListeners;
    }

    public clearAllListener(): void {
        this.mCallbackListeners.length = 0;
    }
}

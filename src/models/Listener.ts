export class Listener {
    private mCallbackListeners: Function[] = [];
    public static createListener(): Listener {
        return new Listener();
    }
    constructor() {}

    public addCallbackListener(callback: Function): void {
        this.mCallbackListeners.push(callback);
    }

    public getAllListerns(): Function[] {
        return this.mCallbackListeners;
    }

    public removeCallbackListener(callback: Function): void {
        const index = this.mCallbackListeners.indexOf(callback);
        const x = this.mCallbackListeners.splice(index, 1);
    }
}

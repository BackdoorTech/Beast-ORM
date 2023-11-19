// IndexedDB strategy
export class IndexedDBWorkerStrategy {
    constructor() {
        this.myWorker = new Worker(new URL('./worker/worker.js', import.meta.url), { type: "module" });
        this.myWorker.onmessage = (oEvent) => {
            const data = oEvent.data;
            this.Queue[data.UUID][data.method](data.data);
        };
        this.myWorker.onerror = (error) => {
            console.log('myWorker', error);
        };
    }
    addTrigger(table, data) {
        throw new Error("Method not implemented.");
    }
    RemoveTrigger(table, data) {
        throw new Error("Method not implemented.");
    }
    updateMany(table, data) {
        throw new Error("Method not implemented.");
    }
    insertMany(table, data) {
        throw new Error("Method not implemented.");
    }
    deleteMany(table, data) {
        throw new Error("Method not implemented.");
    }
    selectMany(table, data) {
        throw new Error("Method not implemented.");
    }
    update(table, data) {
        throw new Error("Method not implemented.");
    }
    delete(table, data) {
        throw new Error("Method not implemented.");
    }
    openDatabase() {
        const UUID = '';
        return async (callbacks) => {
            const { done } = callbacks;
            callbacks.done = (...arg) => {
                done(...arg);
            };
            this.myWorker.postMessage(Object.assign({ method: 'openDatabase', UUID }, callbacks));
        };
    }
    insert(table, data) {
        const UUID = '';
        return async (callbacks) => {
            const { done } = callbacks;
            callbacks.done = (...arg) => {
                done(...arg);
            };
            this.Queue[UUID] = Object.assign({}, callbacks);
            this.myWorker.postMessage(Object.assign({ method: 'openDatabase', UUID }, callbacks));
        };
    }
    select(table, key) {
        const UUID = '';
        return async (callbacks) => {
            const { done } = callbacks;
            callbacks.done = (...arg) => {
                done(...arg);
            };
            this.Queue[UUID] = Object.assign({}, callbacks);
            this.myWorker.postMessage(Object.assign({ method: 'openDatabase', UUID }, callbacks));
        };
    }
    migrate(migrate) {
        const UUID = '';
        return async (callbacks) => {
            const { done } = callbacks;
            callbacks.done = (...arg) => {
                done(...arg);
            };
            this.Queue[UUID] = Object.assign({}, callbacks);
            this.myWorker.postMessage(Object.assign({ method: 'openDatabase', UUID }, callbacks));
        };
    }
    prepare(migrate) {
        const UUID = '';
        return async (callbacks) => {
            const { done } = callbacks;
            callbacks.done = (...arg) => {
                done(...arg);
            };
            this.Queue[UUID] = Object.assign({}, callbacks);
            this.myWorker.postMessage(Object.assign({ method: 'openDatabase', UUID }, callbacks));
        };
    }
}

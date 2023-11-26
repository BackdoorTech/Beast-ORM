import { uniqueGenerator } from "../../../../Utility/utils.js";
// IndexedDB strategy
export class IndexedDBWorkerStrategy {
    constructor(databaseName) {
        this.callbacks = {};
        this.databaseName = databaseName;
        this.myWorker = new Worker(new URL('./worker/worker.js', import.meta.url), { type: "module" });
        this.myWorker.onmessage = (oEvent) => {
            const data = oEvent.data;
            console.log(JSON.stringify(data));
            this.callbacks[data.UUID][data.callbackName](data.data);
        };
        this.myWorker.onerror = (error) => {
            console.log('myWorker', error);
        };
        this.myWorker.postMessage({ databaseName });
    }
    static handler(instance, callbacks, data, methodName) {
        const UUID = uniqueGenerator();
        const originalDone = callbacks.done;
        callbacks.done = (dataFromWorker) => {
            originalDone(dataFromWorker);
            delete instance.callbacks[UUID];
        };
        instance.callbacks[UUID] = callbacks;
        instance.myWorker.postMessage({ methodName, data, UUID });
    }
    update(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "update");
        };
    }
    updateMany(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "updateMany");
        };
    }
    insert(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "insert");
        };
    }
    insertMany(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "insertMany");
        };
    }
    delete(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "delete");
        };
    }
    deleteMany(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "deleteMany");
        };
    }
    select(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "select");
        };
    }
    selectMany(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "selectMany");
        };
    }
    migrate(migrate) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, migrate, "migrate");
        };
    }
    prepare(migrate) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, migrate, "prepare");
        };
    }
    RemoveTrigger(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "RemoveTrigger");
        };
    }
    addTrigger(data) {
        return async (callbacks) => {
            IndexedDBWorkerStrategy.handler(this, callbacks, data, "addTrigger");
        };
    }
}

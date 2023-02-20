export class _IndexedDBWorkerQueue {
    constructor() {
        this.webWorkerModuleSupport = false;
        this.workerQueues = {};
        this.webWorkerModuleSupport = this.supportsWorkerType();
        if (this.webWorkerModuleSupport) {
            this.myWorker = new Worker(new URL('./worker.js', import.meta.url), { type: "module" });
            this.myWorker.onmessage = (oEvent) => {
                const data = oEvent.data;
                this.onmessage(data);
            };
            this.myWorker.onerror = (error) => {
                console.log(error, 'erroror');
            };
        }
    }
    // https://stackoverflow.com/a/62963963/14115342
    supportsWorkerType() {
        let supports = false;
        const tester = {
            get type() { return supports = true; } // it's been called, it's supported
        };
        try {
            const worker = new Worker('blob://', tester);
        }
        finally {
            return supports;
        }
    }
    register(data) {
        try {
            this.myWorker.postMessage(data.params);
            this.workerQueues[data.queryId] = data;
            return data.queryId;
        }
        catch (error) {
            return false;
        }
    }
    async onmessage(data) {
        const value = this.workerQueues[data.queryId];
        const key = data.queryId;
        const dontRepeat = await value.func(data);
        if (dontRepeat || !data.queryId) {
            delete this.workerQueues[key];
        }
    }
    requestHandler() {
    }
}
export const IndexedDBWorkerQueue = new _IndexedDBWorkerQueue();

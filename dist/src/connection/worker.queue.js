export class _IndexedDBWorkerQueue {
    constructor() {
        this.myWorker = new Worker(new URL('./worker.js', import.meta.url), { type: "module" });
        this.workerQueues = {};
        this.myWorker.onmessage = (oEvent) => {
            const data = oEvent.data;
            this.onmessage(data);
        };
    }
    register(data) {
        this.myWorker.postMessage(data.params);
        this.workerQueues[data.queryId] = data;
        return data.queryId;
    }
    async onmessage(data) {
        for (const [key, value] of Object.entries(this.workerQueues)) {
            const dontRepeat = await value.func(data);
            if (dontRepeat) {
                delete this.workerQueues[key];
            }
        }
    }
    requestHandler() {
    }
}
export const IndexedDBWorkerQueue = new _IndexedDBWorkerQueue();

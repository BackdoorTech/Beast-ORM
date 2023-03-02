import { taskHolder } from './taskHolder.js';
class _WorkerManager {
    constructor() {
        this.webWorkerModuleSupport = false;
        this.webWorkerModuleSupport = this.supportsWorkerType();
        if (this.webWorkerModuleSupport) {
            this.myWorker = new Worker(new URL('./worker.js', import.meta.url), { type: "module" });
            this.myWorker.onmessage = (oEvent) => {
                const data = oEvent.data;
                this.onmessage(data);
            };
            this.myWorker.onerror = (error) => {
                console.log('myWorker', error);
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
            taskHolder.register(data);
            return data.queryId;
        }
        catch (error) {
            return false;
        }
    }
    async onmessage(data) {
        taskHolder.onmessage(data);
    }
}
export const WorkerManager = new _WorkerManager();

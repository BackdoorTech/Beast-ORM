interface WsRegister {
    type?: 'response' | 'Register';
    queryId: string;
    params: any;
    method: 'execute' | 'migrate';
    callback: Function;
    done?: Function;
}
export declare class _IndexedDBWorkerQueue {
    private myWorker;
    webWorkerModuleSupport: boolean;
    constructor();
    supportsWorkerType(): boolean;
    private workerQueues;
    register(data: WsRegister): string | false;
    onmessage(data: any): Promise<void>;
    finish(queryId: any): void;
    updateFunction(queryId: any, run: any, func: Function): void;
}
export declare const IndexedDBWorkerQueue: _IndexedDBWorkerQueue;
export {};

interface WsRegister {
    type?: 'response' | 'Register';
    func: Function;
    queryId: string;
    params: any;
    method: 'execute' | 'migrate';
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
    requestHandler(): void;
}
export declare const IndexedDBWorkerQueue: _IndexedDBWorkerQueue;
export {};

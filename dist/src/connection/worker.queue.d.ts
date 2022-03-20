interface WsRegister {
    type?: 'response' | 'Register';
    func: Function;
    queryId?: string;
    params: any;
    method: 'execute' | 'migrate';
}
export declare class _IndexedDBWorkerQueue {
    private myWorker;
    constructor();
    private workerQueues;
    register(data: WsRegister): string;
    onmessage(data: any): Promise<void>;
    requestHandler(): void;
}
export declare const IndexedDBWorkerQueue: _IndexedDBWorkerQueue;
export {};

export interface WsRegister {
    type?: 'response' | 'Register';
    queryId: string;
    params: any;
    method: 'execute' | 'migrate';
    callback: Function;
    done?: Function;
}
declare class _WorkerManager {
    private myWorker;
    webWorkerModuleSupport: boolean;
    constructor();
    supportsWorkerType(): boolean;
    register(data: WsRegister): string;
    private onmessage;
}
export declare const WorkerManager: _WorkerManager;
export {};

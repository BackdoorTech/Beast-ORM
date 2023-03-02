interface TaskHolderInterface {
    type?: 'response' | 'Register';
    queryId: string;
    params: any;
    method: 'execute' | 'migrate';
    callback: Function;
    done?: Function;
}
declare class _taskHolder {
    private tasks;
    register(data: TaskHolderInterface): void;
    finish(queryId: any): void;
    updateFunction(queryId: any, run: any, func: Function): void;
    onmessage(data: any): Promise<void>;
}
export declare const taskHolder: _taskHolder;
export {};

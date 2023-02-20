import { DatabaseSchema } from '../../models/register-modal.interface.js';
declare class transactionRequest {
    type: string;
    value: any;
    key: any;
    result: any;
    store: string;
    onsuccessFunc: Function;
    onerrorFunc: Function;
    set onsuccess(func: any);
    set onerror(func: any);
}
export declare class transaction {
    store: any;
    done: Function;
    constructor({ store, done }: {
        store: any;
        done: any;
    });
    request: any[];
    FinishRequest: any[];
    objectStore: (currentStore: any) => {
        add: ({ value, key, config }: {
            value: any;
            key: any;
            config: any;
        }) => transactionRequest;
        getAll: (config: DatabaseSchema) => transactionRequest;
        put: ({ value, key, config }: {
            value: any;
            key?: any;
            config: any;
        }) => transactionRequest;
        clear: ({ config }: {
            config: any;
        }) => transactionRequest;
        delete: ({ id, config }: {
            id: any;
            config: any;
        }) => transactionRequest;
        get: ({ id, config }: {
            id: any;
            config: any;
        }) => transactionRequest;
        index: ({ keyPath, value, config }: {
            keyPath: any;
            value: any;
            config: any;
        }) => transactionRequest;
    };
    onerror(): void;
    oncomplete(): void;
    onabort(): void;
    private static createTransaction;
    private static validateBeforeTransaction;
    private static validateStore;
}
export {};

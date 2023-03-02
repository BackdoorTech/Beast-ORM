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
    doneButFailed: Function;
    tx: IDBTransaction;
    trigger: {
        beforeInsert: boolean;
        afterInsert: boolean;
    };
    constructor({ store, done, db, tx, doneButFailed }: {
        store: any;
        done: any;
        db: any;
        tx: any;
        doneButFailed: any;
    });
    request: any[];
    FinishRequest: any[];
    objectStore: (currentStore: any) => {
        add: ({ value }: {
            value: any;
        }) => transactionRequest;
        getAll: () => transactionRequest;
        put: ({ value, key }: {
            value: any;
            key?: any;
        }) => transactionRequest;
        clear: () => transactionRequest;
        delete: ({ id }: {
            id: any;
        }) => transactionRequest;
        get: ({ id }: {
            id: any;
        }) => transactionRequest;
        index: ({ keyPath, value }: {
            keyPath: any;
            value: any;
        }) => transactionRequest;
    };
}
export {};

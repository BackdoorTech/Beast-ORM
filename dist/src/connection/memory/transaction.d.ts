declare class transactionRequest {
    type: string;
    value: any;
    key: any;
    result: any;
    set onsuccess(func: any);
}
export declare class transaction {
    data: {
        [key: string]: any[];
    };
    constructor({ store }: {
        store: any;
    });
    request: any[];
    objectStore: (name: any) => {
        add: (value: any, key?: any) => transactionRequest;
        getAll: () => transactionRequest;
    };
    onerror(): void;
    oncomplete(): void;
    onabort(): void;
}
export {};

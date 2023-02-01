export declare class transaction {
    data: {
        [key: string]: any[];
    };
    constructor(data: any);
    request: any;
    add(): void;
    getAll(): void;
    objectStore: (name: any) => {
        add: (value: any, key?: any) => any;
        getAll: () => any;
    };
    onerror(): void;
    oncomplete(): void;
    onabort(): void;
}

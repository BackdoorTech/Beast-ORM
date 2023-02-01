class transactionRequest {
    set onsuccess(func) {
        func({ e: { target: { result: this.result } } });
    }
}
export class transaction {
    constructor(data) {
        this.objectStore = (name) => {
            return {
                add: (value, key) => {
                    this.request = new transactionRequest();
                    this.request.type = 'add';
                    this.request.value = value;
                    this.request.key = key;
                    this.request.result = this.data[name].push(value);
                    return this.request;
                },
                getAll: () => {
                    this.request = new transactionRequest();
                    this.request.type = 'getAll';
                    this.request.result = this.data[name];
                    return this.request;
                }
            };
        };
        this.data = data;
    }
    add() { }
    getAll() { }
    onerror() { }
    oncomplete() { }
    onabort() { }
}

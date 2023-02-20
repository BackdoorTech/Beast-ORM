class transactionRequest {
    set onsuccess(func) {
        func({ e: { target: { result: this.result } } });
    }
}
export class transaction {
    constructor({ store }) {
        this.request = [];
        this.objectStore = (name) => {
            return {
                add: (value, key) => {
                    const request = new transactionRequest();
                    request.type = 'add';
                    request.value = value;
                    request.key = key;
                    request.result = this.data[name].push(value);
                    this.request.push(request);
                    return request;
                },
                getAll: () => {
                    const request = new transactionRequest();
                    request.type = 'getAll';
                    request.result = this.data[name];
                    this.request.push(request);
                    return request;
                }
            };
        };
        // this.data = data
    }
    onerror() { }
    oncomplete() { }
    onabort() { }
}

class transactionRequest {
    set onsuccess(func) {
        this.onsuccessFunc = func;
    }
    set onerror(func) {
        this.onerrorFunc = func;
    }
}
export class transaction {
    constructor({ store, done, db, tx }) {
        this.trigger = {
            beforeInsert: false,
            afterInsert: false,
        };
        this.request = [];
        this.FinishRequest = [];
        this.objectStore = (currentStore) => {
            return {
                add: ({ value, key, config }) => {
                    const request = new transactionRequest();
                    request.type = 'add';
                    request.value = value;
                    request.key = key;
                    this.request.push(request);
                    let objectStore = this.tx.objectStore(currentStore);
                    let addGetList = objectStore.add(value);
                    addGetList.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    addGetList.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                getAll: (config) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'getAll';
                    let objectStore = this.tx.objectStore(currentStore);
                    let getList = objectStore.getAll();
                    getList.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    getList.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                put: ({ value, key = undefined, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'put';
                    this.request.push(request);
                    let objectStore = this.tx.objectStore(currentStore);
                    let updateRequest = objectStore.put(value, key);
                    updateRequest.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    updateRequest.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                clear: ({ config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'clear';
                    let objectStore = this.tx.objectStore(currentStore);
                    objectStore.clear();
                    this.tx.oncomplete = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    this.tx.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                delete: ({ id, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'delete';
                    let objectStore = this.tx.objectStore(currentStore);
                    let deleteRequest = objectStore.delete(id);
                    deleteRequest.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    deleteRequest.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                get: ({ id, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'get';
                    let objectStore = this.tx.objectStore(currentStore);
                    let getRequest = objectStore.get(id);
                    getRequest.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    getRequest.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                },
                index: ({ keyPath, value, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'get';
                    let objectStore = this.tx.objectStore(currentStore);
                    let targe = objectStore.index(keyPath);
                    let getRequest = targe.get(value);
                    getRequest.onsuccess = (e) => {
                        request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                        this.done();
                    };
                    getRequest.onerror = (e) => {
                        request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                        this.done();
                    };
                    return request;
                }
            };
        };
        // currentStore = store
        this.done = done;
        this.db = db;
        this.tx = tx;
    }
}

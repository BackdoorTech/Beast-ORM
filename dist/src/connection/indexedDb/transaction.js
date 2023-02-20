import { indexedDB } from './indexedb.js';
class transactionRequest {
    set onsuccess(func) {
        this.onsuccessFunc = func;
    }
    set onerror(func) {
        this.onerror = func;
    }
}
export class transaction {
    constructor({ store, done }) {
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
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror, onabort);
                        let objectStore = tx.objectStore(currentStore);
                        let addGetList = objectStore.add(value);
                        addGetList.onsuccess = (e) => {
                            var _a, _b;
                            console.log('add result e');
                            console.log(e);
                            (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            db.close();
                            this.done();
                        };
                    });
                    return request;
                },
                getAll: (config) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'getAll';
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onabort);
                        let tx = transaction.createTransaction(db, "readonly", currentStore, oncomplete, onerror, onabort);
                        let objectStore = tx.objectStore(currentStore);
                        let getList = objectStore.getAll();
                        getList.onsuccess = (e) => {
                            var _a, _b;
                            console.log('all', e);
                            (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            db.close();
                            this.done();
                        };
                        getList.onerror = (e) => {
                            request === null || request === void 0 ? void 0 : request.onerrorFunc(e);
                            db.close();
                            this.done();
                        };
                    });
                    return request;
                },
                put: ({ value, key = undefined, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'put';
                    this.request.push(request);
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                        let objectStore = tx.objectStore(currentStore);
                        let updateRequest = objectStore.put(value, key);
                        updateRequest.onsuccess = (e) => {
                            var _a, _b;
                            (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            db.close();
                            this.done();
                        };
                    });
                    return request;
                },
                clear: ({ config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'clear';
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                        let objectStore = tx.objectStore(currentStore);
                        objectStore.clear();
                        tx.oncomplete = (e) => {
                            var _a, _b;
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            try {
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            }
                            catch (error) { }
                            db.close();
                            this.done();
                        };
                    })
                        .catch(onerror);
                    return request;
                },
                delete: ({ id, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'delete';
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                        let objectStore = tx.objectStore(currentStore);
                        let deleteRequest = objectStore.delete(id);
                        deleteRequest.onsuccess = (e) => {
                            var _a, _b;
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            try {
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            }
                            catch (error) { }
                            db.close();
                            this.done();
                        };
                    })
                        .catch(onerror);
                    return request;
                },
                get: ({ id, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'get';
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readonly", currentStore, oncomplete, onerror);
                        let objectStore = tx.objectStore(currentStore);
                        let getRequest = objectStore.get(id);
                        getRequest.onsuccess = (e) => {
                            var _a, _b;
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            try {
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            }
                            catch (error) { }
                            db.close();
                            this.done();
                        };
                    })
                        .catch(onerror);
                    return request;
                },
                index: ({ keyPath, value, config }) => {
                    const request = new transactionRequest();
                    this.request.push(request);
                    request.type = 'get';
                    let onerror = (x) => { console.log('error', x); };
                    let oncomplete = () => { };
                    let onabort = (e) => { console.log('error', e); };
                    indexedDB.getConnection(config).then(db => {
                        transaction.validateBeforeTransaction(db, currentStore, onerror);
                        let tx = transaction.createTransaction(db, "readonly", currentStore, oncomplete, onerror);
                        let objectStore = tx.objectStore(currentStore);
                        let targe = objectStore.index(keyPath);
                        let getRequest = targe.get(value);
                        getRequest.onsuccess = (e) => {
                            var _a, _b;
                            request === null || request === void 0 ? void 0 : request.onsuccessFunc(e);
                            try {
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                            }
                            catch (error) { }
                            db.close();
                            this.done();
                        };
                    })
                        .catch(onerror);
                    return request;
                }
            };
        };
        // currentStore = store
        this.done = done;
    }
    onerror() { }
    oncomplete() { }
    onabort() { }
    static createTransaction(db, dbMode, currentStore, resolve, reject, abort) {
        let tx = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
    static validateBeforeTransaction(db, storeName, reject) {
        if (!db) {
            reject("Queried before opening connection");
        }
        if (!this.validateStore(db, storeName)) {
            reject(`Store ${storeName} not found`);
        }
    }
    static validateStore(db, storeName) {
        return db.objectStoreNames.contains(storeName);
    }
}

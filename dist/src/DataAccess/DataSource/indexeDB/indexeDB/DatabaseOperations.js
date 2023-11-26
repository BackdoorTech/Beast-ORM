import { IIndexedDBOperations } from "../../../../BusinessLayer/_interface/DataAccess/interface.type.js";
import { ok, error as err } from "../../../../Utility/Either/index.js";
export class DatabaseOperation {
    constructor() {
        this.finishOperationCallback = [];
    }
    onDone(fn) {
        if (this._result) {
            fn(this._result);
        }
        else {
            this.finishOperationCallback.push(fn);
        }
    }
    runDoneCallBack(result) {
        this._result = result;
        for (const fn of this.finishOperationCallback) {
            fn(this._result);
        }
    }
}
export class SelectOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.getAll;
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: this.index };
                resolve(this.result);
                this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                var _a;
                this.isProcessing = false;
                reject(error);
                if ((_a = this.callBacks) === null || _a === void 0 ? void 0 : _a.onerror) {
                    this.callBacks.onerror(JSON.stringify(error));
                }
                this.result = { data: request.result, index: this.index };
                this.runDoneCallBack(err(false));
            };
        });
    }
}
export class InsertOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.add;
        this.data = data.data;
        this.callBacks = data.callBacks;
        this.index = data.index;
        this.proceedData(data);
    }
    proceedData(data) {
        const tableSchema = data.ObjectStore.schema;
        const idField = tableSchema.id.keyPath;
        if (this.data.hasOwnProperty(idField)) {
            if (this.data[idField] == null || this.data[idField] == undefined) {
                delete this.data[idField];
            }
        }
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: 0 };
                resolve(this.result);
                this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                this.isProcessing = false;
                reject(error);
                if (this.callBacks.onerror) {
                    this.callBacks.onerror(JSON.stringify(error));
                }
                this.runDoneCallBack(err(false));
            };
        });
    }
}
export class UpdateOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.put;
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: 0 };
                resolve(this.result);
                this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                this.isProcessing = false;
                reject(error);
                if (this.callBacks.onerror) {
                    this.callBacks.onerror((error.target["error"]));
                }
                this.runDoneCallBack(err(false));
            };
        });
    }
}
export class DeleteOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.delete;
        this.data = data.pk;
        this.callBacks = data.callBacks;
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: 0 };
                resolve(this.result);
                this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                this.isProcessing = false;
                reject(error);
                if (this.callBacks.onerror) {
                    this.callBacks.onerror(error.target["error"]);
                }
                this.runDoneCallBack(err(false));
            };
        });
    }
}
export class ClearAllOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.clear;
        this.callBacks = data.callBacks;
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: 0 };
                resolve(this.result);
                this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                this.isProcessing = false;
                reject(error);
                if (this.callBacks.onerror) {
                    this.callBacks.onerror(error.target["error"]);
                }
                this.runDoneCallBack(err(false));
            };
        });
    }
}
export class GetAllOperation extends DatabaseOperation {
    constructor(data) {
        super();
        this.isProcessing = false;
        this.operation = IIndexedDBOperations.getAll;
        this.callBacks = data.callBacks;
    }
    async execute(request) {
        this.isProcessing = true;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                this.isProcessing = false;
                this.result = { data: request.result, index: 0 };
                resolve(this.result);
                // this.callBacks.onsuccess(this.result);
                this.runDoneCallBack(ok(this.result));
            };
            request.onerror = (error) => {
                this.isProcessing = false;
                reject(error);
                if (this.callBacks.onerror) {
                    this.callBacks.onerror(error.target["error"]);
                }
                this.runDoneCallBack(err(false));
            };
        });
    }
}

import { ok, error as err } from "../../../../Utility/Either/index.js";
export class selectOperation {
    constructor(data) {
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}
export class insertOperationOperation {
    constructor(data) {
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}
export class UpdateOperation {
    constructor(data) {
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}
export class DeleteOperation {
    constructor(data) {
        this.operation = "clear";
        Object.assign(this, data.callBacks);
    }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}
export class ClearAllOperation {
    constructor(data) {
        this.data = data.data;
        this.callBacks = data.callBacks;
    }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}
export class GetAllOperation {
    constructor() { }
    async execute(request, operation) {
        const { onsuccess, onerror, index, finishRequest } = operation;
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(JSON.stringify(error));
                }
                finishRequest(err(false));
            };
        });
    }
}

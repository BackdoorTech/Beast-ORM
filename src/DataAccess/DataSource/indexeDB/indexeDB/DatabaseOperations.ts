import { ok, error as err, Either } from "../../../../Utility/Either/index.js";
import { IReturnObject, IReturnSelectObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { ObjectStoreRequestResult } from "./ObjectStore.type";

interface selectOperationParams {
  data: Object,
  callBacks: IReturnSelectObject
}


interface deleteOperationParams {
  callBacks: IReturnSelectObject
}


interface operationParams {
  data: Object,
  callBacks: IReturnObject
}

interface GetAllOperationParams {}

export class selectOperation implements selectOperationParams {
  
  data: Object;
  callBacks: Object;

  constructor(data: selectOperationParams) {
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}


export class insertOperationOperation implements operationParams {
  
  data: Object;
  callBacks: Object;

  constructor(data: operationParams) {
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}


export class UpdateOperation implements operationParams {
  
  data: Object;
  callBacks: Object;

  constructor(data: operationParams) {
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}



export class DeleteOperation implements operationParams {
  
  data: Object;
  callBacks: Object;
  operation = "clear"

  constructor(data: deleteOperationParams) {
    Object.assign(this, data.callBacks)
  }

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}



export class ClearAllOperation implements operationParams {
  
  data: Object;
  callBacks: Object;

  constructor(data: operationParams) {
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}

export class GetAllOperation implements operationParams {
  
  data: Object;
  callBacks: Object;

  constructor() {}

  async execute(request:IDBOpenDBRequest, operation): Promise<ObjectStoreRequestResult> {
    
    const { onsuccess, onerror, index, finishRequest } = operation;
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        reject(error);
        if(onerror) {
          onerror(JSON.stringify(error))
        }
        finishRequest(err(false))
      };
    });
  }
}

export interface IDatabaseOperation {

  execute(request:IDBOpenDBRequest)
}
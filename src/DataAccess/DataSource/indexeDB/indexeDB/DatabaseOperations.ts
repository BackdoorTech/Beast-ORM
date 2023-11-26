import { IGetAllOperationParams, IIndexedDBOperations, IInsertOperationParams, ISelectOperationParams, IUpdateOperationParams } from "../../../../BusinessLayer/_interface/DataAccess/interface.type.js";
import { ITableSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { ok, error as err, Either } from "../../../../Utility/Either/index.js";
import { IReturnObject, IReturnSelectObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { ObjectStore } from "./ObjectStore.js";
import { IOperationResult } from "./ObjectStore.type";

export class DatabaseOperation {
  private  finishOperationCallback: Function[] = []
  private _result: any

  onDone(fn:(result: Either<IOperationResult, any>) => void) {
    if(this._result) {
      fn(this._result)
    } else {
      this.finishOperationCallback.push(fn)
    }
  }

  runDoneCallBack(result: Either<IOperationResult, any>) {
    this._result = result
    for( const fn of this.finishOperationCallback) {
      fn(this._result)
    }
  }
}


export class SelectOperation  extends DatabaseOperation {
  
  data: any;
  private callBacks: IReturnObject;
  isProcessing = false
  private result:IOperationResult
  private index
  operation = IIndexedDBOperations.getAll
  
  constructor(data: ISelectOperationParams) {
    super();
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBRequest<any[]>): Promise<IOperationResult> {
    
    this.isProcessing = true

    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false
        
        this.result = {data:request.result, index: this.index}
        resolve(this.result);
        this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false

        reject(error);
        if(this.callBacks?.onerror) {
          this.callBacks.onerror(JSON.stringify(error))
        }

        this.result = {data:request.result, index: this.index}
        this.runDoneCallBack(err(false))
      };
      
    });
  }

}



export class InsertOperation extends DatabaseOperation {
  isProcessing = false
  private result:IOperationResult
  data: any;
  private callBacks: IReturnObject;
  operation = IIndexedDBOperations.add
  index: number;

  constructor(data: IInsertOperationParams) {
    super();
    this.data = data.data
    this.callBacks = data.callBacks
    this.index = data.index

    this.proceedData(data)
  }


  private proceedData(data: IInsertOperationParams) {
    const tableSchema: ITableSchema  = data.ObjectStore.schema

    const idField = tableSchema.id.keyPath

    if(this.data.hasOwnProperty(idField)) {
      if(this.data[idField] == null || this.data[idField] == undefined) {
        delete this.data[idField]
      }
    }
  }


  async execute(request:IDBRequest<IDBValidKey>): Promise<IOperationResult> {
    
    this.isProcessing = true

    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false
        this.result = {data:request.result, index:0}
        resolve(this.result);
        this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false
        reject(error);
        if(this.callBacks.onerror) {
          this.callBacks.onerror(JSON.stringify(error))
        }
        this.runDoneCallBack(err(false))
      };

      
    });
  }
}


export class UpdateOperation extends DatabaseOperation {
  isProcessing = false
  private result:IOperationResult
  data: any;
  private callBacks: IReturnObject;

  operation = IIndexedDBOperations.put

  constructor(data: IUpdateOperationParams) {
    super();
    this.data = data.data
    this.callBacks = data.callBacks
  }

  async execute(request:IDBRequest<IDBValidKey>): Promise<IOperationResult> {
    this.isProcessing = true
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false

        this.result = {data:request.result, index:0}
        resolve(this.result);
        this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false

        reject(error);
        if(this.callBacks.onerror) {
          this.callBacks.onerror((error.target["error"]))
        }
        this.runDoneCallBack(err(false))
      };
    });
  }
}


interface IDeleteOperationParams {
  /**
   * @description primaryKey
   */
  pk: number | string,
  callBacks: IReturnObject
}


export class DeleteOperation extends DatabaseOperation {
  isProcessing = false
  private result:IOperationResult
  data: any;
  pk: string | number;
  private callBacks: IReturnObject;
  operation = IIndexedDBOperations.delete

  constructor(data: IDeleteOperationParams) {
    super();
    this.data = data.pk
    this.callBacks = data.callBacks
  }


  async execute(request:IDBRequest<undefined>): Promise<IOperationResult> {
    this.isProcessing = true
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false

        this.result = {data:request.result, index:0}
        resolve(this.result);
        this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false

        reject(error);
        if(this.callBacks.onerror) {
          this.callBacks.onerror(error.target["error"])
        }
        this.runDoneCallBack(err(false))
      };
    });
  }
}


interface ClearAllOperationParams {
  callBacks: IReturnObject
}

export class ClearAllOperation extends DatabaseOperation {
  isProcessing = false
  private result:IOperationResult
  private callBacks: IReturnObject;
  operation = IIndexedDBOperations.clear
  data: any;

  constructor(data: ClearAllOperationParams) {
    super();
    this.callBacks = data.callBacks
  }

  async execute(request:IDBRequest<undefined>): Promise<IOperationResult> {
    this.isProcessing = true
    
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false

        this.result = {data:request.result, index:0}
        resolve( this.result);
        this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false

        reject(error);
        if(this.callBacks.onerror) {
          this.callBacks.onerror(error.target["error"])
        }
        this.runDoneCallBack(err(false))
      };
    });
  }
}

export class GetAllOperation extends DatabaseOperation {
  isProcessing = false
  private result:IOperationResult
  data: any;
  private callBacks: IReturnObject;
  operation = IIndexedDBOperations.getAll

  constructor(data: IGetAllOperationParams) {
    super();
    this.callBacks = data.callBacks
  }

  async execute(request:IDBRequest<any[]>): Promise<IOperationResult> {
    
    this.isProcessing = true
    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        this.isProcessing = false

        this.result = {data:request.result, index:0}
        resolve( this.result);
        // this.callBacks.onsuccess(this.result);
        this.runDoneCallBack(ok(this.result))
      };

      request.onerror = (error) => {
        this.isProcessing = false

        reject(error);
        if(this.callBacks.onerror) {
          this.callBacks.onerror(error.target["error"])
        }
        this.runDoneCallBack(err(false))
      };
    });
  }
}



export type IAllDatabaseOperation = GetAllOperation | ClearAllOperation | DeleteOperation| UpdateOperation| InsertOperation | SelectOperation

import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { uniqueGenerator } from "../../../../Utility/utils.js";
import { IData, IDataInsert, IDatabaseStrategy, IMigrations, IReturnObject, IReturnSelectObject, IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type.js";
// IndexedDB strategy
export class IndexedDBWorkerStrategy implements IDatabaseStrategy {

  databaseName: string
  tableName: string
  private myWorker:  Worker
  callbacks: {[key: string]: Object} = {}

	constructor(databaseName: string) {
    this.databaseName = databaseName

    this.myWorker = new Worker(new URL('./worker/worker.js', import.meta.url),{ type: "module" });

    this.myWorker.onmessage =  (oEvent) => {
      const data = oEvent.data
      this.callbacks[data.UUID][data.callbackName](data.data)
    }

    this.myWorker.onerror = (error) => {
      console.log('myWorker', error);
    };

    this.myWorker.postMessage({databaseName})
	}

  static handler(instance: IndexedDBWorkerStrategy, callbacks:IReturnObject, data: any, methodName) {
    const UUID =  uniqueGenerator()
    const originalDone = callbacks.done

    callbacks.done =  (dataFromWorker) => {
      originalDone(dataFromWorker)
      delete instance.callbacks[UUID]
    }

    instance.callbacks[UUID] = callbacks
    instance.myWorker.postMessage({methodName, data, UUID})
  }

  update(data: IData): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {

      IndexedDBWorkerStrategy.handler(this, callbacks, data, "update")
    }
  }
  updateMany(data: IData): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "updateMany")
    }
  }
  insert(data: IDataInsert): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "insert")
    }
  }
  insertMany(data: IDataInsert): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "insertMany")
    }
  }
  delete(data: IData): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "delete")
    }
  }
  deleteMany(data: IData): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "deleteMany")
    }
  }
  select(data: IData): (returnObject: IReturnSelectObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "select")
    }
  }
  selectMany(data: IData): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "selectMany")
    }
  }
  migrate(migrate: IDatabaseSchema): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, migrate, "migrate")
    }
  }

  prepare(migrate: IDatabaseSchema): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, migrate, "prepare")
    }
  }
  RemoveTrigger(data): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      IndexedDBWorkerStrategy.handler(this, callbacks, data, "RemoveTrigger")
    }
  }

  addTrigger(data): (returnObject: IReturnTriggerObject) => void {
    return async (callbacks: IReturnTriggerObject) => {

      IndexedDBWorkerStrategy.handler(this, callbacks, data, "addTrigger")
    }
  }
}

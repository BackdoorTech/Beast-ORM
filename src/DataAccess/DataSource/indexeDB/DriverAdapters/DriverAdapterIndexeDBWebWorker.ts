import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
// IndexedDB strategy
export class IndexedDBWorkerStrategy implements IDatabaseStrategy {

  private myWorker:  Worker
  private Queue: {}

	constructor() {
    this.myWorker = new Worker(new URL('./worker/worker.js', import.meta.url),{ type: "module" });

    this.myWorker.onmessage =  (oEvent) => {
      const data = oEvent.data
      this.Queue[data.UUID][data.method](data.data)
    }

    this.myWorker.onerror = (error) => {
      console.log('myWorker', error);
    };
	}

  openDatabase() {
    const UUID = ''
    return async (callbacks: IReturnObject) => {
      const { done } = callbacks
      callbacks.done = (...arg) => {
        done(...arg)
      }
      this.myWorker.postMessage({method: 'openDatabase', UUID, ...callbacks})
    }
  }

  insert(table, data) {
    const UUID = ''
    return async (callbacks: IReturnObject) => {
      const { done } = callbacks
      callbacks.done = (...arg) => {
        done(...arg)
      }
      this.Queue[UUID] = {...callbacks}
      this.myWorker.postMessage({method: 'openDatabase', UUID, ...callbacks})
    }
  }

  select(table, key) {
    const UUID = ''
    return async ( callbacks: IReturnObject) => {
      const { done } = callbacks
      callbacks.done = (...arg) => {
        done(...arg)
      }
      this.Queue[UUID] = {...callbacks}
      this.myWorker.postMessage({method: 'openDatabase', UUID, ...callbacks})
    }
  }

  migrate(migrate: IMigrations) {
    const UUID = ''
    return async (callbacks: IReturnObject) => {
      const { done } = callbacks
      callbacks.done = (...arg) => {
        done(...arg)
      }
      this.Queue[UUID] = {...callbacks}
      this.myWorker.postMessage({method: 'openDatabase', UUID, ...callbacks})
    }
  }

  prepare(migrate: IMigrations) {
    const UUID = ''
    return async (callbacks: IReturnObject) => {
      const { done } = callbacks
      callbacks.done = (...arg) => {
        done(...arg)
      }
      this.Queue[UUID] = {...callbacks}
      this.myWorker.postMessage({method: 'openDatabase', UUID, ...callbacks})
    }

  }
}



import { DatabaseSchema } from '../../models/register-modal.interface.js'
import { indexedDB } from './indexedb.js'
import { triggerSignal } from './triggers/triggers.js'
class transactionRequest {
    type: string
    value: any
    key: any
    result: any
    store: string

    onsuccessFunc: Function
    onerrorFunc: Function

    set onsuccess(func) {
        this.onsuccessFunc = func
    }
    
    set onerror(func) {
        this.onerrorFunc = func
    }


}

export class transaction {
    store

    done: Function
    doneButFailed: Function
   //  db
    tx: IDBTransaction

    trigger = {
        beforeInsert: false,
        afterInsert: false,
    }

    constructor({store, done, db, tx, doneButFailed}) {
        // currentStore = store
        this.doneButFailed = doneButFailed
        this.done = done
        // this.db = db
        this.tx = tx
    }

    request = []
    FinishRequest = []

    objectStore = (currentStore) => {
        return {
            add:({value}) =>  {
                const request = new transactionRequest()
                request.type = 'add'
                request.value = value
                this.request.push(request)
    
                let objectStore = this.tx.objectStore(currentStore);
                
                let addGetList = objectStore.add(value);
                
                addGetList.onsuccess = async (e: any) => {
                    request?.onsuccessFunc(e)
                    this.done()
                };

                addGetList.onerror = async (e) => {
                    request?.onerrorFunc(e)
                    this.doneButFailed()
                };
        

                return request
            },
            getAll:(config:DatabaseSchema) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'getAll'

                let objectStore = this.tx.objectStore(currentStore);
                let getList = objectStore.getAll();
                getList.onsuccess = (e: any) => { 
                    this.done()
                    request?.onsuccessFunc(e)
                };

                getList.onerror = (e: any) => {
                    this.doneButFailed()
                    request?.onerrorFunc(e)
                };

                return request
            },
            put: ({value, key = undefined, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'put'
                this.request.push(request)

                let objectStore = this.tx.objectStore(currentStore);
                let updateRequest = objectStore.put(value, key);
                updateRequest.onsuccess = async (e: any) => {
                    request?.onsuccessFunc(e)
                    
                    this.done()
                };
                updateRequest.onerror =  async (e) => {
                    request?.onerrorFunc(e)
                    
                    this.doneButFailed()
                };
  

                return request
            },
            clear: ({config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'clear'
           
                let objectStore = this.tx.objectStore(currentStore);
                objectStore.clear();
                
                this.tx.oncomplete = async (e: any) => {
                    request?.onsuccessFunc(e)
                    this.done() 
                };
                this.tx.onerror = async (e) => {
                    request?.onerrorFunc(e)
                    this.doneButFailed()
                };
           

                return request
            },
            delete: ({id, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'delete'

                let objectStore = this.tx.objectStore(currentStore);
                let deleteRequest = objectStore.delete(id);
                deleteRequest.onsuccess = async (e: any) => {
                    request?.onsuccessFunc(e)
                    this.done() 
                };
                deleteRequest.onerror = async (e) => {
                    request?.onerrorFunc(e)                    
                    this.doneButFailed()
                };
               

                return request
            },
            get:({id, config})=> {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'get'

                let objectStore = this.tx.objectStore(currentStore);
                let getRequest = objectStore.get(id);
                getRequest.onsuccess = (e: any) => {
                    this.done()
                    request?.onsuccessFunc(e) 
                };
                getRequest.onerror = (e) => {
                    this.doneButFailed()
                    request?.onerrorFunc(e)
                };
   
                return request
            },
            index: ({keyPath, value, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'get'

                let objectStore = this.tx.objectStore(currentStore);
                let targe = objectStore.index(keyPath);
                let getRequest = targe.get(value);
                getRequest.onsuccess = (e: any) => {
                    this.done()
                    request?.onsuccessFunc(e) 
                };
                getRequest.onerror = (e) => {
                    this.doneButFailed()
                    request?.onerrorFunc(e)                    
                };

                return request
            }
        }
    }
}


import { DatabaseSchema } from '../../models/register-modal.interface.js'
import { indexedDB } from './indexedb.js'
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
        this.onerror = func
    }

    

}

export class transaction {
    store

    done: Function

    constructor({store, done}) {
        // currentStore = store
        this.done = done
    }

    request = []
    FinishRequest = []

    objectStore = (currentStore) => {
        return {
            add:({value, key, config}) =>  {
                const request = new transactionRequest()
                request.type = 'add'
                request.value = value
                request.key = key
                this.request.push(request)


                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror, onabort);
                    let objectStore = tx.objectStore(currentStore);
        
                    let addGetList = objectStore.add(value);

                    addGetList.onsuccess = (e: any) => {
                        console.log('add result e');
                        console.log(e);
                        (tx as any)?.commit?.();
                        request?.onsuccessFunc(e)
                        db.close()
                        this.done()
                    };
        
        
                  })

                return request
            },
            getAll:(config:DatabaseSchema) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'getAll'

                let onerror = (x) =>{ console.log('error', x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onabort);
                    let tx = transaction.createTransaction(db, "readonly", currentStore , oncomplete, onerror, onabort);
                    let objectStore = tx.objectStore(currentStore);
                    let getList = objectStore.getAll();
                    getList.onsuccess = (e: any) => {
                        console.log('all', e);
                        (tx as any)?.commit?.();
                        request?.onsuccessFunc(e)
                        db.close()
                        this.done()
                    };

                    getList.onerror = (e: any) => {
                        request?.onerrorFunc(e)
                        db.close()
                        this.done()
                    };

                });

                return request
            },
            put: ({value, key = undefined, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'put'
                this.request.push(request)

                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

        
                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                    let objectStore = tx.objectStore(currentStore);
                    let updateRequest = objectStore.put(value, key);
                    updateRequest.onsuccess = (e: any) => {
                        (tx as any)?.commit?.();
                        request?.onsuccessFunc(e)
                        db.close()
                        this.done()
                    };
                })

                return request
            },
            clear: ({config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'clear'

                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                    let objectStore = tx.objectStore(currentStore);
                    objectStore.clear();
                    
                    tx.oncomplete = (e: any) => {
                        request?.onsuccessFunc(e)

                        try {
                           (tx as any)?.commit?.();
                        } catch (error) {}

                        db.close()
                        this.done() 
                    };
                })
                .catch(onerror);

                return request
            },
            delete: ({id, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'delete'

                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readwrite", currentStore, oncomplete, onerror);
                    let objectStore = tx.objectStore(currentStore);
                    let deleteRequest = objectStore.delete(id);
                    deleteRequest.onsuccess = (e: any) => {
                        request?.onsuccessFunc(e)

                        try {
                           (tx as any)?.commit?.();
                        } catch (error) {}

                        db.close()
                        this.done() 
                    };
                  })
                  .catch(onerror);

                return request
            },
            get:({id, config})=> {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'get'

                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readonly", currentStore, oncomplete, onerror);
                    let objectStore = tx.objectStore(currentStore);
                    let getRequest = objectStore.get(id);
                    getRequest.onsuccess = (e: any) => {
                        request?.onsuccessFunc(e)

                        try {
                            (tx as any)?.commit?.();
                        } catch (error) {}

                        db.close()
                        this.done() 
                    };
                })
                .catch(onerror);

                return request
            },
            index: ({keyPath, value, config}) => {
                const request = new transactionRequest()
                this.request.push(request)

                request.type = 'get'

                let onerror = (x) =>{ console.log('error',x)}
                let oncomplete = () =>{}
                let onabort = (e) => { console.log('error',e)}

                indexedDB.getConnection(config).then(db => {
                    transaction.validateBeforeTransaction(db, currentStore, onerror);
                    let tx = transaction.createTransaction(db, "readonly", currentStore, oncomplete, onerror);
                    let objectStore = tx.objectStore(currentStore);
                    let targe = objectStore.index(keyPath);
                    let getRequest = targe.get(value);
                    getRequest.onsuccess = (e: any) => {
                        request?.onsuccessFunc(e)

                        try {
                            (tx as any)?.commit?.();
                        } catch (error) {}

                        db.close()
                        this.done() 
                    };
                })
                .catch(onerror);

                return request
            }
        }
    }

    onerror(){}
    oncomplete(){}
    onabort (){}


    private static createTransaction(
        db: IDBDatabase,
        dbMode: IDBTransactionMode,
        currentStore: string,
        resolve,
        reject?,
        abort?
      ): IDBTransaction {
        let tx: IDBTransaction = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
      }

    private static validateBeforeTransaction(db, storeName: string, reject: Function) {
        if (!db) {
          reject("Queried before opening connection");
        }
        if (!this.validateStore(db, storeName)) {
          reject(`Store ${storeName} not found`);
        }
    }

    private static validateStore(db: IDBDatabase, storeName: string) {
        return db.objectStoreNames.contains(storeName);
    }
}
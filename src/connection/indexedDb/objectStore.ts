import { TableSchema } from "../../models/register-modal.interface.js";
import { transaction } from './transaction.js';
import { PostMessage } from "./postMessage.js";

// inspire by https://github.com/hc-oss/use-indexeddb

export class ObjectStore {

   transactions:  {
    callback: Function,
    queryId: string
    mode: string
  }[]  = []

   parallelTransactions: {
    callback: Function,
    queryId: string
    mode: string
    DatabaseName: string
  }[] = []

   transactionsToCommit:  {
    callback: Function,
    queryId: string
    mode: string
  }[] = []

   dbInstance: IDBDatabase

   txInstance: {
    IDBTransaction: IDBTransaction,
    IDBTransactionMode: IDBTransactionMode,
    active: boolean
   };

  executingTransaction : boolean = false

  txInstanceMode: object = {}

  storeCache: {[store: string]: object[] } = {}
  transactionOnCommit: {[queryId: string]: Object} = {}
  haveWriteSomeThing = false

  name = ''

  transactionFinish = (TableName) => {}


  config: TableSchema

  constructor({store}: {store: TableSchema}) {
    this.name = store.name
    this.config = store
  }



   async transactionTrigger() {
    if(this.txInstanceMode['readwrite']) {
      try {
        (this.txInstance.IDBTransaction as any)?.commit?.();

        (async () => {
          if(this.haveWriteSomeThing) {
            for (let [queryId, value] of Object.entries(this.transactionOnCommit)) {
              this.cleanTransaction();
              PostMessage({
                  run: 'callback',
                  queryId: queryId,
                  value: true
              });
            }
          }
        })();

      } catch (error) {
        // no commit need
        // console.log('not need to commit')
      }
    } else {
      // console.log("mode ", JSON.stringify(this.txInstanceMode))
    }

    this.txInstanceMode['readwrite'] = {}
    this.transactionsToCommit = [];
    this.haveWriteSomeThing = false
    this.cleanTransaction();
  }

  cleanTransaction() {
    this.txInstanceMode = {}
  }

   executeTransaction() {

    const {mode, callback} = this.transactions[0]
    this.txInstanceMode[mode] = true

    const done = async () => {
      const transaction = this.transactions.shift();
      this.transactionsToCommit.push(transaction)


      if(mode == 'readwrite') {
        this.haveWriteSomeThing = true
      }

      if(this.transactions.length == 0) {
        this.executingTransaction = false;


        this.transactionTrigger()
        delete this.txInstance


        this.transactionFinish(this.name)
        // console.log("finish")

      } else {
        this.executeTransaction()
      }
    }


    const doneButFailed = async() => {
      this.transactions.shift();
      this.txInstance.active = false;

      if(this.transactionsToCommit.length >= 1) {
        this.transactionTrigger();
      }

      if(this.transactions.length >= 1) {

        const tx = this.createTransaction(
          this.dbInstance,
          "readwrite",
          (onerror) => {},
          (oncomplete) => {},
          (onabort) => {}
        )

        this.txInstance = {
          IDBTransaction: tx,
          active: true,
          IDBTransactionMode: "readwrite"
        }

        this.executeTransaction()
      }
    }

    this.validateBeforeTransaction(this.dbInstance, (data) => {

    })

    const transactionInstance = new transaction({
      store: this.name,
      done,
      doneButFailed,
      db: this.dbInstance,
      tx: this.txInstance.IDBTransaction
    })
    callback(transactionInstance)

  }


   parallelExecuteTransaction() {

    const { mode, callback } = this.parallelTransactions.shift()
    this.txInstanceMode[mode] = true
    const tx = this.createTransaction(
      this.dbInstance,
      "readonly",
      (onerror) => {},
      (oncomplete) => {},
      (onabort) => {}
    )

    const done = async () => {
      if(this.parallelTransactions.length == 0) {
        this.txInstanceMode[mode] = false
      }
    }
    const doneButFailed = async() => {
      if(this.parallelTransactions.length == 0) {
        this.txInstanceMode[mode] = false
      }
    }

    const transactionInstance = new transaction({
      store: this.name,
      done,
      doneButFailed,
      db: this.dbInstance,
      tx: this.txInstance.IDBTransaction
    })
    callback(transactionInstance)
  }

   getOrCreateTransaction({queryId, Database}, mode: IDBTransactionMode, callback:  (transaction:transaction) => void) {

    //if(mode == 'readonly' && !this.txInstance) {
    //  this.parallelTransactions.push({DatabaseName, queryId, mode, callback})
    //  this.parallelExecuteTransaction(DatabaseName, TableName)
    //} else {
      this.transactions.push({queryId, mode, callback})
    //}

    if (this.executingTransaction == false) {
      this.executingTransaction = true

        const tx = this.createTransaction(
          Database,
          "readwrite",
          (onerror) => {},
          (oncomplete) => {},
          (onabort) => {}
        )

        this.dbInstance = Database

        if(!this.txInstance) {
          this.txInstance = {
            IDBTransaction: tx,
            active: true,
            IDBTransactionMode: "readwrite"
          }
        }

        this.txInstance.IDBTransaction = tx
        this.txInstance.active = true

        // this.dbInstanceUsing = true
        this.executeTransaction()

    } else {
      if(mode == 'readonly') {

      }
    }
  }


  private  createTransaction(
    db: IDBDatabase,
    dbMode: IDBTransactionMode,
    onerror,
    oncomplete?,
    onabort?
  ): IDBTransaction {
    let tx: IDBTransaction = db.transaction(this.name, dbMode);
    tx.onerror = onerror;
    tx.oncomplete = oncomplete;
    tx.onabort = onabort;
    return tx;
  }

  private  validateBeforeTransaction(db, reject: Function) {
    if (!db) {
      reject("Queried before opening connection");
    }
    // if (!this.validateStore(db, storeName)) {
    //   reject(`Store ${storeName} not found`);
    // }
  }


  transactionOnCommitSubscribe(TableName: string , DatabaseName:string, SubscriptionName) {
    this.transactionOnCommit[SubscriptionName] = {}
    return {
      run: 'callback',
      subscription: true,
      queryId: SubscriptionName,
      value: true
    }
  }

   transactionOnCommitUnSubscribe(TableName, DatabaseName:string, SubscriptionName) {
    delete this.transactionOnCommit[SubscriptionName]
    return {
      run: 'callback',
      subscription: false,
      queryId: SubscriptionName,
      value: true
    }
  }
}


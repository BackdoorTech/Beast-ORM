import { FieldSchema } from "../../../../BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type.js";



class indexedDBFIFO {
  dbName
  db
  transactionQueue = []
  isTransactionInProgress = false
  txInstance

  async openDatabase() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {

        console.log("else")
        let request = indexedDB.open("Migrations", 2);

        request.onsuccess = () => {
          console.log("onsuccess")
          this.db = request.result;
          this.txInstance =  this.db.transaction(["database"], "readwrite")
          resolve(this.db);
        };
        request.onupgradeneeded =  (event: any)  => {
          console.log("onupgradeneeded")

          let db = event.target.result;

          db.createObjectStore("database", { keyPath: "MyID", autoIncrement: true });
          db.close()
          resolve(this.openDatabase());
        };

        request.onerror = (error) => {
          console.log("onerror")
          reject(error);
        };

      }
    });
  }

  pending = 0
  async processTransactionQueue() {

    console.log('processTransactionQueue')
    if (this.isTransactionInProgress) {
      return;
    }

    this.db = await this.openDatabase()

    console.log("enter")

    let loop = () => {
      if (this.transactionQueue.length > 0) {
        this.isTransactionInProgress = true;
        let nextTransaction = this.transactionQueue.shift();
        this.pending++
        this.executeTransaction(nextTransaction)
          .then(() => {})
          .catch((error) => {}).finally(()=> {
            console.log("done")
            this.pending--
            loop()
          })

          this.pending++
          this.executeTransaction(nextTransaction)
          .then(() => {})
          .catch((error) => {}).finally(()=> {
            console.log("done")
            this.pending--
            loop()
          })
      } else {
        this.isTransactionInProgress = false;

        if(this.db) {
          if(this.pending == 0) {
            console.log('close');

            (this.txInstance )?.commit();
            this.db.close()
            this.db = null
            this.txInstance = null
          }
        }
      }
    }

    loop()

  }

  async executeTransaction(transaction) {
    return new Promise((resolve, reject) => {
      let objectStore = transaction.storeName;
      let mode = transaction.mode;
      let operation = transaction.operation;

      let request = this.txInstance.objectStore("database")[operation](transaction.data);

      request.onsuccess = () => {
        resolve(request.result);
        console.log(request.result)
        console.log(transaction)
        transaction.callback(request.result)
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async enqueueTransaction({storeName, mode, operation, data, callback}) {
    return new Promise((resolve, reject) => {
      let transaction = { storeName, mode, operation, data, callback };

      this.transactionQueue.push(transaction);

      if (!this.isTransactionInProgress) {
        console.log("add")
        this.processTransactionQueue();
        this.isTransactionInProgress = true
      } else {
        console.log("transactionQueue")
      }

    });
  }

  async insert(storeName, data, callback) {
    return this.enqueueTransaction({storeName, mode:'readwrite', operation:'add', data:data, callback});
  }

  async get(storeName, key, callback) {
    return this.enqueueTransaction({storeName, mode:'readwrite', operation:'get', data:key, callback});
  }

  async getAll(storeName, callback) {
    return this.enqueueTransaction({storeName, mode:'readonly', operation:'getAll', callback, data:null});
  }
}


let db = new indexedDBFIFO()


db.getAll("objectStore", (data)=> {
  console.log({data})
})

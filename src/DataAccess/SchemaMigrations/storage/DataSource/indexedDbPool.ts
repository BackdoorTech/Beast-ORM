
class indexedDBFIFO {
  dbName
  db
  transactionQueue = []
  isTransactionInProgress = false
  txInstance


  constructor(dbName: string) {
    this.dbName = dbName
  }

  async openDatabase() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {

        let request = indexedDB.open(this.dbName, 2);

        request.onsuccess = () => {
          this.db = request.result;
          this.txInstance =  this.db.transaction(["database"], "readwrite")
          resolve(this.db);
        };
        request.onupgradeneeded =  (event: any)  => {

          let db = event.target.result;

          db.createObjectStore("database", { keyPath: "MyID", autoIncrement: true });
          db.close()
          resolve(this.openDatabase());
        };

        request.onerror = (error) => {
          reject(error);
        };

      }
    });
  }

  pending = 0
  async processTransactionQueue() {

    if (this.isTransactionInProgress) {
      return;
    }

    this.db = await this.openDatabase()


    let loop = () => {
      if (this.transactionQueue.length > 0) {
        this.isTransactionInProgress = true;
        let nextTransaction = this.transactionQueue.shift();
        this.pending++
        this.executeTransaction(nextTransaction)
          .then(() => {})
          .catch((error) => {}).finally(()=> {
            this.pending--
            loop()
          })

      } else {
        this.isTransactionInProgress = false;

        if(this.db) {
          if(this.pending == 0) {

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
        transaction.callback(request.result)
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async enqueueTransaction({storeName, mode, operation, data, callback}) {
    let transaction = { storeName, mode, operation, data, callback };

    this.transactionQueue.push(transaction);

    if (!this.isTransactionInProgress) {
      this.processTransactionQueue();
    }
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


const db = new indexedDBFIFO("Migrations")
export class MigrationsModel {

  databaseName: string
  databaseVersion: number
  migrations: any[] = []

  constructor(data = {}){
    Object.assign(this, data)
  }

  DB() { return MigrationsModel.DB() }
  static DB() { return db }

  static async insert(data) {
    return new Promise((resolve)=> {
      this.DB().insert("objectStore", data, (data)=> {
        resolve(data)
      })
    })
  }


  async save() {
    return new Promise((resolve)=> {
      this.DB().insert("objectStore", this, (data)=> {
        resolve(data)
      })
    })
  }

  static async get(key) {
    return new Promise((resolve) => {
      this.DB().get("objectStore", key, (data)=> {
        resolve(data)
      })
    })
  }

  static getAll(): Promise<any[]> {
    return new Promise((resolve)=> {
      this.DB().getAll("objectStore", (data)=> {
        resolve(data)
      })
    })
  }
}

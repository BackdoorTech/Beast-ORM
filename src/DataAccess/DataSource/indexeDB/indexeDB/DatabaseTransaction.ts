import { ITableSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { Either, ok, error as err } from "../../../../Utility/Either/index.js";
import { ConstraintError, TransactionAbortion, TransactionInfo } from "../../../_interface/interface.type.js";
import { databaseManager } from "./DatabaseManager.js";
import { IAllDatabaseOperation } from "./DatabaseOperations.js";
import { IOperationResult } from "./ObjectStore.type.js";

export class DatabaseTransaction {

  private schema: ITableSchema
  operationQueue = [];
  isTransactionInProgress = false;
  db:  IDBDatabase;
  private  errorPassive: Boolean = false
  private  finishTransactionCallback: Function[] = []
  private  IDBTransaction?: IDBTransaction
  private  IDBTransactionMode?: IDBTransactionMode
  dead = false
  hasWriteTransaction = false
  dedicateTransaction: Boolean = false

  transactionInto!: Either<TransactionInfo, TransactionAbortion>


  constructor(tableSchema: ITableSchema, dedicateTransaction: Boolean, errorPassive: Boolean) {
    this.schema = tableSchema
    this.dedicateTransaction = dedicateTransaction
    this.errorPassive = errorPassive

  }

  onDone(fn:(result: Either<TransactionInfo, TransactionAbortion>) => void) {
    if(this.isTransactionInProgress) {
      this.finishTransactionCallback.push(fn)
    } else {
      this.finishTransactionCallback.push(fn)
    }

  }

  startExecution() {

    this.createTransaction()
    this.processOperationQueue();

    // if (!this.isTransactionInProgress) {
    //   this.createTransaction()
    //   this.processOperationQueue();
    // } else {

    //   // development porpuse only
    //   throw("Already running")
    // }


  }

  waitToFinish(): Promise<Either<TransactionInfo, TransactionAbortion | ConstraintError>> {
    return new Promise((resolve, reject) => {
      if(this.isTransactionInProgress == false) {
        resolve(this.transactionInto)
      } else {
        this.onDone((result) => {
          resolve(result)
        })
      }
    })
  }

  async enqueueOperation(operation: IAllDatabaseOperation): Promise<Either<IOperationResult, false>> {
    return new Promise((resolve, reject) => {

      operation.onDone((result) => {
        resolve(result)
      })

      this.operationQueue.push(operation);

    })
  }

  private  async processOperationQueue() {
    if (this.isTransactionInProgress) {
      return;
    }

    this.isTransactionInProgress = true;

    const loop = async () => {

      const nextTransaction = this.operationQueue.shift();

      if(nextTransaction) {
        try {
          await this.executeOperation(nextTransaction);
        } catch (error) {

          if(this.errorPassive) {
            this.commitTransaction()
            this.createTransaction()
          } else {
            console.log(error)
            this.abortTransaction(new ConstraintError(error))
            this.runDoneCallBack()
          }
        } finally {
          await loop()
        }
      }
    }

    await loop()


    this.finishWithSuccess()
  }

  private  finishWithSuccess() {

    this.isTransactionInProgress = false;
    this.commitTransaction()
    this.closeTransaction()
    this.clearVariables()



    if (!this.isTransactionInProgress && this.operationQueue.length >= 1) {
      this.processOperationQueue();
    } else {
      this.runDoneCallBack()
    }

    this.dead = true
  }

  private  runDoneCallBack() {
    for( const fn of this.finishTransactionCallback) {
      fn(this.transactionInto)
    }
  }

  private executeOperation(operationClass: IAllDatabaseOperation) {
    const { operation, data } = operationClass;
    const objectStore = this.IDBTransaction.objectStore(this.schema.name);

    let request: IDBRequest;

    try {
      request = objectStore[operation](data);
    } catch (error) {
      console.log(data,"retry", error)
    }

    return operationClass.execute(request)
  }

  private abortTransaction(cause: ConstraintError) {
    const transactionAbortion = new TransactionAbortion()
    transactionAbortion.cause =  cause
    this.transactionInto =  err(transactionAbortion)
    this.IDBTransaction.abort();
  }

  private commitTransaction(): TransactionInfo {

    let transactionInfo = new TransactionInfo()

    try {
      this.IDBTransaction.commit();
      transactionInfo.hasChangeDb  = true
      this.executeTrigger()
    } catch (error) {
      transactionInfo.hasChangeDb  = false
    }

    this.setTransactionInfo(transactionInfo)
    return transactionInfo
  }

  private async executeTrigger() {
    const database = databaseManager.getDb(this.schema.databaseName)
    database.runTrigger(this.schema.name, true)
  }

  private setTransactionInfo(TransactionInfo: TransactionInfo ) {
    this.transactionInto = ok(TransactionInfo)
  }

  private setTransactionErrorInfo(ConstraintError: TransactionAbortion) {
    this.transactionInto = err(ConstraintError)
  }

  private clearVariables() {
    this.hasWriteTransaction = false
  }

  writeTransactionFlag() {
    this.hasWriteTransaction = true
  }

  private createTransaction() {
    this.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
  }

  private closeTransaction() {
    delete this.IDBTransaction
  }

}

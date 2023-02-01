import { transaction } from './transaction.js'
import { data } from './data.js'

export class DatabaseMemory {
    

    private static data = data

    static transactions = []
    private static executingTransaction = false
    static transaction (currentStore, dbMode): transaction {
        return new transaction(DatabaseMemory.data[currentStore])
    }

    executeTransaction() {

    }
    
    static createTransaction(currentStore, mode, callback:  (transaction) => void) {
        DatabaseMemory.transactions.push({currentStore, mode, callback})
        if(!DatabaseMemory.executingTransaction) {

        } 
    }

    static objectStoreNames = {
        contains(name) {
            return true
        }
    }
}


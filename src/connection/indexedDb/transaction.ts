
export class transactions {

private createTransaction(
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
}
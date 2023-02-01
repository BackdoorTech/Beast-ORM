export class transactions {
    createTransaction(db, dbMode, currentStore, resolve, reject, abort) {
        let tx = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
}

export class DatabaseTransaction {
    constructor(db) {
        this.db = db;
    }
    async startTransaction(storeNames, mode) {
        const tx = this.db.transaction(storeNames, mode);
        return tx;
    }
}

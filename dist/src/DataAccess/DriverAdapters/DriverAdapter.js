import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
// Context that uses the strategy pattern
export class DriverAdapter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    addTrigger(table, data) {
        throw new Error("Method not implemented.");
    }
    RemoveTrigger(table, data) {
        throw new Error("Method not implemented.");
    }
    insertMany(table, data) {
        return this.strategy.insertMany(table, data);
    }
    deleteMany(table, data) {
        return this.strategy.deleteMany(table, data);
    }
    selectMany(table, data) {
        return this.strategy.selectMany(table, data);
    }
    updateMany(table, data) {
        return this.strategy.updateMany(table, data);
    }
    update(table, data) {
        return this.strategy.update(table, data);
    }
    delete(table, data) {
        return this.strategy.delete(table, data);
    }
    prepare(migrate) {
        return this.strategy.prepare(migrate);
    }
    migrate(migration) {
        return this.strategy.migrate(migration);
    }
    insert(table, data) {
        return this.strategy.insert(table, data);
    }
    select(table, data) {
        return this.strategy.select(table, data);
    }
}
export function AdapterFactory(databaseName) {
    return new IndexedDBStrategy(databaseName);
}

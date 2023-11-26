import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexedDB.js';
// Context that uses the strategy pattern
export class DriverAdapter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    addTrigger(data) {
        throw new Error("Method not implemented.");
    }
    RemoveTrigger(data) {
        throw new Error("Method not implemented.");
    }
    insertMany(data) {
        return this.strategy.insertMany(data);
    }
    deleteMany(data) {
        return this.strategy.deleteMany(data);
    }
    selectMany(data) {
        return this.strategy.selectMany(data);
    }
    updateMany(data) {
        return this.strategy.updateMany(data);
    }
    update(data) {
        return this.strategy.update(data);
    }
    delete(data) {
        return this.strategy.delete(data);
    }
    prepare(migrate) {
        return this.strategy.prepare(migrate);
    }
    migrate(migration) {
        return this.strategy.migrate(migration);
    }
    insert(data) {
        return this.strategy.insert(data);
    }
    select(data) {
        return this.strategy.select(data);
    }
}
let Strategy = IndexedDBStrategy;
export function setStrategy(strategy) {
    Strategy = strategy;
}
export function AdapterFactory(databaseName) {
    return new Strategy(databaseName);
}

import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
// Context that uses the strategy pattern
export class DriverAdapter {
    constructor(strategy) {
        this.strategy = strategy;
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

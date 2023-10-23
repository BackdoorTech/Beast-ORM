import { IDatabaseStrategy, IMigrations } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js'

 // Context that uses the strategy pattern
export class DriverAdapter implements IDatabaseStrategy{
  strategy: IDatabaseStrategy
  constructor(strategy) {
    this.strategy = strategy;
  }
  prepare(migrate: IMigrations) {
    return this.strategy.prepare(migrate)
  }
  migrate(migration: IMigrations) {
    return this.strategy.migrate(migration)
  }

  insert(table, data) {
    return this.strategy.insert(table, data);
  }

  select(table, data) {
    return this.strategy.select(table, data);
  }
}

export function AdapterFactory (databaseName: string) {

  return new IndexedDBStrategy(databaseName)
}

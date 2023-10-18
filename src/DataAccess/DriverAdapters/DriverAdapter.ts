import { IDatabaseStrategy, IMigrations } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js'

 // Context that uses the strategy pattern
export class DriverAdapter implements IDatabaseStrategy{
  strategy: IDatabaseStrategy
  constructor(strategy) {
    this.strategy = strategy;
  }
  async prepare(migrate: IMigrations): Promise<any> {
    await this.strategy.prepare(migrate)
  }
  async migrate(migration: IMigrations) {
    this.strategy.migrate(migration)
  }

  async insert(table, data) {
    return this.strategy.insert(table, data);
  }

  async select(table, key) {
    return this.strategy.select(table, key);
  }
}

export function AdapterFactory () {

  return new IndexedDBStrategy()
}

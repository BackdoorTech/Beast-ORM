import { IDatabaseStrategy, IMigrations, IReturnObject } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js'
import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js";

 // Context that uses the strategy pattern
export class DriverAdapter implements IDatabaseStrategy{
  strategy: IDatabaseStrategy
  constructor(strategy) {
    this.strategy = strategy;
  }
  insertMany(table: any, data: any): (returnObject: IReturnObject) => void {
    return this.strategy.insertMany(table, data)
  }
  deleteMany(table: any, data: IQuery): (returnObject: IReturnObject) => void {
    return this.strategy.deleteMany(table, data)
  }
  selectMany(table: any, data: IQuery): (returnObject: IReturnObject) => void {
    return this.strategy.selectMany(table, data)
  }
  updateMany(table: any, data: IQuery): (returnObject: IReturnObject) => void {
    return this.strategy.updateMany(table, data)
  }
  update(table: any, data: IQuery): (returnObject: IReturnObject) => void {
    return this.strategy.update(table, data)
  }
  delete(table: any, data: IQuery): (returnObject: IReturnObject) => void {
    return this.strategy.delete(table, data)
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

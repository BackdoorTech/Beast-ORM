import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
import { IDatabaseSchema } from '../../BusinessLayer/_interface/interface.type.js';

export interface IReturnObject {
  onsuccess?: Function
  onerror?: Function
  done?: Function
}

type returnFunction = (returnObject: IReturnObject) => void

export interface IDatabaseStrategy {

  migrate(migrate: IMigrations): returnFunction
  update(table,data:IQuery): returnFunction
  updateMany(table,data:IQuery): returnFunction
  insert(table,data): returnFunction
  insertMany(table,data): returnFunction
  delete(table,data:IQuery): returnFunction
  deleteMany(table,data:IQuery): returnFunction
  select(table,data:IQuery) : returnFunction
  selectMany(table,data:IQuery) : returnFunction
  prepare(migrate: IMigrations): returnFunction
}
export type IMigrations = IDatabaseSchema

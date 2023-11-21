import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
import { IDatabaseSchema } from '../../BusinessLayer/_interface/interface.type.js';

export interface IReturnObject {
  onsuccess?: Function
  onerror?: Function
  done?: Function
}


export interface IReturnSelectObject {
  onsuccess?: Function
  onerror?: Function
  notFound?: Function
  done?: Function
}

export interface IReturnTriggerObject {
  onsuccess?: Function
  stream: Function
  onerror?: Function
  done?: Function
}

type returnFunction = (returnObject: IReturnObject) => void
type returnSelectFunction = (returnObject: IReturnSelectObject) => void
type returnStreamTriggerFunction = (returnObject: IReturnTriggerObject) => void

export interface IDatabaseStrategy {

  migrate(migrate: IMigrations): returnFunction
  update(table,data:IQuery): returnFunction
  updateMany(table,data:IQuery): returnFunction
  insert(table,data): returnFunction
  insertMany(table,data): returnFunction
  delete(table,data:IQuery): returnFunction
  deleteMany(table,data:IQuery): returnFunction
  select(table,data:IQuery) : returnSelectFunction
  selectMany(table,data:IQuery) : returnFunction
  prepare(migrate: IMigrations): returnFunction

  addTrigger(table, data: any): returnStreamTriggerFunction
  RemoveTrigger(table, data: any): returnFunction
}
export type IMigrations = IDatabaseSchema

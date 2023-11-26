import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
import { IDatabaseSchema } from '../../BusinessLayer/_interface/interface.type.js';

export interface IReturnObject {
  onsuccess: Function
  onerror: Function
  done: Function
}


export interface IReturnSelectObject {
  onsuccess: Function
  onerror: Function
  notFound?: Function
  done: Function
}

export interface IReturnTriggerObject {
  onsuccess: Function
  stream: Function
  onerror: Function
  done: Function
}

type returnFunction = (returnObject: IReturnObject) => void
type returnSelectFunction = (returnObject: IReturnSelectObject) => void
type returnStreamTriggerFunction = (returnObject: IReturnTriggerObject) => void

export interface IData {
  table: string,
  query: IQuery
}

export interface ITriggerParam {
  table: string,
  data: string
}

export interface IDataInsert {
  table: string,
  rows: any[]
}
export interface IDatabaseStrategy {

  migrate(migrate: IMigrations): returnFunction
  update(data:IData): returnFunction
  updateMany(data:IData): returnFunction
  insert(data:IDataInsert): returnFunction
  insertMany(data:IDataInsert): returnFunction
  delete(data:IData): returnFunction
  deleteMany(data:IData): returnFunction
  select(data:IData) : returnSelectFunction
  selectMany(data:IData) : returnFunction
  prepare(migrate: IMigrations): returnFunction

  addTrigger(data: ITriggerParam): returnStreamTriggerFunction
  RemoveTrigger(data: ITriggerParam): returnFunction
}
export type IMigrations = IDatabaseSchema

export enum IDatabaseStrategyMethods  {
  migrate = "migrate",
  update = "update",
  updateMany = "updateMany",
  insert = "insert",
  insertMany = "insertMany",
  DeleteOperation = "DeleteOperation",
  deleteMany = "deleteMany",
  select = "select",
  selectMany = "selectMany",
  prepare = "prepare",
  addTrigger = "addTrigger",
  RemoveTrigger = "RemoveTrigger"
}

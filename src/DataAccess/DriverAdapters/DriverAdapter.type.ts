import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder"
import { IDatabaseSchema } from '../../BusinessLayer/_interface/interface';

export interface IReturnObject {
  onsuccess?: Function
  onerror?: Function
  done?: Function
}

type returnFunction = (returnObject: IReturnObject) => void

export interface IDatabaseStrategy {

  migrate(migrate: IMigrations): returnFunction
  update(table,data:IQuery): returnFunction
  insert(table,data): returnFunction
  delete(table,data:IQuery): returnFunction
  select(table,data:IQuery) : returnFunction
  prepare(migrate: IMigrations): returnFunction
}
export type IMigrations = IDatabaseSchema

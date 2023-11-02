import { ITableSchema } from "../_interface/interface.type"

export interface IReturnObject {
  onsuccess?: Function
  onerror?: Function
  done?: Function
}

type returnFunction = (returnObject: IReturnObject) => void

export interface IDatabaseStrategy {

  migrate(migrate: IMigrations): returnFunction
  insert(table,data): returnFunction
  select(table,data) : returnFunction
  prepare(migrate: IMigrations): returnFunction
}
export interface IMigrations {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: ITableSchema[]
}

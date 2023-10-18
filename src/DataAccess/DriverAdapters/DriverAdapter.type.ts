import { TableSchema } from "../../BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type.js";

export class IDatabaseStrategy {

  async migrate(migrate: IMigrations) {}
  async insert(table, data) {}
  async select(table, key) {}
  async prepare(migrate: IMigrations): Promise<any> {}
}
export interface IMigrations {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: TableSchema[]
}

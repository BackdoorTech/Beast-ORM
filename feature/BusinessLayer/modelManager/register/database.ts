import { Table } from './table'
import { DatabaseType } from './../../../Utility/globalInterface'
import { IConfig } from './database.type'
export class Database {

  config: IConfig
  type: DatabaseType = DatabaseType.IndexedDB
  tables: Table[] = []

  constructor(DatabaseSchema: IConfig) {
    this.config = DatabaseSchema

    for(const tableSchema of DatabaseSchema.table) {
      const table = new Table(tableSchema)
      this.tables.push(table)
    }
  }
}

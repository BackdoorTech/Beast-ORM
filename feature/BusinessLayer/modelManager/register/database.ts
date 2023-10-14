import { Table } from './table'
import { DatabaseType } from './../../../Utility/globalInterface'
import { IConfig } from './database.type'
export class Database {

  databaseName: string
  version: number
  type: DatabaseType = DatabaseType.IndexedDB
  tables: Table[] = []

  constructor(DatabaseSchema: IConfig) {
    this.databaseName = DatabaseSchema.databaseName
    this.version = DatabaseSchema.version

    for(const tableSchema of DatabaseSchema.table) {
      const table = new Table(tableSchema)
      this.tables.push(table)
    }
  }
}

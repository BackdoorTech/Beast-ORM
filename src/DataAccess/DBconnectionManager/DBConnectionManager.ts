import { DriverAdapter, AdapterFactory } from "../DriverAdapters/DriverAdapter.js";
import { IDatabaseSchema } from "../_interface/interface.type.js"
export class DBConnectionManager {

  driverAdapter!:DriverAdapter
  constructor(DatabaseSchema: IDatabaseSchema) {

    const strategy = AdapterFactory(DatabaseSchema.databaseName)
    this.driverAdapter = new DriverAdapter(strategy)
  }
}

import { IDatabaseSchema } from "../../BusinessLayer/_interface/interface.js";
import { DriverAdapter, AdapterFactory } from "../DriverAdapters/DriverAdapter.js";
export class DBConnectionManager {

  driverAdapter!:DriverAdapter
  constructor(DatabaseSchema: IDatabaseSchema) {

    const strategy = AdapterFactory(DatabaseSchema.databaseName)
    this.driverAdapter = new DriverAdapter(strategy)
  }
}

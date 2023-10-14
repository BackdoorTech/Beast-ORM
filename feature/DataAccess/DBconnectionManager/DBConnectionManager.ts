import { DriverAdapter, AdapterFactory } from "../DriverAdapters/DriverAdapter";

export class DBConnectionManager {

  driverAdapter!:DriverAdapter
  constructor() {

    const strategy = AdapterFactory()
    this.driverAdapter = new DriverAdapter(strategy)
  }
}

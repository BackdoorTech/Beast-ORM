import { DriverAdapter, AdapterFactory } from "../DriverAdapters/DriverAdapter.js";
export class DBConnectionManager {
    constructor() {
        const strategy = AdapterFactory();
        this.driverAdapter = new DriverAdapter(strategy);
    }
}

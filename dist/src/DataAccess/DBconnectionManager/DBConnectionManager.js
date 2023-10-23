import { DriverAdapter, AdapterFactory } from "../DriverAdapters/DriverAdapter.js";
export class DBConnectionManager {
    constructor(DatabaseSchema) {
        const strategy = AdapterFactory(DatabaseSchema.databaseName);
        this.driverAdapter = new DriverAdapter(strategy);
    }
}

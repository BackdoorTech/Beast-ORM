import { DriverAdapter } from "../DriverAdapters/DriverAdapter.js";
import { IDatabaseSchema } from "../_interface/interface.js";
export declare class DBConnectionManager {
    driverAdapter: DriverAdapter;
    constructor(DatabaseSchema: IDatabaseSchema);
}

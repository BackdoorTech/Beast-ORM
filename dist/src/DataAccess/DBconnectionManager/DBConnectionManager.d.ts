import { IDatabaseSchema } from "../../BusinessLayer/_interface/interface.js";
import { DriverAdapter } from "../DriverAdapters/DriverAdapter.js";
export declare class DBConnectionManager {
    driverAdapter: DriverAdapter;
    constructor(DatabaseSchema: IDatabaseSchema);
}

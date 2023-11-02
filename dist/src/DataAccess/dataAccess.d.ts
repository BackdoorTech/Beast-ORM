import { IDatabaseSchema } from "./_interface/interface.type.js";
import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager.js";
export declare class DataAccess {
    createDBconnectionManager(args: IDatabaseSchema): DBConnectionManager;
}
export declare const dataAccess: DataAccess;

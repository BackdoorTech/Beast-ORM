import { IDatabaseSchema } from "../BusinessLayer/_interface/interface.js";
import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager.js";
export declare class DataAccess {
    createDBconnectionManager(args: IDatabaseSchema): DBConnectionManager;
}
export declare const dataAccess: DataAccess;

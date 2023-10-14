import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager.js";
export class DataAccess {
    createDBconnectionManager(args) {
        return new DBConnectionManager();
    }
}
export const dataAccess = new DataAccess();

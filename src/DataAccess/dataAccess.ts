import { IDatabaseSchema } from "./_interface/interface.js";
import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager.js";

export class DataAccess {
  createDBconnectionManager(args: IDatabaseSchema) {
    return new DBConnectionManager(args)
  }
}

export const dataAccess = new DataAccess()

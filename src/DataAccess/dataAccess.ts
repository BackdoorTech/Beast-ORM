import { IDatabaseSchema } from "../BusinessLayer/_interface/interface.type.js";
import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager.js";

export class DataAccess {
  createDBconnectionManager(args: IDatabaseSchema) {
    return new DBConnectionManager(args)
  }
}

export const dataAccess = new DataAccess()

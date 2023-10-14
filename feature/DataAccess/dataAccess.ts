import { DBConnectionManager } from "./DBconnectionManager/DBConnectionManager";

export class DataAccess {
  createDBconnectionManager(args) {
    return new DBConnectionManager(args)
  }
}

export const dataAccess = new DataAccess()

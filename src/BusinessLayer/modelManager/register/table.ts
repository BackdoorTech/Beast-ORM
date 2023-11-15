import { ITableSchema } from "../../_interface/interface.type"


export class Table {
  config: ITableSchema

  constructor(Config: ITableSchema) {
    this.config = Config
  }
}

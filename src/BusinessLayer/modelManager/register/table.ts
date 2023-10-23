import { ITableSchema } from "../../_interface/interface"


export class Table {
  config: ITableSchema

  constructor(Config: ITableSchema) {
    this.config = Config
  }
}

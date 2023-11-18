import { Model } from "../../../Presentation/Api"
import { ITableSchema } from "../../_interface/interface.type"


export class Table {
  config: ITableSchema
  model: typeof Model<any>

  constructor(Config: ITableSchema, _Model: typeof Model<any>) {
    this.config = Config
    this.model = _Model
  }
}

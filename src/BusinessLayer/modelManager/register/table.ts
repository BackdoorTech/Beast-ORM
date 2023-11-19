import { Model } from "../../../Presentation/Api.js"
import { DBEventsTrigger, ITableSchema } from "../../_interface/interface.type.js"
import { TriggerManager } from "../../trigger/trigger.js"

export class Table {
  config: ITableSchema
  model: typeof Model<any>
  trigger = new TriggerManager()

  constructor(Config: ITableSchema, _Model: typeof Model<any>) {
    this.config = Config
    this.model = _Model
  }


  registerTriggerOnCommit() {
    this.trigger.registerTrigger(DBEventsTrigger.onCompleteReadTransaction)
  }
}

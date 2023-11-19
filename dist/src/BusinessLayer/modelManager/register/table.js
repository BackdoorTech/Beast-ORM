import { DBEventsTrigger } from "../../_interface/interface.type.js";
import { TriggerManager } from "../../trigger/trigger.js";
export class Table {
    constructor(Config, _Model) {
        this.trigger = new TriggerManager();
        this.config = Config;
        this.model = _Model;
    }
    registerTriggerOnCommit() {
        this.trigger.registerTrigger(DBEventsTrigger.onCompleteReadTransaction);
    }
}

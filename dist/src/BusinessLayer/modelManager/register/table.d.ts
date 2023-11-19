import { Model } from "../../../Presentation/Api.js";
import { ITableSchema } from "../../_interface/interface.type.js";
import { TriggerManager } from "../../trigger/trigger.js";
export declare class Table {
    config: ITableSchema;
    model: typeof Model<any>;
    trigger: TriggerManager;
    constructor(Config: ITableSchema, _Model: typeof Model<any>);
    registerTriggerOnCommit(): void;
}

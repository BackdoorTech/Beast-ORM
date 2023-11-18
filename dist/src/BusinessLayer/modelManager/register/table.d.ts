import { Model } from "../../../Presentation/Api";
import { ITableSchema } from "../../_interface/interface.type";
export declare class Table {
    config: ITableSchema;
    model: typeof Model<any>;
    constructor(Config: ITableSchema, _Model: typeof Model<any>);
}

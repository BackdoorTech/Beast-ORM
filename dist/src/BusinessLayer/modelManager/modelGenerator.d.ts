import { Model } from "../../Presentation/Api.js";
import { IDatabaseSchema } from "../_interface/interface.type";
import { IRegister } from "../beastOrm.type.js";
declare class ModelGeneration {
    forMiddleTables(schema: IDatabaseSchema, register: IRegister): typeof Model<any>[];
    private generateGenericModel;
}
export declare const modelGeneration: ModelGeneration;
export {};

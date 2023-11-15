import { Model } from "../../Presentation/Api.js";
import { IDatabaseSchema } from "../_interface/interface.type";
declare class ModelGeneration {
    forMiddleTables(schema: IDatabaseSchema): typeof Model<any>[];
    private generateGenericModel;
}
export declare const modelGeneration: ModelGeneration;
export {};

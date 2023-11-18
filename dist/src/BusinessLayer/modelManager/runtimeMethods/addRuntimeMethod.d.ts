import { Model } from "../../../Presentation/Api.js";
import { IDatabaseSchema, IMethodWithModels } from "../../_interface/interface.type.js";
import { IRegister } from "../../beastOrm.type.js";
export declare class AddRunTimeMethod {
    addModelSchema(register: IRegister): void;
    /**
     * Attaches generated table schema to model classes.
     * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
     * @param {Object} entries - An object containing model classes.
     */
    addGeneratedTableSchemaToModel(databaseSchema: IDatabaseSchema, entries: IRegister): void;
    attachRelationShipMethods(methodWithModels: IMethodWithModels[]): void;
    addStaticFunctionFWrap(_Model: typeof Model<any>, methodName: string, value: object): void;
    addFunctionFWrap(_Model: typeof Model<any>, methodName: string, value: object): void;
    addStaticFunction(_Model: typeof Model<any>, methodName: string, func: Function): void;
}
export declare const addRunTimeMethod: AddRunTimeMethod;

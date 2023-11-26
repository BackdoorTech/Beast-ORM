import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../fields/fields.type";
import { PossibleFieldAttributes } from "../fields/fieldsParameters.type";
import { APIResponse } from "../../Utility/Either/APIresponse.js";
import { FormValidationError } from "../validation/fields/allFields.type";
import { BulkDataUniqueFieldError, ItemNotFound } from "../queryBuilderHandler/queryErrorHandler";
import { TransactionAbortion } from "../../DataAccess/_interface/interface.type";
export interface IFieldSchema {
    name: string;
    keyPath: string;
    className?: FieldKeys;
    fieldAttributes?: PossibleFieldAttributes;
    blank: boolean;
    options?: {
        unique?: boolean;
        type: FieldType;
    };
}
export interface ITableSchema {
    databaseName: string;
    name: string;
    id: {
        keyPath: string;
        autoIncrement?: boolean;
        type: FieldType;
    };
    fields: IFieldSchema[];
    attributes: AttributesMap<FieldAttributesKeys, string[]>;
    fieldTypes: FieldsMap<FieldKeys, string[]>;
    foreignKey: {
        [fieldName: string]: {
            tableName: string;
        };
    };
    middleTablePK: {
        [fieldName: string]: {
            tableName: string;
        };
    };
    middleTableRelatedFields: {
        [middleTableName: string]: {
            fieldName: string;
        };
    };
    middle?: boolean;
    fieldNames: string[];
    falseField: string[];
}
export interface IDatabaseSchema {
    databaseName: string;
    type: 'indexedDB' | 'localStorage';
    version: number;
    webWorker?: boolean;
    table: ITableSchema[];
    middleTables: ITableSchema[];
}
export interface IMethodWithModels {
    Model: typeof Model<any>;
    func: {
        name: string;
        function: Function;
    }[];
}
export declare enum DBEventsTrigger {
    onCompleteReadTransaction = "onCompleteReadTransaction",
    onCompleteWrite = "onCompleteWrite"
}
declare class Model<I> {
    get(): Promise<APIResponse<I, FormValidationError | ItemNotFound>>;
    all(): Promise<APIResponse<I[], FormValidationError>>;
    deleteAll(): Promise<APIResponse<number, FormValidationError>>;
    create(): Promise<APIResponse<I, FormValidationError | TransactionAbortion>>;
    getOrCreate(): Promise<APIResponse<{
        created: I;
        found: I;
    }, FormValidationError | BulkDataUniqueFieldError | TransactionAbortion>>;
    updateOrCreate(): Promise<APIResponse<{
        updated: I;
        created: I;
    }, FormValidationError | BulkDataUniqueFieldError | TransactionAbortion>>;
    filter<I>(): {
        execute: () => Promise<APIResponse<I[], FormValidationError>>;
        update: (params: any) => Promise<APIResponse<number, FormValidationError>>;
        delete: () => Promise<APIResponse<number, FormValidationError>>;
    };
}
export type ICallBackReactiveList<I> = (model: Model<I>) => Promise<APIResponse<I[], any>>;
export {};

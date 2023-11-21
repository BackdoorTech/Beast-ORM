import { Model } from "../../../Presentation/Api.js";
import { ITableSchema } from "../../_interface/interface.type.js";
export declare class MiddleTable {
    addMiddleTable(foreignKeyFieldName: string, foreignKeyTableName: any, ArgCurrentModelName: string, databaseName: string): ITableSchema;
    generateGenericModel({ ModelName, middleTableSchema }: {
        ModelName: any;
        middleTableSchema: any;
    }): {
        new (): {
            getModel(): typeof Model;
            save(params: any): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            getPrimaryKeyValue(): string | number;
            setPrimaryKey(key: string | number): void;
            delete(): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            get(): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<any, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        getTableSchema(): ITableSchema;
        getModel(): typeof Model;
        getModelSchema(): any;
        get<T>(value: Object): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<T, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        all<T_1>(): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<T_1[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
        deleteAll(): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        create<T_2>(params: any): Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<T_2, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        filter<T_3>(value: Object): {
            execute: () => Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<T_3[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            update: (params: any) => Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            delete: () => Promise<import("../../../Utility/Either/APIResponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        magic(): Model<unknown>;
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList(callback: import("../../_interface/interface.type.js").ICallBackReactiveList): {
            readonly value: any;
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
    };
}
export declare const middleTable: MiddleTable;

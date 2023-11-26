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
            save(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            getPrimaryKeyValue(): string | number;
            setPrimaryKey(key: string | number): void;
            delete(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            get(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<any, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        getTableSchema(): ITableSchema;
        getModel(): typeof Model<any>;
        getModelSchema(): typeof Model<any>;
        get<T>(value: Object): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
        all<T_1>(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_1[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
        deleteAll(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        create<T_2>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_2, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
        filter<T_3>(value: Object): {
            execute: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_3[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            update: (params: any) => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            delete: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
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
        getOrCreate<T_4>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
            created: T_4;
            found: T_4;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        updateOrCreate<T_5>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
            updated: T_5;
            created: T_5;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
    };
}
export declare const middleTable: MiddleTable;

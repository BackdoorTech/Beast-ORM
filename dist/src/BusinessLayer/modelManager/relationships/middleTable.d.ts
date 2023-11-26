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
            get<Model_1>(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<Model_1, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        getTableSchema(): ITableSchema;
        getModel(): typeof Model<any>;
        getModelSchema<T>(): {
            new (): Model<T>;
            getTableSchema(): ITableSchema;
            getModel(): typeof Model<any>;
            getModelSchema<T>(): any;
            get<T_1>(value: Object): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_1, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
            all<T_2>(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_2[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            deleteAll(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            create<T_3>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_3, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
            filter<T_4>(value: Object): {
                execute: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_4[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
                update: (params: any) => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
                delete: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            };
            transactionOnCommit(fn: Function): {
                dispatchUID: string;
                disconnect: () => void;
            };
            ReactiveList<I>(callback: import("../../_interface/interface.type.js").ICallBackReactiveList<I>): {
                readonly value: I[];
                readonly subscribe: {
                    dispatchUID: string;
                    disconnect: () => void;
                };
                unsubscribe: () => Promise<void>;
                setUpdateUi(func: any): void;
            };
            getOrCreate<T_5>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
                created: T_5;
                found: T_5;
            }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
            updateOrCreate<T_6>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
                updated: T_6;
                created: T_6;
            }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        };
        get<T_1>(value: Object): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_1, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
        all<T_2>(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_2[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
        deleteAll(): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        create<T_3>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_3, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
        filter<T_4>(value: Object): {
            execute: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<T_4[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            update: (params: any) => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            delete: () => Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList<I>(callback: import("../../_interface/interface.type.js").ICallBackReactiveList<I>): {
            readonly value: I[];
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
        getOrCreate<T_5>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
            created: T_5;
            found: T_5;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        updateOrCreate<T_6>(params: any): Promise<import("../../../Utility/Either/APIresponse.js").APIResponse<{
            updated: T_6;
            created: T_6;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
    };
}
export declare const middleTable: MiddleTable;

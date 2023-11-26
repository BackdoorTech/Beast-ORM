import { Model } from "../../../Presentation/Api.js";
import { APIResponse } from "../../../Utility/Either/APIresponse.js";
import { IDatabaseSchema, IMethodWithModels } from "../../_interface/interface.type";
import { IRegister } from "../../beastOrm.type.js";
export declare class RelationShip {
    getMiddleTable(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): {
        new (): Model<any>;
        getTableSchema(): import("../../_interface/interface.type").ITableSchema;
        getModel(): typeof Model<any>;
        getModelSchema<T>(): {
            new (): Model<T>;
            getTableSchema(): import("../../_interface/interface.type").ITableSchema;
            getModel(): typeof Model<any>;
            getModelSchema<T>(): any;
            get<T_1>(value: Object): Promise<APIResponse<T_1, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
            all<T_2>(): Promise<APIResponse<T_2[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            deleteAll(): Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            create<T_3>(params: any): Promise<APIResponse<T_3, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
            filter<T_4>(value: Object): {
                execute: () => Promise<APIResponse<T_4[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
                update: (params: any) => Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
                delete: () => Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            };
            transactionOnCommit(fn: Function): {
                dispatchUID: string;
                disconnect: () => void;
            };
            ReactiveList<I>(callback: import("../../_interface/interface.type").ICallBackReactiveList<I>): {
                readonly value: I[];
                readonly subscribe: {
                    dispatchUID: string;
                    disconnect: () => void;
                };
                unsubscribe: () => Promise<void>;
                setUpdateUi(func: any): void;
            };
            getOrCreate<T_5>(params: any): Promise<APIResponse<{
                created: T_5;
                found: T_5;
            }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
            updateOrCreate<T_6>(params: any): Promise<APIResponse<{
                updated: T_6;
                created: T_6;
            }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        };
        get<T_1>(value: Object): Promise<APIResponse<T_1, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
        all<T_2>(): Promise<APIResponse<T_2[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
        deleteAll(): Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        create<T_3>(params: any): Promise<APIResponse<T_3, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
        filter<T_4>(value: Object): {
            execute: () => Promise<APIResponse<T_4[], import("../../validation/fields/allFields.type.js").FormValidationError>>;
            update: (params: any) => Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
            delete: () => Promise<APIResponse<number, import("../../validation/fields/allFields.type.js").FormValidationError>>;
        };
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList<I>(callback: import("../../_interface/interface.type").ICallBackReactiveList<I>): {
            readonly value: I[];
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
        getOrCreate<T_5>(params: any): Promise<APIResponse<{
            created: T_5;
            found: T_5;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        updateOrCreate<T_6>(params: any): Promise<APIResponse<{
            updated: T_6;
            created: T_6;
        }, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
    };
    getMiddleTableName(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): string;
    addToMiddleTable<T>(currentModel: Model<any>, otherModel: typeof Model<any>, toAdd: Model<any>, middleTableModel: typeof Model<any>): Promise<APIResponse<T, import("../../validation/fields/allFields.type.js").FormValidationError | import("../../../DataAccess/_interface/interface.type.js").TransactionAbortion>>;
    getAll<T>(currentModel: Model<any>, otherModel: typeof Model<any>, middleTableModel: typeof Model<any>): Promise<APIResponse<T[], any>>;
    generateRelationShipMethods(databaseSchema: IDatabaseSchema, entries: IRegister, _MiddleModels: typeof Model<any>[]): IMethodWithModels[];
}
export declare const relationShip: RelationShip;

import { Model } from "../../../Presentation/Api";
import { IDatabaseSchema, IMethodWithModels } from "../../_interface/interface.type";
import { IRegister } from "../../beastOrm.type.js";
import { APIResponse } from '../../../Utility/Either/APIResponse.js';
export declare class RelationShip {
    getMiddleTable(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): {
        new (): Model<any>;
        getTableSchema(): import("../../_interface/interface.type").ITableSchema;
        getModel(): typeof Model<any>;
        getModelSchema(): typeof Model<any>;
        get<T>(value: Object): Promise<APIResponse<T, import("../../validation/fields/allFields.type").FormValidationError | import("../../queryBuilderHandler/queryErrorHandler").ItemNotFound>>;
        all<T_1>(): Promise<APIResponse<T_1[], import("../../validation/fields/allFields.type").FormValidationError>>;
        deleteAll(): Promise<APIResponse<number, import("../../validation/fields/allFields.type").FormValidationError>>;
        create<T_2>(params: any): Promise<APIResponse<T_2, import("../../validation/fields/allFields.type").FormValidationError | import("../../../DataAccess/_interface/interface.type").TransactionAbortion>>;
        filter<T_3>(value: Object): {
            execute: () => Promise<APIResponse<T_3[], import("../../validation/fields/allFields.type").FormValidationError>>;
            update: (params: any) => Promise<APIResponse<number, import("../../validation/fields/allFields.type").FormValidationError>>;
            delete: () => Promise<APIResponse<number, import("../../validation/fields/allFields.type").FormValidationError>>;
        };
        magic(): Model<unknown>;
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList(callback: import("../../_interface/interface.type").ICallBackReactiveList): {
            readonly value: any;
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
        getOrCreate<T_4>(params: any): Promise<APIResponse<{
            created: T_4;
            found: T_4;
        }, import("../../validation/fields/allFields.type").FormValidationError | import("../../../DataAccess/_interface/interface.type").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler").BulkDataUniqueFieldError>>;
        updateOrCreate<T_5>(params: any): Promise<APIResponse<{
            updated: T_5;
            created: T_5;
        }, import("../../validation/fields/allFields.type").FormValidationError | import("../../../DataAccess/_interface/interface.type").TransactionAbortion | import("../../queryBuilderHandler/queryErrorHandler").BulkDataUniqueFieldError>>;
    };
    getMiddleTableName(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): string;
    addToMiddleTable<T>(currentModel: Model<any>, otherModel: typeof Model<any>, toAdd: Model<any>, middleTableModel: typeof Model<any>): Promise<APIResponse<T, import("../../validation/fields/allFields.type").FormValidationError | import("../../../DataAccess/_interface/interface.type").TransactionAbortion>>;
    getAll<T>(currentModel: Model<any>, otherModel: typeof Model<any>, middleTableModel: typeof Model<any>): Promise<APIResponse<T[], any>>;
    generateRelationShipMethods(databaseSchema: IDatabaseSchema, entries: IRegister, _MiddleModels: typeof Model<any>[]): IMethodWithModels[];
}
export declare const relationShip: RelationShip;

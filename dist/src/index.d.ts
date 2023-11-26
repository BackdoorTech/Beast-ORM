import { Model, KeyValueModel } from './Presentation/Api.js';
export { $B } from './Presentation/Api.js';
export declare const models: {
    ForeignKeyGetter<T>(data: {
        model: new () => T;
        I: Model<any>;
    }): import("./BusinessLayer/fields/fieldsParameters.type.js").ForeignKeyGetterParams<T>;
    ManyToManyGetter<T_1>(data: {
        model: new () => T_1;
        I: Model<any>;
    }): import("./BusinessLayer/fields/fieldsParameters.type.js").ManyToManyGetterParams<T_1>;
    GustPrototype(): void;
    RealPrototype(): void;
    CharField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").CharFieldParams): string;
    BooleanField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").BooleanFieldParams): boolean;
    TextField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").TextFieldParams): string;
    IntegerField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IntegerFieldParams): number;
    DateField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").DateFieldParams): Date;
    DateTimeField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").DateTimeFieldParams): string;
    BigIntegerField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").BigIntegerFieldParams): number;
    AutoField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").AutoFieldParams): any;
    OneToOneField<T_2>(data: import("./BusinessLayer/fields/fieldsParameters.type.js").OneToOneFieldParams<T_2>): import("./BusinessLayer/fields/fieldsParameters.type.js").OneToOneFieldResult<T_2>;
    ForeignKey<T_3>(data: {
        model: new () => T_3;
        unique?: boolean;
        blank?: boolean;
        default?: any;
        onDelete?: any;
        primaryKey?: boolean;
    }): import("./BusinessLayer/fields/fieldsParameters.type.js").ForeignKeyParamsResult<T_3>;
    ManyToManyField<T_4>(data?: {
        model: new () => T_4;
        I: Model<any>;
        unique?: boolean;
        blank?: boolean;
        default?: any;
        onDelete?: any;
    }): import("./BusinessLayer/fields/fieldsParameters.type.js").ManyToManyFieldParamsResult<T_4>;
    _RealPrototype: {
        CharField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").CharFieldParams): string;
        BooleanField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").BooleanFieldParams): boolean;
        TextField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").TextFieldParams): string;
        IntegerField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IntegerFieldParams): number;
        DateField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").DateFieldParams): Date;
        DateTimeField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").DateTimeFieldParams): string;
        BigIntegerField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").BigIntegerFieldParams): number;
        AutoField(data?: import("./BusinessLayer/fields/fieldsParameters.type.js").AutoFieldParams): any;
        indexedDB: {
            fields: {
                JsonField: (data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IndexedDBJsonFieldParams) => Object;
                ArrayField: (data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IndexedDBArrayFieldParams) => any[];
            };
        };
        OneToOneField: <T_5>(data: import("./BusinessLayer/fields/fieldsParameters.type.js").OneToOneFieldParams<T_5>) => any;
        ForeignKey: (data: import("./BusinessLayer/fields/fieldsParameters.type.js").ForeignKeyParams) => any;
        ManyToManyField: (data: import("./BusinessLayer/fields/fieldsParameters.type.js").ManyToManyFieldParams) => any;
    };
    indexedDB: {
        fields: {
            JsonField: (data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IndexedDBJsonFieldParams) => Object;
            ArrayField: (data?: import("./BusinessLayer/fields/fieldsParameters.type.js").IndexedDBArrayFieldParams) => any[];
        };
    };
    getter: {
        ForeignKeyGetter<T>(data: {
            model: new () => T;
            I: Model<any>;
        }): import("./BusinessLayer/fields/fieldsParameters.type.js").ForeignKeyGetterParams<T>;
        ManyToManyGetter<T_1>(data: {
            model: new () => T_1;
            I: Model<any>;
        }): import("./BusinessLayer/fields/fieldsParameters.type.js").ManyToManyGetterParams<T_1>;
    };
    $B: <I, S>(model: S) => {
        get(value: Object): Promise<import("./Utility/Either/APIresponse.js").APIResponse<I, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError | import("./BusinessLayer/queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
        all(): Promise<import("./Utility/Either/APIresponse.js").APIResponse<I[], import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
        deleteAll(): Promise<import("./Utility/Either/APIresponse.js").APIResponse<number, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
        create(params: any): Promise<import("./Utility/Either/APIresponse.js").APIResponse<I, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError | import("./DataAccess/_interface/interface.type.js").TransactionAbortion>>;
        filter(value: Object): {
            execute: () => Promise<import("./Utility/Either/APIresponse.js").APIResponse<I[], import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
            update: (params: any) => Promise<import("./Utility/Either/APIresponse.js").APIResponse<number, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
            delete: () => Promise<import("./Utility/Either/APIresponse.js").APIResponse<number, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
        };
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList(callback: import("./BusinessLayer/_interface/interface.type.js").ICallBackReactiveList<I>): {
            readonly value: I[];
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
        getOrCreate(params: any): Promise<import("./Utility/Either/APIresponse.js").APIResponse<{
            created: I;
            found: I;
        }, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError | import("./DataAccess/_interface/interface.type.js").TransactionAbortion | import("./BusinessLayer/queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
        updateOrCreate(params: any): Promise<import("./Utility/Either/APIresponse.js").APIResponse<{
            updated: I;
            created: I;
        }, import("./BusinessLayer/validation/fields/allFields.type.js").FormValidationError | import("./DataAccess/_interface/interface.type.js").TransactionAbortion | import("./BusinessLayer/queryBuilderHandler/queryErrorHandler.js").BulkDataUniqueFieldError>>;
    };
    Model: typeof Model;
    KeyValueModel: typeof KeyValueModel;
    register: (register: import("./BusinessLayer/beastOrm.type.js").IRegister) => void;
    registerKeyValueStore: (register: import("./BusinessLayer/beastOrm.type.js").IRegisterKeyValueStore) => void;
};

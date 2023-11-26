import { Model } from './Presentation/Api.js';
import './Configuration/IndexedDbWorker.js';
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
    Model: typeof Model;
    register: (register: import("./BusinessLayer/beastOrm.type.js").IRegister) => void;
};

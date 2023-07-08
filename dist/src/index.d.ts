import { Model } from './models/model.js';
import { LocalStorage } from './models/model.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel, migrate } from './models/register-model.js';
export declare const models: {
    Value(arg: any): {};
    core: {
        signals: {
            postSave: {
                connect(callback: any, models: (typeof LocalStorage)[]): void;
            };
            rewriteGet: {
                connect(callback: Function, models: (typeof LocalStorage)[]): void;
            };
        };
    };
    CharField(data?: import("./models/field/interface.js").CharFieldParams): string;
    BooleanField(data?: import("./models/field/interface.js").BooleanFieldParams): boolean;
    TextField(data?: import("./models/field/interface.js").TextFieldParams): string;
    IntegerField(data?: import("./models/field/interface.js").IntegerFieldParams): number;
    DateField(data?: import("./models/field/interface.js").DateFieldParams): Date;
    DateTimeField(data?: import("./models/field/interface.js").DateTimeFieldParams): string;
    BigIntegerField(data?: import("./models/field/interface.js").BigIntegerFieldParams): number;
    AutoField(data?: import("./models/field/interface.js").AutoFieldParams): any;
    OneToOneField(data: import("./models/field/interface.js").OneToOneFieldParams): string | number;
    ForeignKey(data: import("./models/field/interface.js").ForeignKeyParams): string | number;
    ManyToManyField(data?: import("./models/field/interface.js").ManyToManyFieldParams): string | number;
    indexedDB: {
        fields: {
            JsonField: (data?: import("./models/field/interface.js").IndexedDBJsonFieldParams) => Object;
            ArrayField: (data?: import("./models/field/interface.js").IndexedDBArrayFieldParams) => any[];
        };
    };
    Model: typeof Model;
    LocalStorage: typeof LocalStorage;
    read: typeof ModelReader.read;
    migrate: typeof migrate;
    register: typeof registerModel.register;
};
export default models;

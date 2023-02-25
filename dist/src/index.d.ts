import { Model } from './models/model.js';
import { LocalStorage } from './models/model.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel, migrate } from './models/register-model.js';
export declare const models: {
    Value(arg: any): {};
    CharField(data?: import("./models/field/interface.js").CharFieldParams): any;
    BooleanField(data?: import("./models/field/interface.js").BooleanFieldParams): any;
    TextField(data?: import("./models/field/interface.js").TextFieldParams): any;
    IntegerField(data?: import("./models/field/interface.js").IntegerFieldParams): any;
    DateField(data?: import("./models/field/interface.js").DateFieldParams): any;
    DateTimeField(data?: import("./models/field/interface.js").DateTimeFieldParams): any;
    BigIntegerField(data?: import("./models/field/interface.js").BigIntegerFieldParams): any;
    AutoField(data?: import("./models/field/interface.js").AutoFieldParams): any;
    OneToOneField(data: import("./models/field/interface.js").OneToOneFieldParams): any;
    ForeignKey(data: import("./models/field/interface.js").ForeignKeyParams): any;
    ManyToManyField(data?: import("./models/field/interface.js").ManyToManyFieldParams): any;
    indexedDB: {
        fields: {
            JsonField: (data?: import("./models/field/interface.js").IndexedDBJsonFieldParams) => any;
            ArrayField: (data?: import("./models/field/interface.js").IndexedDBArrayFieldParams) => any;
        };
    };
    Model: typeof Model;
    LocalStorage: typeof LocalStorage;
    read: typeof ModelReader.read;
    migrate: typeof migrate;
    register: typeof registerModel.register;
};

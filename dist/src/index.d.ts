import { Model } from './models/model.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel } from './models/register-model.js';
export declare const models: {
    CharField(data?: import("./models/field/interface.js").CharFieldParams): import("./models/field/allFields.js").CharField;
    BooleanField(data?: import("./models/field/interface.js").BooleanFieldParams): import("./models/field/allFields.js").BooleanField;
    TextField(data?: import("./models/field/interface.js").TextFieldParams): import("./models/field/allFields.js").TextField;
    IntegerField(data?: import("./models/field/interface.js").IntegerFieldParams): import("./models/field/allFields.js").IntegerField;
    DateField(data?: import("./models/field/interface.js").DateFieldParams): import("./models/field/allFields.js").DateField;
    BigIntegerField(data?: import("./models/field/interface.js").BigIntegerFieldParams): import("./models/field/allFields.js").BigIntegerField;
    AutoField(data?: import("./models/field/interface.js").AutoFieldParams): import("./models/field/allFields.js").AutoField;
    indexedDB: {
        fields: {
            JsonField: (data?: import("./models/field/interface.js").IndexedDBJsonFieldParams) => import("./models/field/allFields.js").indexedDBJsonField;
            ArrayField: (data?: import("./models/field/interface.js").IndexedDBArrayFieldParams) => import("./models/field/allFields.js").indexedDBArrayField;
        };
    };
    Model: typeof Model;
    read: typeof ModelReader.read;
    register: typeof registerModel.register;
    migrate: typeof registerModel.register;
};

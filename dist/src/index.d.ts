import { Model } from './models/model.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel } from './models/register-model.js';
export declare const models: {
    CharField(data?: import("./models/field/interface.js").CharFieldParams): import("./models/field/char-field.js").CharField;
    JsonField(): import("./models/field/json-field.js").JsonField;
    BooleanField(): import("./models/field/boolean-field.js").BooleanField;
    TextField(data?: import("./models/field/interface.js").TextFieldParams): import("./models/field/text-field.js").TextField;
    IntegerField(data?: import("./models/field/interface.js").IntegerFieldParams): import("./models/field/integer-field.js").IntegerField;
    DateField(): import("./models/field/date-field.js").DateField;
    BigIntegerField(): import("./models/field/big-integer-field.js").BigIntegerField;
    AutoField(data: import("./models/field/interface.js").AutoFieldParams): import("./models/field/auto-field.js").AutoField;
    indexedDB: {
        fields: {
            JsonField: () => import("./models/field/indexedDB-json-field.js").indexedDBJsonField;
            ArrayField: ({ type }: {
                type?: any;
            }) => import("./models/field/indexedDB-array-field.js").indexedDBArrayField;
        };
    };
    Model: typeof Model;
    read: typeof ModelReader.read;
    register: typeof registerModel.register;
    migrate: typeof registerModel.register;
};

import { Model } from './models/model.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel } from './models/register-model.js';
export declare const models: {
    CharField(data?: {
        maxLength?: number;
        minLength?: number;
    }): import("./models/field/char-field.js").CharField;
    JsonField(): import("./models/field/json-field.js").JsonField;
    Model: typeof Model;
    read: typeof ModelReader.read;
    register: typeof registerModel.register;
};

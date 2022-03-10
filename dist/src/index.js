import { Model } from './models/model.js';
import * as Fields from './models/field/fields.js';
import { ModelReader } from './models/model.reader.js';
import { registerModel } from './models/register-model.js';
export const models = Object.assign({ Model, read: ModelReader.read, register: registerModel.register }, Fields);

import { Model } from './models/model.js';
import * as Fields from './models/field/fields.js';
import { ModelReader } from './models/model.reader.js';
export const models = Object.assign({ Model, read: ModelReader.read }, Fields);

import { fields } from './Presentation/Model/definitions.js';
import { ORM } from './BusinessLayer/beastOrm.js';
import { getter } from './Presentation/Model/fields/fieldsWrappers.js';
import { Model } from './Presentation/Api.js';
import './Configuration/IndexedDbWorker.js';
export const models = Object.assign(Object.assign({ Model: Model, register: ORM.register }, fields), getter);
window["models"] = models;

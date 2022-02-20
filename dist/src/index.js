import { Model } from './models/model.js';
import * as Fields from './models/field/fields.js';
import prettyJs from 'pretty-js';
export { Model, Fields, prettyJs };
window['Model'] = Model;
window['Fields'] = Fields;
window['prettyJs'] = prettyJs;

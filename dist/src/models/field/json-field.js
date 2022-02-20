import { variablesType } from './variables-type.js';
export class JsonField extends variablesType {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}

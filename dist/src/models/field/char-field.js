import { variablesType } from './variables-type.js';
export class CharField extends variablesType {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}

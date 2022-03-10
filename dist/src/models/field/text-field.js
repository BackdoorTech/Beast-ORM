import { field } from './field.js';
export class TextField extends field {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}

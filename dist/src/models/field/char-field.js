import { field } from './field.js';
export class CharField extends field {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}

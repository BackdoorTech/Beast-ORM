import { FieldType } from "../../sql/query/interface.js";
import { field } from "./field.js";
export class indexedDBJsonField extends field {
    constructor() {
        super();
        this.type = FieldType.JSON;
    }
}

import { FieldType } from "../../sql/query/interface.js";
import { field } from "./field.js";
export class indexedDBArrayField extends field {
    constructor({ type = null, size = null }) {
        super();
        this.type = FieldType.ARRAY;
    }
}

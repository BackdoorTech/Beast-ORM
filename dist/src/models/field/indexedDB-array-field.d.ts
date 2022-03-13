import { FieldType } from "../../sql/query/interface.js";
import { field } from "./field.js";
export declare class indexedDBArrayField extends field {
    type: FieldType;
    constructor({ type, size }: {
        type?: any;
        size?: any;
    });
}

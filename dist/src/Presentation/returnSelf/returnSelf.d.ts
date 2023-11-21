import { Model } from "../Api";
import { APIResponse } from "../../Utility/Either/APIResponse.js";
import { FormValidationError } from "../../BusinessLayer/validation/fields/allFields.type.js";
/**
 * @description Represents a return object for query-related methods
 */
export declare class returnSelf {
    /**
     * Static method for creating a database object for advanced queries.
     * @param param0 - An object with query-related configuration.
     * @returns An object with query-related methods.
     */
    static object: <T>(queryBuilder: any, model: typeof Model) => {
        execute: () => Promise<APIResponse<T[], FormValidationError>>;
        update: (params: any) => Promise<APIResponse<number, FormValidationError>>;
        delete: () => Promise<APIResponse<number, FormValidationError>>;
    };
}

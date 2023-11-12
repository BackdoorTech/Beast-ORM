import { Model } from "../Api";
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
        execute: () => Promise<T>;
        update: (params: any) => Promise<number | true>;
        delete: () => Promise<number | true>;
    };
}

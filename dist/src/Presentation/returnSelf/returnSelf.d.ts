/**
 * @description Represents a return object for query-related methods
 */
export declare class returnSelf {
    /**
     * Static method for creating a database object for advanced queries.
     * @param param0 - An object with query-related configuration.
     * @returns An object with query-related methods.
     */
    static object: ({ queryBuilder, DBconfig, TableSchema }: {
        queryBuilder: any;
        DBconfig: any;
        TableSchema: any;
    }) => {
        filter: (...args: any[]) => void;
        execute: () => Promise<void>;
        update: (args: any) => Promise<void>;
        delete: () => Promise<void>;
        all: () => Promise<void>;
    };
}

var _a;
/**
 * @description Represents a return object for query-related methods
 */
export class returnSelf {
}
_a = returnSelf;
/**
 * Static method for creating a database object for advanced queries.
 * @param param0 - An object with query-related configuration.
 * @returns An object with query-related methods.
 */
returnSelf.object = ({ queryBuilder, DBconfig, TableSchema }) => {
    return {
        filter: (...args) => { },
        execute: async () => { },
        update: async (args) => { },
        delete: async () => { },
        all: async () => { }
    };
};

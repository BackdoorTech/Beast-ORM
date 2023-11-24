var _a;
import { ORM } from "../../BusinessLayer/beastOrm.js";
import { dataParameters } from "../../BusinessLayer/modelManager/dataParameters.js";
import { APIError, APIOk } from "../../Utility/Either/APIresponse.js";
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
returnSelf.object = (queryBuilder, model) => {
    return {
        execute: async () => {
            queryBuilder.select(model);
            const result = await ORM.executeSelectQuery(queryBuilder, model).many();
            if (result.isError) {
                console.error(result.error);
            }
            if (result.isError) {
                return APIError(result.error);
            }
            else {
                return APIOk(result.value);
            }
        },
        update: async (params) => {
            let data;
            if (params) {
                const tableSchema = model.getTableSchema();
                data = dataParameters.getFilteredData(tableSchema, params);
            }
            queryBuilder.update(model).set(data);
            const result = await ORM.executeUpdateQuery(queryBuilder, model);
            if (result.isError) {
                console.error(result.error);
            }
            if (result.isError) {
                return APIError(result.error);
            }
            else {
                return APIOk(result.value);
            }
        },
        delete: async () => {
            queryBuilder.deleteFrom(model);
            const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model);
            if (result.isError) {
                return APIError(result.error);
            }
            else {
                return APIOk(result.value);
            }
        },
    };
};

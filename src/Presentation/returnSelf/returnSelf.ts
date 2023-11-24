import { ORM } from "../../BusinessLayer/beastOrm.js"
import { Model } from "../Api"
import { dataParameters } from "../../BusinessLayer/modelManager/dataParameters.js";
import { APIError, APIOk, APIResponse } from "../../Utility/Either/APIresponse.js";
import { FormValidationError } from "../../BusinessLayer/validation/fields/allFields.type.js";

/**
 * @description Represents a return object for query-related methods
 */
export class returnSelf {
  /**
   * Static method for creating a database object for advanced queries.
   * @param param0 - An object with query-related configuration.
   * @returns An object with query-related methods.
   */
  static object = <T>(queryBuilder, model: typeof Model) => {
    return {
      execute: async (): Promise<APIResponse<T[], FormValidationError>> => {

        queryBuilder.select(model)
        const result = await ORM.executeSelectQuery<T>(queryBuilder, model as any).many()

        if(result.isError) {
          console.error(result.error)
        }

        if(result.isError) {
          return APIError(result.error)
        } else {
          return APIOk(result.value)
        }
      },
      update: async(params): Promise<APIResponse<number, FormValidationError>> => {

        let data
        if(params) {
          const tableSchema = model.getTableSchema()
          data = dataParameters.getFilteredData(tableSchema, params)
        }

        queryBuilder.update(model).set(data)
        const result = await ORM.executeUpdateQuery(queryBuilder, model as any)

        if(result.isError) {
          console.error(result.error)
        }

        if(result.isError) {
          return APIError(result.error)
        } else {
          return APIOk(result.value)
        }
      },
      delete: async(): Promise<APIResponse<number, FormValidationError>> => {

        queryBuilder.deleteFrom(model)

        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model)
        if(result.isError) {
          return APIError(result.error)
        } else {
          return APIOk(result.value)
        }
      },
    }
  }
}

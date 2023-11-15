import { ORM } from "../../BusinessLayer/beastOrm.js"
import { Model } from "../Api"
import { dataParameters } from "../../BusinessLayer/modelManager/dataParameters.js";
import { ITableSchema } from "../../BusinessLayer/_interface/interface.type.js";

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
      execute: async () => {

        queryBuilder.select(model)
        const result = await ORM.executeSelectQuery<T>(queryBuilder, model as any)

        if(result.isError) {
          throw(result.error)
        } else {
          return result.value
        }
      },
      update: async(params) => {

        let data
        if(params) {
          const tableSchema = model.getTableSchema()
          data = dataParameters.getFilteredData(tableSchema, params)
        }

        queryBuilder.update(model).set(data)
        const result = await ORM.executeUpdateQuery(queryBuilder, model as any)

        if(result.isError) {
          throw(result.error)
        } else {
          return result.value
        }
      },
      delete: async() => {

        queryBuilder.deleteFrom(model)

        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model)

        if(result.isError) {
          throw(result.error)
        } else {
          return result.value
        }
      },
    }
  }
}

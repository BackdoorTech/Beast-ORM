import { ItemNotFound } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { FormValidationError } from "../BusinessLayer/validation/fields/allFields.type.js";
import { TableSchema } from "../DataAccess/DataSource/indexeDB/indexeDB/resource/type.js";
import { APIResponse } from "../Utility/Either/APIresponse.js";

export declare class IModel<T> {
  /**
   * Retrieve data from the database with specified filter parameters.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  save(params: any)
  static get<T>(): Promise<T | null>;
  /**
   * Retrieve all data of the current model from the database.
   * @returns A promise that resolves with all query results.
   */
  static all<T>(): Promise<APIResponse<T[], FormValidationError>>
  /**
   * Retrieve data from the database with specified filter parameters and create if it doesn't exist.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  static getOrCreate<T>(...params: any[]): Promise<T>;
  static create<T>(...params: any[]): Promise<T>;
  /**
   * Delete data from the database with specified filter parameters.
   * @param params - The filter parameters for the delete.
   * @returns A promise that resolves when the delete operation is complete.
   */
  delete(params: any): Promise<any>;
  static updateOrCreate<T>(...args: any[]): Promise<T | null>;
  /**
   * Update data in the database with specified filter parameters.
   * @param params - The filter parameters for the update.
   * @returns A promise that resolves when the update operation is complete.
   */
  // update(): Promise<void>;
  static filter(): void;

  static getTableSchema(): TableSchema;

  static get(): Promise<APIResponse<any, FormValidationError | ItemNotFound>>
}

export declare interface IModelStatic<T> {
  all(): Promise<APIResponse<T[], FormValidationError>>
  create(...params: any[]): Promise<APIResponse<T, FormValidationError>>
}

export type self<T>  =  new () => T;

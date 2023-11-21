import { TableSchema } from "../../_src/models/register-modal.interface.js";
import { ItemNotFound } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { FormValidationError } from "../BusinessLayer/validation/fields/allFields.type.js";
import { Either } from "../Utility/Either/APIResponse.js";

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
  static all<T>(): Promise<Either<T[], FormValidationError>>
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

  static get(): Promise<Either<any, FormValidationError | ItemNotFound>>
}

export declare interface IModelStatic<T> {
  all(): Promise<Either<T[], FormValidationError>>
  create(...params: any[]): Promise<Either<T, FormValidationError>>
}

export type self<T>  =  new () => T;

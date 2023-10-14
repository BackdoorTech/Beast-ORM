import { TableSchema } from "../BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type";
import { QueryBuilder } from "./queryBuilder/queryBuilder";

export declare class IModel<T> {
  /**
   * Retrieve data from the database with specified filter parameters.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  save(...args: any[]): Promise<void>;
  get(): Promise<T | null>;
  /**
   * Retrieve all data of the current model from the database.
   * @returns A promise that resolves with all query results.
   */
  all(): Promise<T[]>;
  /**
   * Retrieve data from the database with specified filter parameters and create if it doesn't exist.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  getOrCreate(...params: any[]): Promise<T>;
  create(...params: any[]): Promise<void>;
  /**
   * Delete data from the database with specified filter parameters.
   * @param params - The filter parameters for the delete.
   * @returns A promise that resolves when the delete operation is complete.
   */
  delete(params: any): Promise<void>;
  updateOrCreate(...args: any[]): Promise<T | null>;
  /**
   * Update data in the database with specified filter parameters.
   * @param params - The filter parameters for the update.
   * @returns A promise that resolves when the update operation is complete.
   */
  update(): Promise<void>;
  filter(): void;

  static getTableSchema(): TableSchema;
}

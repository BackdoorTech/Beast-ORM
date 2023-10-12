import { Model } from "../Api"
/**
 * Represents a query object that helps build and execute database queries.
 */
export class Query {
  insert(params: any) {
    throw new Error("Method not implemented.");
  }

  model!: Model
  filters = {};
  limitValue = -1;
  operation = ""

  /**
   * Create a new Query instance.
   * @param model - The model associated with the query.
   * @param operation - The type of query operation (e.g., select, insert, update, delete).
   */
  constructor(model: Model, operation: string) {
    this.model = model;
    this.operation = operation;
    // -1 means no limit by default
  }

  /**
   * Add filter parameters to the query.
   * @param params - The filter parameters to apply to the query.
   * @returns The Query instance for method chaining.
   */
  filter(params: any) {
    this.filters = { ...this.filters, ...params };
    return this;
  }

  /**
   * Set a limit for the number of results to be returned by the query.
   * @param num - The maximum number of results to limit the query.
   * @returns The Query instance for method chaining.
   */
  limit(num: number) {
    this.limitValue = num;
    return this;
  }

  save() {}
}





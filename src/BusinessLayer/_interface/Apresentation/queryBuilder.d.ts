export interface IQuery {
  type: string,
  table: string,
  values: any[],
  updateValues: any,
  where: any[],
  limit: number,
  hasIndex: Boolean,
  isParamsArray: Boolean
}

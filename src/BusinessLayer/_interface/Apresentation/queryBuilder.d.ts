export interface IQuery {
  id: string,
  type: string,
  table: string,
  values: any[],
  updateValues: any,
  where: any[],
  limit: number,
  hasIndex: Boolean,
  isParamsArray: Boolean
}

export interface ISelectQuery {
  type: string,
  table: string,
  values: any[],
  where: any[],
  limit: number,
  isParamsArray: Boolean
}


export interface IDeleteQuery {
  type: string,
  table: string,
  values: any[],
  where: any[],
  limit: number,
  hasIndex: Boolean,
}


export interface IInsertQuery {
  type: string,
  table: string,
  values: any[],
  updateValues: any,
  where: any[],
  limit: number,
  hasIndex: Boolean,
  isParamsArray: Boolean
}


export interface IUpdateQuery {
  type: string,
  table: string,
  values: any[],
  updateValues: any,
  where: any[],
  limit: number,
  hasIndex: Boolean,
  isParamsArray: Boolean
}


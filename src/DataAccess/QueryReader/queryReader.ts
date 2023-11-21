import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder";

export class QueryReaderSelect implements IQuery {
  id: string
  type: string;
  table: string;
  values: any[];
  updateValues: any;
  where: any[];
  limit: number;
  hasIndex: Boolean;
  isParamsArray: Boolean;
  constructor(Query: IQuery) {
    Object.assign(this, Query)
  }

  get hasNoCondition() {
    return this.where.length == 0
  }

  get isInsertOne () {
    return true
  }

  get hasLimit() {
    return this.limit >= 1
  }

}

export function CreateQueryReaderSelect(Query: IQuery) {
  return new QueryReaderSelect(Query)
}

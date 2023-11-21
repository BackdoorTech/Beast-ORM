import { IQuery  } from "../_interface/Apresentation/queryBuilder"
export class ItemNotFound {

  //queryId: string
  type: string
  table: string
  where: any[]
  limit: number

  constructor(IQuery: IQuery) {
    this.type = IQuery.type
    this.table = IQuery.table
    this.where = IQuery.where
    this.limit = IQuery.limit
    //this.queryId = IQuery.id
  }

}
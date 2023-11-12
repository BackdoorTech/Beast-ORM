import { ITableSchema } from '../../../BusinessLayer/_interface/interface.js'
import { methods, methodFunction } from '../methods/methods.js'
import { argsAttributes } from '../Operators/args-attributes.js'
import { QueryReaderSelect } from "../../QueryReader/queryReader.js"
export class SqlObject {

	limit: number = 0
	rows = []
	firstMethod: methodFunction
	params = []
	argsAttributes: argsAttributes
  QueryReaderSelect: QueryReaderSelect

	constructor(private TableSchema: ITableSchema, QueryReaderSelect: QueryReaderSelect) {

		const condition = QueryReaderSelect.where

		const methodName: any = "filter"
		this.QueryReaderSelect = QueryReaderSelect
    this.argsAttributes = new argsAttributes(condition, TableSchema )

		this.firstMethod = new methods[methodName](this.argsAttributes, this.TableSchema)
	}

	async run (rows: any[]): Promise<any[]>{

    if(this.QueryReaderSelect.hasLimit) {
      return this.firstMethod.cursorWithLimit(rows, this.QueryReaderSelect.limit)
    } else {
      return this.firstMethod.cursor(rows, this.QueryReaderSelect.limit)
    }

	}
}

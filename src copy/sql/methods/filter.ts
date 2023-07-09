import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js'
import { argsAttributes } from '../Operators/args-attributes.js'

export class filter {
  	rows = []
	operator : ObjectConditionOperator

	constructor(private arg: argsAttributes, private TableSchema) {
		this.operator = new ObjectConditionOperator(this.TableSchema, this.arg)
	}

	async cursor(row: object, resolve?, limit?) {
		
		const operationsResult = await this.operator.run(row)

		if(operationsResult == true) {
			this.rows.push(row)
			if(this.rows.length == limit) {
				resolve(this.rows)
			}
		}
	}

	async run(rows: any[]) {
		const newRows = []

		for(let row of rows) {
			
			const operationsResult = await this.operator.run(row)

			if(operationsResult == true) {
				newRows.push(row)
			}
		}

		return newRows
	}

}
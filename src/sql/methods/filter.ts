import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js'

export class filter {
  rows = []
	constructor(private arg, private TableSchema) {}

	async cursor(row: object, resolve?, limit?) {
		const operator = new ObjectConditionOperator(row, this.TableSchema)
		const operationsResult = await operator.run(this.arg)

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
			
			const operator = new ObjectConditionOperator(row, this.TableSchema)
			const operationsResult = await operator.run(this.arg)

			if(operationsResult == true) {
				newRows.push(row)
			}
		}

		return newRows
	}

}
import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js'

export class filter {
  rows = []
	constructor(private arg, private TableSchema) {}

	async cursor(row: object) {
		const operator = new ObjectConditionOperator(row, this.TableSchema)
		const operationsResult = await operator.run(this.arg)

		if(operationsResult == true) {
			this.rows.push(row)
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
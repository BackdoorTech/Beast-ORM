import { Method } from '../../models/model.interface.js'
import { TableSchema } from '../../models/register-modal.interface.js'
import { methods, methodFunction } from '../methods/methods.js'
import { argsAttributes } from '../Operators/args-attributes.js'

export class SqlObject {

	limit: number = 0
	rows = []
	firstMethod: methodFunction
	params = []
	argsAttributes: argsAttributes 

	constructor(private TableSchema: TableSchema, private Methods: Method[]) {
		
		const arg = this.Methods[0].arguments
		const methodName = this.Methods[0].methodName
		this.argsAttributes = new argsAttributes(arg, TableSchema )
		this.firstMethod = new methods[methodName](this.argsAttributes, this.TableSchema)
	}

	async runFirstMethod (row, resolve?, limit?) {
		this.firstMethod.cursor(row, resolve, limit)
	}

	async doneRunFirstMethod () {
		this.rows = this.firstMethod.rows
	}

	async run() {
		for (let i = 1; i < this.Methods.length; i++) {
			
			const method = this.Methods[i]
			const methodName = method.methodName
			const arg  = method.arguments

			if(methods[methodName]) {
				const methodToExecute: methodFunction = new methods[methodName](arg, this.TableSchema)
				this.rows = await methodToExecute.run(this.rows)
			}

		}
	}

}

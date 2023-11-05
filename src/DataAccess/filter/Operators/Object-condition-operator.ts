import { ITableSchema } from '../../../BusinessLayer/_interface/interface.js';
import { argsAttributes, Field, value } from './args-attributes.js';

export class ObjectConditionOperator {

	row

	constructor(private TableSchema:ITableSchema, private args: argsAttributes) {

    // console.log({args})

	}

	run(row): boolean | any {
		this.row = row

		for(const arg of this.args.value) {

			const result = this.execute(arg)
			if(result) {
				return true
			}
		}

    return false
	}

	private execute(objOperator ): boolean {

		for(let objOperatorFieldName in objOperator) {

			const field: value = objOperator[objOperatorFieldName]

			const fieldName = field.fieldName
			const fieldPath = field.fieldPath
			const operation = field.operation
			const operationArg = field.operationArg
			const fieldClassName = field.fieldClassName
			const operator = field.operator

			const customData = field.customData({row:this.row, fieldPath})

			const arg = operationArg;

      // console.log({fieldName, fieldPath, operationArg, operator})

			let operationResult: boolean = operator({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath, customData})

      // console.log({operationResult})

			if(!operationResult) {

				return false
			}

		}

		return true
	}

}

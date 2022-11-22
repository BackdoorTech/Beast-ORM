import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';
import { ArrOperatorOverwrite, ObjOperatorOverwrite, operator, OperatorsKeysArray } from './object-operator.js'
import { getDeep } from '../../utils.js'
import { AttributesMap, FieldsMap } from '../../models/field/fields.interface.js';
import { argsAttributes, Field } from './args-attributes.js';

export class ObjectConditionOperator {

	row

	constructor(private TableSchema:TableSchema, private args: argsAttributes) {


	}

	run(row): boolean | any {
		this.row = row

		for(const arg of this.args.value) {
			
			const result = this.execute(arg)
			if(result) {
				return true
			}
		}

	}

	private execute(objOperator: FieldsMap<string, Field> ): boolean {

		for(let objOperatorFieldName in objOperator) {

			const field = objOperator[objOperatorFieldName]
				
			const fieldName = field.fieldName
			const fieldPath = field.fieldPath
			const operation = field.operation
			const operationArg = field.operationArg
			const fieldClassName = field.fieldClassName
			const operator = field.operator

			const arg = operationArg;
			
			let operationResult: boolean = operator({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})
			
			if(!operationResult) {
				
				return false
			}
		
		}

		return true
	}

}
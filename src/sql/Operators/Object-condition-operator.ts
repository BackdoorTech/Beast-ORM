import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';
import { ArrOperatorOverwrite, ObjOperatorOverwrite, operator, OperatorsKeysArray } from './object-operator.js'
import { getDeep } from '../../utils.js'
import { AttributesMap, FieldsMap } from '../../models/field/fields.interface.js';
import { argsAttributes, Field } from './args-attributes.js';

export class ObjectConditionOperator {

	schemeFields: AttributesMap<string, FieldSchema> = {} = {}
	row

	constructor(private TableSchema:TableSchema, private args: argsAttributes) {
		for( const field of this.TableSchema.fields) {
			this.schemeFields[field.name] = field
		}

		this.schemeFields[this.TableSchema.id.keyPath] = {
			keyPath: this.TableSchema.id.keyPath,
			name: this.TableSchema.id.keyPath,
			className: 'IntegerField',
		}

	}

	async run(row): Promise<boolean| any> {
		this.row = row

		for(const arg of this.args.value) {
			
			const result = await this.execute(arg)
			if(result) {
				return true
			}
		}

	}

	private async execute(objOperator: FieldsMap<string, Field> ): Promise<boolean> {

		for(let objOperatorFieldName in objOperator) {

			const field = objOperator[objOperatorFieldName]
				
			const fieldName = field.fieldName
			const fieldPath = field.fieldPath
			const operation = field.operation
			const operationArg = field.operationArg
			const fieldClassName = field.fieldClassName
			// const operator = field.operator

			

			const arg = operationArg;
			

			let operationResult: boolean; 
			
			// operator({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})
			
			try {
				if(this.schemeFields[fieldName].className == 'indexedDBJsonField') {
					operationResult = await ObjOperatorOverwrite[operation]({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})
				} 
				else if(this.schemeFields[fieldName].className == 'indexedDBArrayField') {
					operationResult = await ArrOperatorOverwrite[operation]({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})	
				} 
				else {
					operationResult = await operator[operation]({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})
				}
			} catch (err) {
				// console.log(this.TableSchema, this.schemeFields[fieldName])
				throw('Field '+ fieldName +' does not exit on the table'+ err)
			}
			
			
			
			if(!operationResult) {
				
				return false
			}
		
		}

		return true
	}

}
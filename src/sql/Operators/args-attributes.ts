import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldsMap } from "../../models/field/fields.interface.js";
import { OperatorKeys, OperatorsKeysArray, operator, ObjOperatorOverwrite, ArrOperatorOverwrite } from "./object-operator.js";
import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';

export interface Field {
    fieldName: string,
    fieldPath: string,
    operation: OperatorKeys,
    operationArg?: string
    operator: Function
    fieldClassName: FieldKeys
}

export class argsAttributes {

    value: Array<FieldsMap<string, Field>>  = []
    schemeFields: AttributesMap<string, FieldSchema> = {} = {}

    constructor(args, private TableSchema:TableSchema) {

        for( const field of this.TableSchema.fields) {
			this.schemeFields[field.name] = field
		}

		this.schemeFields[this.TableSchema.id.keyPath] = {
			keyPath: this.TableSchema.id.keyPath,
			name: this.TableSchema.id.keyPath,
			className: 'IntegerField',
		}

        if(args.constructor.name != 'Array') {
            args = [ args ]
        }

        const conditions = this.argsPrettyTransform(args)
        this.value = this.analyzeArgs(conditions)

    }


    private analyzeArgs(conditions: any[]): Array<FieldsMap<string, Field>> {

        return conditions.map((condition:object) => {

            const newObject: AttributesMap<FieldAttributesKeys, string[]> = {}

            const keys = Object.keys(condition)
            for(let field of keys) {
                let fieldName;
                let fieldPath;
                let arg;

                const element = field.split('__')
                
                if(element.length == 1) {
                    element.push('eq')
                }

                let  operation: any = element[element.length - 1]

            
                if(OperatorsKeysArray.includes(operation)) {
                    operation = element.pop()
                } else {
                    operation = 'eq'
                }
                
                fieldName = element[0]
                fieldPath = element.join('.')

                if(OperatorsKeysArray.includes(operation)) {
                    arg = condition[field];
                } else {
                    throw('operator')
                }

                newObject[field] = {
                    fieldName: fieldName,
                    fieldPath: fieldPath,
                    operation: operation,
                    operationArg: arg,
                    // operator: this.detectOperator(fieldName, operation)
                    fieldClassName: this.detectClassName(fieldName)
                }
            }

            return newObject

        }) as any
    }

    private async detectClassName(fieldName) {
        try {
            return this.schemeFields[fieldName].className
        } catch (err) {
            // console.log(this.TableSchema, this.schemeFields[fieldName])
            throw('Field '+ fieldName +' does not exit on the table'+ err)
        }
    }

    private argsPrettyTransform(args) {
        const conditions = []

        const loop =  (o) => {
            // https://stackoverflow.com/a/38597076/14115342
            const condition: any = {}

            for( const k of Object.keys(o)) {
                if ( o[k].constructor.name === 'Array') {
                    loop(o[k]);
                } else {
                    if ( o.constructor.name === 'Array') {
                        // console.log('dif', o, k , )
                        for( const j of Object.keys(o[k])) {
                            // console.log('push',  o[k], j)
                            condition[j] = o[k][j]
                        }
                        
                    } else {
                        // console.log('push',  o, k)
                        condition[k] = o[k]
                    }
                    
                }
            }

            if(JSON.stringify(condition) !== '{}') {
                conditions.push(condition)
            }
            
        }
        loop(args)

        return conditions;
    }
}
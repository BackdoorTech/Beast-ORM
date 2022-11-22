import { ArrOperatorOverwrite, ObjOperatorOverwrite, operator } from './object-operator.js';
export class ObjectConditionOperator {
    constructor(TableSchema, args) {
        this.TableSchema = TableSchema;
        this.args = args;
        this.schemeFields = {} = {};
        for (const field of this.TableSchema.fields) {
            this.schemeFields[field.name] = field;
        }
        this.schemeFields[this.TableSchema.id.keyPath] = {
            keyPath: this.TableSchema.id.keyPath,
            name: this.TableSchema.id.keyPath,
            className: 'IntegerField',
        };
    }
    async run(row) {
        this.row = row;
        for (const arg of this.args.value) {
            const result = await this.execute(arg);
            if (result) {
                return true;
            }
        }
    }
    async execute(objOperator) {
        for (let objOperatorFieldName in objOperator) {
            const field = objOperator[objOperatorFieldName];
            const fieldName = field.fieldName;
            const fieldPath = field.fieldPath;
            const operation = field.operation;
            const operationArg = field.operationArg;
            const fieldClassName = field.fieldClassName;
            // const operator = field.operator
            const arg = operationArg;
            let operationResult;
            // operator({fieldName, arg, row:this.row, TableSchema:this.TableSchema, element:fieldName, fieldPath})
            try {
                if (this.schemeFields[fieldName].className == 'indexedDBJsonField') {
                    operationResult = await ObjOperatorOverwrite[operation]({ fieldName, arg, row: this.row, TableSchema: this.TableSchema, element: fieldName, fieldPath });
                }
                else if (this.schemeFields[fieldName].className == 'indexedDBArrayField') {
                    operationResult = await ArrOperatorOverwrite[operation]({ fieldName, arg, row: this.row, TableSchema: this.TableSchema, element: fieldName, fieldPath });
                }
                else {
                    operationResult = await operator[operation]({ fieldName, arg, row: this.row, TableSchema: this.TableSchema, element: fieldName, fieldPath });
                }
            }
            catch (err) {
                // console.log(this.TableSchema, this.schemeFields[fieldName])
                throw ('Field ' + fieldName + ' does not exit on the table' + err);
            }
            if (!operationResult) {
                return false;
            }
        }
        return true;
    }
}

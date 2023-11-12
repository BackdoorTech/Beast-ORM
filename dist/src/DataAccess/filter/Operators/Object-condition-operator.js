export class ObjectConditionOperator {
    constructor(TableSchema, args) {
        // console.log({args})
        this.TableSchema = TableSchema;
        this.args = args;
    }
    run(row) {
        this.row = row;
        for (const arg of this.args.value) {
            const result = this.execute(arg);
            if (result) {
                return true;
            }
        }
        return false;
    }
    execute(objOperator) {
        for (let objOperatorFieldName in objOperator) {
            const field = objOperator[objOperatorFieldName];
            const fieldName = field.fieldName;
            const fieldPath = field.fieldPath;
            const operation = field.operation;
            const operationArg = field.operationArg;
            const fieldClassName = field.fieldClassName;
            const operator = field.operator;
            const customData = field.customData({ row: this.row, fieldPath });
            const arg = operationArg;
            // console.log({fieldName, fieldPath, operationArg, operator})
            let operationResult = operator({ fieldName, arg, row: this.row, TableSchema: this.TableSchema, element: fieldName, fieldPath, customData });
            // console.log({operationResult})
            if (!operationResult) {
                return false;
            }
        }
        return true;
    }
}
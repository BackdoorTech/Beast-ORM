export class ObjectConditionOperator {
    constructor(TableSchema, args) {
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
            let operationResult = operator({ fieldName, arg, row: this.row, TableSchema: this.TableSchema, element: fieldName, fieldPath, customData });
            if (!operationResult) {
                return false;
            }
        }
        return true;
    }
}

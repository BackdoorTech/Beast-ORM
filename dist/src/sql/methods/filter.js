import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js';
export class filter {
    constructor(arg, TableSchema) {
        this.arg = arg;
        this.TableSchema = TableSchema;
        this.rows = [];
    }
    async cursor(row) {
        const operator = new ObjectConditionOperator(row, this.TableSchema);
        const operationsResult = await operator.run(this.arg);
        if (operationsResult == true) {
            console.log('add row', row);
            this.rows.push(row);
        }
    }
    async run(rows) {
        const newRows = [];
        for (let row of rows) {
            const operator = new ObjectConditionOperator(row, this.TableSchema);
            const operationsResult = await operator.run(this.arg);
            if (operationsResult == true) {
                newRows.push(row);
            }
        }
        return newRows;
    }
}

import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js';
export class filter {
    constructor(arg, TableSchema) {
        this.arg = arg;
        this.TableSchema = TableSchema;
        this.rows = [];
        this.operator = new ObjectConditionOperator(this.TableSchema, this.arg);
    }
    async cursor(row, resolve, limit) {
        const operationsResult = await this.operator.run(row);
        if (operationsResult == true) {
            this.rows.push(row);
            if (this.rows.length == limit) {
                resolve(this.rows);
            }
        }
    }
    async run(rows) {
        const newRows = [];
        for (let row of rows) {
            const operationsResult = await this.operator.run(row);
            if (operationsResult == true) {
                newRows.push(row);
            }
        }
        return newRows;
    }
}

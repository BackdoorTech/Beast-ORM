import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js';
export class filter {
    constructor(arg, TableSchema) {
        this.arg = arg;
        this.TableSchema = TableSchema;
        this.rows = [];
        this.operator = new ObjectConditionOperator(this.TableSchema, this.arg);
    }
    async cursor(rows) {
        for (const row of rows) {
            const operationsResult = await this.operator.run(row);
            if (operationsResult == true) {
                this.rows.push(row);
            }
        }
        return this.rows;
    }
    async cursorWithLimit(rows, limit) {
        for (const row of rows) {
            const operationsResult = await this.operator.run(row);
            if (operationsResult == true) {
                this.rows.push(row);
                if (this.rows.length == limit) {
                    // console.log("done===========", this.rows)
                    return this.rows;
                }
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
            else {
            }
        }
        return newRows;
    }
}

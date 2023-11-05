import { methods } from '../methods/methods.js';
import { argsAttributes } from '../Operators/args-attributes.js';
export class SqlObject {
    constructor(TableSchema, QueryReaderSelect) {
        this.TableSchema = TableSchema;
        this.limit = 0;
        this.rows = [];
        this.params = [];
        const condition = QueryReaderSelect.where;
        const methodName = "filter";
        this.QueryReaderSelect = QueryReaderSelect;
        this.argsAttributes = new argsAttributes(condition, TableSchema);
        this.firstMethod = new methods[methodName](this.argsAttributes, this.TableSchema);
    }
    async run(rows) {
        if (this.QueryReaderSelect.hasLimit) {
            return this.firstMethod.cursorWithLimit(rows, this.QueryReaderSelect.limit);
        }
        else {
            return this.firstMethod.cursor(rows, this.QueryReaderSelect.limit);
        }
    }
}

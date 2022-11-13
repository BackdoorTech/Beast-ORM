import { methods } from '../methods/methods.js';
export class SqlObject {
    constructor(TableSchema, Methods) {
        this.TableSchema = TableSchema;
        this.Methods = Methods;
        this.limit = 0;
        this.rows = [];
        this.params = [];
        const arg = this.Methods[0].arguments;
        const methodName = this.Methods[0].methodName;
        this.firstMethod = new methods[methodName](arg, this.TableSchema);
    }
    async runFirstMethod(row, resolve, limit) {
        this.firstMethod.cursor(row, resolve, limit);
    }
    async doneRunFirstMethod() {
        this.rows = this.firstMethod.rows;
    }
    async run() {
        for (let i = 1; i < this.Methods.length; i++) {
            const method = this.Methods[i];
            const methodName = method.methodName;
            const arg = method.arguments;
            if (methods[methodName]) {
                const methodToExecute = new methods[methodName](arg, this.TableSchema);
                this.rows = await methodToExecute.run(this.rows);
            }
        }
    }
}

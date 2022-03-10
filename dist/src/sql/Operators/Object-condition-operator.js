import { operator } from './object-operator.js';
export class ObjectConditionOperator {
    constructor(row, tableSchema) {
        this.row = row;
        this.tableSchema = tableSchema;
    }
    async run(args) {
        return new Promise(async (resolve, reject) => {
            const loop = async (o) => {
                // https://stackoverflow.com/a/38597076/14115342
                await Object.keys(o).forEach(async (k) => {
                    if (o[k].constructor.name === 'Array') {
                        await loop(o[k]);
                    }
                    else {
                        const result = await this.execute(o[k]);
                        if (result) {
                            resolve(true);
                        }
                    }
                });
                return o;
            };
            await loop(args);
            resolve(false);
        });
    }
    async execute(objOperator) {
        const keys = Object.keys(objOperator);
        for (let field of keys) {
            const element = field.split('__');
            if (element.length == 1) {
                element.push('eq');
            }
            const operation = element.pop();
            const fieldName = element.join('.');
            if (operator[operation]) {
                const rowFieldValue = this.row[fieldName];
                const arg = objOperator[field];
                // console.log(this.row)
                const operationResult = await operator[operation](field, arg, rowFieldValue, this.row);
                if (!operationResult) {
                    return false;
                }
            }
        }
        return true;
    }
}

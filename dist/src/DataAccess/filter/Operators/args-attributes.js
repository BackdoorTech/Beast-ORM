import { OperatorsKeysArray, operator, ObjOperatorOverwrite, ArrOperatorOverwrite } from "./object-operator.js";
import { info } from "./operators.js";
export class argsAttributes {
    constructor(args, TableSchema) {
        this.TableSchema = TableSchema;
        this.value = [];
        this.schemeFields = {} = {};
        for (const field of this.TableSchema.fields) {
            this.schemeFields[field.name] = field;
        }
        this.schemeFields[this.TableSchema.id.keyPath] = {
            keyPath: this.TableSchema.id.keyPath,
            name: this.TableSchema.id.keyPath,
            className: 'IntegerField',
        };
        if (args.constructor.name != 'Array') {
            args = [args];
        }
        const conditions = this.argsPrettyTransform(args);
        this.value = this.analyzeArgs(conditions);
    }
    analyzeArgs(conditions) {
        return conditions.map((condition) => {
            const newObject = {};
            const keys = Object.keys(condition);
            for (let field of keys) {
                let fieldName;
                let fieldPath;
                let arg;
                const element = field.split('__');
                // console.log({element})
                if (element.length == 1) {
                    element.push('eq');
                }
                let operation = element[element.length - 1];
                if (OperatorsKeysArray.includes(operation)) {
                    operation = element.pop();
                }
                else {
                    // console.log("not found", operation)
                    operation = 'eq';
                }
                // console.log({operation, element})
                fieldName = element[0];
                fieldPath = element.join('.');
                if (OperatorsKeysArray.includes(operation)) {
                    arg = condition[field];
                }
                else {
                    throw ('operator');
                }
                const fieldClassName = this.detectClassName(fieldName);
                newObject[field] = {
                    fieldName: fieldName,
                    fieldPath: fieldPath,
                    operation: operation,
                    operationArg: arg,
                    operator: this.detectOperator(fieldClassName, operation, fieldName),
                    fieldClassName: fieldClassName,
                };
                if (fieldClassName == 'indexedDBArrayField' || fieldClassName == 'indexedDBJsonField') {
                    newObject[field]['customData'] = info.run;
                }
                else {
                    newObject[field]['customData'] = () => { };
                }
            }
            return newObject;
        });
    }
    detectClassName(fieldName) {
        return this.schemeFields[fieldName].className;
    }
    detectOperator(fieldClassName, operation, fieldName) {
        try {
            if (fieldClassName == 'indexedDBJsonField') {
                return ObjOperatorOverwrite[operation];
            }
            else if (fieldClassName == 'indexedDBArrayField') {
                return ArrOperatorOverwrite[operation];
            }
            else {
                return operator[operation];
            }
        }
        catch (err) {
            throw ('Field ' + fieldName + ' does not exit on the table' + err);
        }
    }
    argsPrettyTransform(args) {
        const conditions = [];
        const loop = (o) => {
            // https://stackoverflow.com/a/38597076/14115342
            const condition = {};
            for (const k of Object.keys(o)) {
                if (o[k].constructor.name === 'Array') {
                    loop(o[k]);
                }
                else {
                    if (o.constructor.name === 'Array') {
                        for (const j of Object.keys(o[k])) {
                            condition[j] = o[k][j];
                        }
                    }
                    else {
                        condition[k] = o[k];
                    }
                }
            }
            if (JSON.stringify(condition) !== '{}') {
                conditions.push(condition);
            }
        };
        loop(args);
        return conditions;
    }
}

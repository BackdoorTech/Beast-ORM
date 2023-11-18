import { ModelReader } from './ModelReader.js';
import { FieldType } from './ModalReader.type.js';
import { RuntimeMethods as RM } from '../runtimeMethods/runTimeMethods.js';
import { GustPrototype, RealPrototype } from '../../../Presentation/Model/fields/fieldsWrappers.js';
import { ManyToManyField } from '../../../Presentation/Model/fields/allFields.js';
import { middleTable } from '../relationships/middleTable.js';
import { getArgIdWithT } from '../../../Utility/Model/utils.js';
import { capitalizeFirstLetter, hashCode } from '../../../Utility/utils.js';
class SchemaGenerator {
    constructor() {
        this.databases = {};
    }
    processingDatabase(DBname) {
        this.databases[DBname] = { tablesNames: [], tableHash: {} };
    }
    hasBeenProcessedDb(DBname) {
        return (this.databases[DBname] == null || this.databases[DBname] == undefined) ? false : true;
    }
    generate(entries) {
        const databaseSchema = {
            databaseName: entries.databaseName,
            type: entries.type,
            version: entries.version,
            table: [],
            middleTables: []
        };
        if (this.hasBeenProcessedDb(entries.databaseName)) {
            return;
        }
        this.processingDatabase(entries.databaseName);
        for (const modelClassRepresentations of entries.models) {
            const { tablesSchemas, middleTablesSchemas } = this.generateTableSchema(modelClassRepresentations, entries.databaseName);
            databaseSchema.table = databaseSchema.table.concat(tablesSchemas);
            databaseSchema.middleTables = databaseSchema.middleTables.concat(middleTablesSchemas);
        }
        // console.log({databaseSchema});
        return databaseSchema;
    }
    generateTableSchema(modelClassRepresentations, databaseName) {
        const tablesSchemas = [];
        const middleTablesSchemas = [];
        const { fields, attributes, fieldTypes, modelName, fieldNames, falseField } = ModelReader.read(modelClassRepresentations);
        const tableName = this.getModalName(modelName, databaseName, modelClassRepresentations);
        const id = this.makePrimary(fields, attributes);
        const tablesSchema = {
            databaseName: databaseName,
            name: tableName,
            id: id,
            attributes: attributes,
            fields: [],
            fieldTypes,
            fieldNames,
            falseField,
            foreignKey: {},
            middleTablePK: {},
            middleTableRelatedFields: {}
        };
        const realFields = Object.entries(fields).filter(([fieldName, Field]) => {
            return Field.fieldName != "ManyToManyField";
        });
        for (let [fieldName, Field] of realFields) {
            Field === null || Field === void 0 ? true : delete Field["model"];
            tablesSchema.fields.push({
                name: fieldName,
                keyPath: fieldName,
                options: {
                    unique: false,
                    type: null
                },
                className: Field.fieldName,
                fieldAttributes: Object.assign({}, Field),
                blank: false
            });
        }
        tablesSchemas.push(tablesSchema);
        for (let [foreignKeyFieldName, Field] of Object.entries(fields)) {
            if (Field instanceof ManyToManyField) {
                // current model modelClassRepresentations
                const modelName = ModelReader.getModelName(Field.model);
                const foreignKeyTableName = this.getModalName(modelName, databaseName, Field.model);
                const middleTableSchema = middleTable.addMiddleTable(foreignKeyFieldName, foreignKeyTableName, tableName, databaseName);
                middleTablesSchemas.push(middleTableSchema);
                tablesSchema.middleTablePK[foreignKeyFieldName] = { tableName: middleTableSchema.name };
                tablesSchema.middleTableRelatedFields[middleTableSchema.name] = { fieldName: foreignKeyFieldName };
            }
        }
        return { tablesSchemas, middleTablesSchemas };
    }
    getModalName(modelName, databaseName, _Model) {
        if (!this.hasRegisterModelName(databaseName, _Model)) {
            if (this.isModelNameAvailable(databaseName, modelName)) {
                this.registerModelName(databaseName, _Model, modelName);
                return modelName;
            }
            else {
                const hasCode = hashCode(_Model.toString());
                this.registerModelName(databaseName, _Model, hasCode);
                return hasCode;
            }
        }
        else {
            return this.getModelName(databaseName, _Model);
        }
    }
    getModelName(databaseName, _Model) {
        const hasCode = hashCode(_Model.toString());
        return this.databases[databaseName].tableHash[hasCode];
    }
    registerModelName(databaseName, _Model, name) {
        const hasCode = hashCode(_Model.toString());
        this.databases[databaseName].tableHash[hasCode] = name;
        return this.databases[databaseName].tablesNames.push(name);
    }
    isModelNameAvailable(databaseName, name) {
        return !this.databases[databaseName].tablesNames.includes(name);
    }
    hasRegisterModelName(databaseName, _Model) {
        const hasCode = hashCode(_Model.toString());
        return this.databases[databaseName].tableHash[hasCode];
    }
    makePrimary(fields, attributes) {
        var _a, _b;
        const idFieldName = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _a === void 0 ? void 0 : _a.shift();
        return {
            keyPath: idFieldName || 'id',
            autoIncrement: fields[idFieldName] ? ((_b = fields[idFieldName]) === null || _b === void 0 ? void 0 : _b.primaryKey) == true : true,
            type: FieldType.INT
        };
    }
    /**
     * Attaches generated table schema to model classes.
     * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
     * @param {Object} entries - An object containing model classes.
     */
    attachGeneratedTableSchemaToModel(databaseSchema, entries) {
        for (let index = 0; index < entries.models.length; index++) {
            // Get the table schema class for the current model.
            const tableSchemaClass = databaseSchema.table[index];
            // Add a static method to the model for accessing the table schema.
            entries.models[index][RM.getTableSchema] = () => {
                return tableSchemaClass;
            };
            RealPrototype();
            const model = new entries.models[index];
            GustPrototype();
            entries.models[index].getModelSchema = () => {
                return model;
            };
            entries.models[index].prototype[RM.getTableSchema] = () => {
                return tableSchemaClass;
            };
        }
    }
    attachMiddleTablesModel(databaseSchema, entries, _MiddleModels) {
        for (let index = 0; index < databaseSchema.table.length; index++) {
            const currentModel = entries.models[index];
            const currentModelName = currentModel.getTableSchema().name;
            const middleTablePK = databaseSchema.table[index].middleTablePK;
            const foreignKeyLength = Object.keys(middleTablePK).length;
            if (foreignKeyLength >= 1) {
                for (const [fieldName, info] of Object.entries(middleTablePK)) {
                    const middleTableModel = _MiddleModels.find(e => {
                        if (e.getTableSchema().name == info.tableName) {
                            return true;
                        }
                    });
                    const otherModel = currentModel.getModelSchema()[fieldName].model;
                    const otherParameterName = otherModel.getTableSchema().name;
                    const currentTableName = capitalizeFirstLetter(currentModelName);
                    currentModel.prototype[fieldName + "Add"] = function (Model) {
                        const parameters = {};
                        parameters["iD" + otherParameterName] = getArgIdWithT(otherModel, Model);
                        parameters["iD" + currentTableName] = getArgIdWithT(currentModel, this);
                        console.log({ parameters, currentTableName, otherParameterName });
                        return middleTableModel.create(parameters);
                    };
                    currentModel.prototype[fieldName + RM.All] = async function () {
                        const parameters = {};
                        parameters["iD" + currentTableName] = getArgIdWithT(currentModel, this);
                        const result = await middleTableModel.filter(parameters).execute();
                        const asyncOperations = result.map(async (e) => {
                            await e["iD" + otherParameterName].get();
                            return e["iD" + otherParameterName];
                        });
                        // Use Promise.all to wait for all asynchronous operations to complete
                        const resolvedResults = await Promise.all(asyncOperations);
                        return resolvedResults;
                    };
                }
            }
        }
    }
}
export const schemaGenerator = new SchemaGenerator();

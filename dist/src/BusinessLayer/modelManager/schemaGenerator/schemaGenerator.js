import { ModelReader } from './ModelReader.js';
import { FieldType } from './ModalReader.type.js';
import { RuntimeMethods as RM } from '../runtimeMethods/runTimeMethods.js';
import { GustPrototype, RealPrototype } from '../../../Presentation/Model/fields/fieldsWrappers.js';
import { ForeignKey, ManyToManyField } from '../../../Presentation/Model/fields/allFields.js';
import { middleTable } from '../relationships/middleTable.js';
import { getArgIdWithT } from '../../../Utility/Model/utils.js';
class SchemaGenerator {
    constructor() {
        this.databases = {};
    }
    processingDatabase(DBname) {
        this.databases[DBname] = { tablesNames: [] };
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
        const { fields, attributes, fieldTypes, modelName, fieldNames } = ModelReader.read(modelClassRepresentations);
        const tableName = this.getModalName(modelName);
        const id = this.makePrimary(fields, attributes);
        const tablesSchema = {
            databaseName: databaseName,
            name: tableName,
            id: id,
            attributes: attributes,
            fields: [],
            fieldTypes,
            fieldNames,
            foreignKey: {}
        };
        for (let [fieldName, Field] of Object.entries(fields)) {
            Field === null || Field === void 0 ? true : delete Field["model"];
            tablesSchema.fields.push({
                name: fieldName,
                keyPath: fieldName,
                options: {
                    unique: false,
                    type: null
                },
                className: Field === null || Field === void 0 ? void 0 : Field['fieldName'],
                fieldAttributes: Object.assign({}, Field),
                blank: false
            });
        }
        tablesSchemas.push(tablesSchema);
        for (let [fieldName, Field] of Object.entries(fields)) {
            if (Field instanceof ForeignKey) {
                const middleTableSchema = middleTable.addMiddleTable(fieldName, databaseName, tableName);
                middleTablesSchemas.push(middleTableSchema);
                tablesSchema.foreignKey[fieldName] = { tableName: tableName };
            }
            else if (Field instanceof ManyToManyField) {
                const middleTableSchema = middleTable.addMiddleTable(fieldName, databaseName, tableName);
                middleTablesSchemas.push(middleTableSchema);
                tablesSchema.foreignKey[fieldName] = { tableName: tableName };
            }
        }
        return { tablesSchemas, middleTablesSchemas };
    }
    getModalName(modelName) {
        return modelName;
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
            const foreignKeyObject = databaseSchema.table[index].foreignKey;
            const foreignKeyLength = Object.keys(foreignKeyObject).length;
            if (foreignKeyLength >= 1) {
                for (const [fieldName, Field] of Object.entries(foreignKeyObject)) {
                    const middleTableName = Field.tableName;
                    const middleTableModel = _MiddleModels.find(e => e.getTableSchema().name == middleTableName);
                    currentModel.prototype[fieldName + "Add"] = function (Model) {
                        const parameters = {};
                        parameters["iD" + fieldName] = getArgIdWithT(currentModel, this);
                        parameters["iD" + middleTableName] = getArgIdWithT(middleTableModel, Model);
                        return middleTableModel.create(parameters);
                    };
                }
            }
        }
    }
}
export const schemaGenerator = new SchemaGenerator();

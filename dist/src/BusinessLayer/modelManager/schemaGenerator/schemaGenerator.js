import { ModelReader } from './ModelReader.js';
import { FieldType } from './ModalReader.type.js';
import { RuntimeMethods as RM } from '../runtimeMethods/runTimeMethods.js';
class SchemaGenerator {
    generate(entries) {
        const databaseSchema = {
            databaseName: entries.databaseName,
            type: entries.type,
            version: entries.version,
            table: [],
        };
        for (const modelClassRepresentations of entries.models) {
            const { fields, attributes, fieldTypes, modelName, fieldNames } = ModelReader.read(modelClassRepresentations);
            const otherTablesName = databaseSchema.table.map(e => e.name);
            const tableName = this.getModalName(databaseSchema.databaseName, otherTablesName, modelName);
            const id = this.makePrimary(fields, attributes);
            const tablesSchema = {
                databaseName: databaseSchema.databaseName,
                name: tableName,
                id: id,
                attributes: attributes,
                fields: [],
                fieldTypes,
                fieldNames
            };
            for (const [fieldName, Field] of Object.entries(fields)) {
                tablesSchema.fields.push({
                    name: fieldName,
                    keyPath: fieldName,
                    options: {
                        unique: false,
                        type: null
                    },
                    className: Field === null || Field === void 0 ? void 0 : Field['fieldName'],
                    fieldAttributes: Object.assign({}, Field)
                });
            }
            databaseSchema.table.push(tablesSchema);
        }
        return databaseSchema;
    }
    getModalName(databaseName, otherModelNames, modelName) {
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
            entries.models[index].prototype[RM.getTableSchema] = () => {
                return tableSchemaClass;
            };
        }
    }
}
export const schemaGenerator = new SchemaGenerator();

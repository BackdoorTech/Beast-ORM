import { Model } from "../../../Presentation/Api.js";
import { FieldType } from "../../fields/fields.type.js";
import { RuntimeMethods as RM } from "../runtimeMethods/runTimeMethods.js";
export class MiddleTable {
    addMiddleTable(foreignKeyFieldName, databaseName, currentModelName) {
        const foreignKeyModelName = foreignKeyFieldName;
        const tableName = currentModelName + foreignKeyModelName;
        const middleTableSchema = {
            databaseName: databaseName,
            name: tableName,
            id: { keyPath: 'id', autoIncrement: true, type: FieldType.INT },
            fields: [
                {
                    name: 'iD' + foreignKeyModelName,
                    keyPath: 'iD' + foreignKeyModelName,
                    blank: false,
                    fieldAttributes: {},
                    options: {
                        unique: false,
                        type: FieldType.INT
                    },
                    className: 'IntegerField'
                },
                {
                    name: 'iD' + currentModelName,
                    keyPath: 'iD' + currentModelName,
                    blank: false,
                    fieldAttributes: {},
                    options: {
                        unique: false,
                        type: FieldType.INT
                    },
                    className: 'IntegerField'
                }
            ],
            attributes: {},
            foreignKey: {},
            fieldTypes: {
                IntegerField: ['iD' + foreignKeyModelName, 'iD' + currentModelName]
            },
            fieldNames: []
        };
        return middleTableSchema;
    }
    generateGenericModel({ ModelName, middleTableSchema }) {
        class GenericModel extends Model {
        }
        const model = GenericModel;
        GenericModel[RM.getModel] = () => {
            return model;
        };
        GenericModel[RM.getTableSchema] = () => {
            return middleTableSchema;
        };
        return GenericModel;
    }
}
export const middleTable = new MiddleTable();

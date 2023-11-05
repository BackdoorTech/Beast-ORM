// @ts-nocheck
import { Model } from '../../../../Presentation/Api.js';
import { schemaGenerator } from '../../../modelManager/schemaGenerator/schemaGenerator.js'
describe('SchemaGenerator', () => {
  // Test the read method
  describe('generate', () => {
    it('should return database schema', () => {

      class MockModel extends Model {
        // Define your mock model here
      }


      const schema = schemaGenerator.generate({
        databaseName: 'test',
        type: 'indexedDB',
        version: 1,
        models: [MockModel]
      });

      // Assert the expected output based on your mock model
      expect(JSON.stringify(schema)).to.equal(JSON.stringify({
        "databaseName": "test",
        "type": "indexedDB",
        "version": 1,
        "table": [
          {
            "databaseName": "test",
            "name": "MockModel",
            "id": {
              "keyPath": "id",
              "autoIncrement": true,
              "type": 1
            },
            "attributes": {},
            "fields": [],
            "fieldTypes": {},
            "fieldNames": []
          }
        ]
      }));
    });

    it('should attach generated TableSchema into Model instance ', () => {

      class MockModel extends Model {
        // Define your mock model here
      }

      const register = {
        databaseName: 'test',
        type: 'indexedDB',
        version: 1,
        models: [MockModel]
      }

      const schema = schemaGenerator.generate(register as any);

      schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);

      // Assert the expected output based on your mock model
      expect(JSON.stringify(MockModel.getTableSchema())).to.equal(JSON.stringify({
        "databaseName": "test",
        "name": "MockModel",
        "id": {
          "keyPath": "id",
          "autoIncrement": true,
          "type": 1
        },
        "attributes": {},
        "fields": [],
        "fieldTypes": {},
        "fieldNames": []
      }));
    });
  });

});

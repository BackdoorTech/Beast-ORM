import { Model } from '../../../../Presentation/Api';
import { schemaGenerator } from '../../../modelManager/schemaGenerator/schemaGenerator'
import { modelRegistration } from '../../../modelManager/register/register'

describe('Register', () => {
  // Test the read method
  describe('generate', () => {
    it('should match', () => {

      class MockModel extends Model<MockModel> {
        // Define your mock model here
      }

      const schema = schemaGenerator.generate({
        databaseName: 'test',
        type: 'indexedDB',
        version: 1,
        models: [MockModel]
      });

      modelRegistration.register(schema)

      // Assert the expected output based on your mock model
      expect(JSON.stringify(modelRegistration)).to.equal(JSON.stringify({
        "databases": {
          "test": {
            "type": "indexedDB",
            "tables": [
              {
                "config": {
                  "databaseName": "test",
                  "name": "MockModel",
                  "id": {
                    "keyPath": "id",
                    "autoIncrement": true,
                    "type": 1
                  },
                  "attributes": {},
                  "fields": [],
                  "fieldTypes": {}
                }
              }
            ],
            "databaseName": "test",
            "version": 1
          }
        }
      }));
    });

    it('match ', () => {

      class MockModel extends Model<MockModel> {
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
      modelRegistration.register(schema)

      // Assert the expected output based on your mock model
      expect(JSON.stringify(modelRegistration)).to.equal(JSON.stringify({
        "databases": {
          "test": {
            "type": "indexedDB",
            "tables": [
              {
                "config": {
                  "databaseName": "test",
                  "name": "MockModel",
                  "id": {
                    "keyPath": "id",
                    "autoIncrement": true,
                    "type": 1
                  },
                  "attributes": {},
                  "fields": [],
                  "fieldTypes": {}
                }
              }
            ],
            "databaseName": "test",
            "version": 1
          }
        }
      }));
    });
  });

});

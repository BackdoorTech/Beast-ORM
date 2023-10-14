import { Model } from '../../../../Presentation/Api';
import { schemaGenerator } from '../../../modelManager/schemaGenerator/schemaGenerator'
describe('SchemaGenerator', () => {
  // Test the read method
  describe('generate', () => {
    it('should return model information when provided with a model class', () => {

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
        "databaseName":"test",
        "type":"indexedDB",
        "version":1,
        "table":[
          {
            "databaseName":"test",
            "name":"MockModel",
            "id":
              {
                "keyPath":"id",
                "autoIncrement":true,
                "type":1
              },
              "attributes":{},
              "fields":[],
              "fieldTypes":{}
            }
          ]
      }));
    });
  });

});

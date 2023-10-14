// @ts-nocheck

import { ModelReader } from '../../../modelManager/schemaGenerator/ModelReader.js'
import { CharField } from "../../../../Presentation/Model/definitions.js"
describe('ModelReader', () => {
  // Test the read method
  describe('read', () => {
    it('should return model information when provided with a model class', () => {
      class MockModel {
        // Define your mock model here
      }

      const result = ModelReader.read(MockModel);

      // Assert the expected output based on your mock model
      expect(JSON.stringify(result)).to.equal(JSON.stringify({
        modelName: '',
        fields: {},
        fieldTypes: {},
        attributes: {},
        fieldNames: [],
      }));
    });
  });



  describe('read with CharField', () => {
    it('should return model information when provided with a model class', () => {
      class MockModel {

        name = CharField({})
      }

      const result = ModelReader.read(MockModel);

      // Assert the expected output based on your mock model
      expect(JSON.stringify(result)).to.equal('{"modelName":"","fields":{"name":{"fieldName":"CharField","type":5}},"fieldTypes":{"CharField":["name"]},"attributes":{"fieldName":["name"],"type":["name"]},"fieldNames":["name"]}');
    });
  });



  describe('processField', () => {
    it('data state', () => {
      class MockModel {

        name = CharField({})
      }

      const classInstance = new MockModel();
      const data = {
        modelName: '',
        fields: {},
        fieldTypes: {},
        attributes: {},
        fieldNames: [],
      }

      for (const [fieldName, Field] of Object.entries(classInstance)) {
        ModelReader.processField(classInstance, fieldName, Field, data.fieldTypes, data.attributes, data.fieldNames, data.fields);
      }

      // Assert the expected output based on your mock model
      expect(JSON.stringify(data)).to.equal( '{"modelName":"","fields":{"name":{"fieldName":"CharField","type":5}},"fieldTypes":{"CharField":["name"]},"attributes":{"fieldName":["name"],"type":["name"]},"fieldNames":["name"]}');
    });
  });


});

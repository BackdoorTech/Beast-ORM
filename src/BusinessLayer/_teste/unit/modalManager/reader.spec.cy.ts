// @ts-nocheck
import { ModelReader } from "../../../modelManager/schemaGenerator/ModelReader";

describe('ModelReader', () => {
  // Test the read method
    it('should return model information when provided with a model class', () => {
      class MockModel {
        // Define your mock model here
      }

      const result = ModelReader.read(MockModel);

      // Assert the expected output based on your mock model
      expect(JSON.stringify(result)).to.deep.equal(JSON.stringify({
        modelName: 'MockModel',
        fields: {},
        fieldTypes: {},
        attributes: {},
        fieldNames: [],
      }));
    });
});




describe('read with CharField', () => {
  it('should return model information when provided with a model class', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then((wind ) => {

      class MockModel extends wind.models.Model {

        username = wind.models.CharField({});
      }

      const result = ModelReader.read(MockModel);

      // Assert the expected output based on your mock model
      expect(Object.assign({}, result)).to.deep.equal({
        "modelName": "MockModel",
        "fields": {
          "username": {
            "fieldName": "CharField",
            "type": 5,
            "blank": false
          }
        },
        "fieldTypes": {
          "CharField": [
            "username"
          ]
        },
        "attributes": {
          "fieldName": [
            "username"
          ],
          "type": [
            "username"
          ],
          "blank": [
            "username"
          ]
        },
        "fieldNames": [
          "username"
        ]
      });

    });

  });
});



describe('processField', () => {
  it('data state', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then((wind ) => {

      class MockModel extends wind.models.Model {

        name = wind.models.CharField({});
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
      expect(Object.assign({}, data)).to.deep.equal( {
        "modelName": "",
        "fields": {
          "name": {
            "fieldName": "CharField",
            "type": 5,
            "blank": false
          }
        },
        "fieldTypes": {
          "CharField": [
            "name"
          ]
        },
        "attributes": {
          "fieldName": [
            "name"
          ],
          "type": [
            "name"
          ],
          "blank": [
            "name"
          ]
        },
        "fieldNames": [
          "name"
        ]
      });


    });
  });
});

import { Model } from '../../../Presentation/Api';
import { ORM } from '../../beastOrm'

describe('beastOrm', () => {
  // Test the read method
  describe('read', () => {
    it('should return model information when provided with a model class', () => {


      cy.visit('./index.html')
      cy.window().should("have.property", "models");

      cy.window().then((wind ) => {

        class MockModel extends Model {
          // Define your mock model here
        }


        ORM.register({
          databaseName: 'test',
          type: 'indexedDB',
          version: 1,
          models: [MockModel]
        })

        Cypress.log({
          name: 'setSessionStorage',
          // shorter name for the Command Log
          displayName: 'setSS',
          message: `123`
        })

      });




    });
  });



});

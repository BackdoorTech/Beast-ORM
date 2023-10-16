// @ts-nocheck

import { Model } from '../../../Presentation/Api.js';
import { ORM } from '../../beastOrm.js'

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

        const requestDb = indexedDB.open("Migrations", 2);

        // on Open database
        requestDb.onsuccess = () => {
          const db = requestDb.result

          // create transaction
          const txInstance =  db.transaction(["database"], "readwrite")
          // create object store
          const objectStore = txInstance.objectStore("database")
          const request = objectStore.getAll()

          request.onsuccess = () => {
            // cy.log('Logged Result', request.result); // Capture the value
            cy.get("h1").then(($resultElement) => {
              $resultElement.text(JSON.stringify(request.result));
            });

          };

          request.onerror = (error) => {
            console.log(error);
          };
        };

      });

      // Add assertions on the logged value
      // cy.get('.command-log .message')
      // .should('contain', 'Logged Result')
      // .invoke('text')
      // .should('contain', 'YOUR_EXPECTED_RESULT'); // Replace with your expected result

    });
  });



});

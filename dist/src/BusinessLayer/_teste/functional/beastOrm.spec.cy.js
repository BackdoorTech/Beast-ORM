// @ts-nocheck
import { Model } from '../../../Presentation/Api.js';
import { ORM } from '../../beastOrm.js';
describe('beastOrm', () => {
    // Test the read method
    describe('read', () => {
        it('should return model information when provided with a model class', () => {
            cy.visit('./index.html');
            cy.window().should("have.property", "models");
            cy.window().then((wind) => {
                class MockModel extends Model {
                }
                ORM.register({
                    databaseName: 'test',
                    type: 'indexedDB',
                    version: 1,
                    models: [MockModel]
                });
                Cypress.log({
                    name: 'setSessionStorage',
                    // shorter name for the Command Log
                    displayName: 'setSS',
                    message: `123`
                });
            });
        });
    });
});

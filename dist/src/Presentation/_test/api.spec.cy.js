// @ts-nocheck
describe('Model', () => {
    it('passes', () => {
        cy.visit('./index.html');
        cy.window().should("have.property", "models");
        cy.window().then((wind) => {
            class Mode1 extends wind.models.Model {
                constructor() {
                    super(...arguments);
                    this.username = wind.models.CharField({});
                }
            }
            wind.models.register({
                databaseName: "jest-1",
                type: "localStorage",
                version: 1,
                models: [Mode1],
            });
        });
        cy.get("h1").should('have.text', "Example");
        expect(0).to.equal(0); // test fails
    });
    it('passes insert', () => {
        cy.visit('./index.html');
        cy.window().should("have.property", "models");
        cy.window().then(async (wind) => {
            class Person extends wind.models.Model {
                constructor() {
                    super(...arguments);
                    this.username = wind.models.CharField({});
                }
            }
            wind.models.register({
                databaseName: "jest-2",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            const result = await Person.create({ username: 'Peter' });
            console.log(result);
            Cypress.log({
                name: 'setSessionStorage',
                // shorter name for the Command Log
                displayName: 'data',
                message: result
            });
        });
        cy.get("h1").should('have.text', "Example");
        expect(0).to.equal(0); // test fails
    });
});

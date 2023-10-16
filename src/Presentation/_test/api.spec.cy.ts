// @ts-nocheck
describe('Model', () => {
  it('passes', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then((wind ) => {

      class Person extends wind.models.Model {
        static username = "";
      }

      wind.models.register({
        databaseName: "jest-test123",
        type: "localStorage",
        version: 1,
        models: [Person],
      });
    });

    cy.get("h1").should('have.text',"Example")


    expect(0).to.equal(0) // test fails
  })


})

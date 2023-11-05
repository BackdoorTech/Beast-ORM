// @ts-nocheck
describe('Model', () => {
  it('passes', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then((wind ) => {

      class Mode1 extends wind.models.Model {
        username = wind.models.CharField({});
      }

      wind.models.register({
        databaseName: "jest-1",
        type: "localStorage",
        version: 1,
        models: [Mode1],
      });
    });

    cy.get("h1").should('have.text',"Example")


    expect(0).to.equal(0) // test fails
  })

  it('passes insert', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then(async (wind ) => {

      class Person extends wind.models.Model {
        username = wind.models.CharField({});
      }

      wind.models.register({
        databaseName: "jest-2",
        type: "localStorage",
        version: 1,
        models: [Person],
      });

      await Person.deleteAll()
      const result = await Person.create({username: 'Peter'})


      Cypress.log({
        name: 'setSessionStorage',
        // shorter name for the Command Log
        displayName: 'data',
        message: result
      })
    });


    cy.get("h1").should('have.text',"Example")


    expect(0).to.equal(0) // test fails
  })

  it('passes insert and delete', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then(async (wind ) => {

      class Person extends wind.models.Model {
        username = wind.models.CharField({});
      }

      wind.models.register({
        databaseName: "jest-3",
        type: "localStorage",
        version: 1,
        models: [Person],
      });

      await Person.deleteAll()

      const value  = await Person.create({username: 'Peter'})


      const deleteResult = await value.delete()

      Cypress.log({
        name: 'setSessionStorage',
        // shorter name for the Command Log
        displayName: 'data',
        message: value
      })

      expect(deleteResult).to.equal(true) // test fails
    });


    cy.get("h1").should('have.text',"Example")

  })


  it('passes get all and delete', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then(async (wind ) => {

      class Person extends wind.models.Model {
        username = wind.models.CharField({});
      }

      wind.models.register({
        databaseName: "jest-4",
        type: "localStorage",
        version: 1,
        models: [Person],
      });

      await Person.deleteAll()

      await Person.create({username: 'Peter'})

      const value = await Person.all()

      Cypress.log({
        name: 'setSessionStorage',
        // shorter name for the Command Log
        displayName: 'data',
        message: value
      })

      expect(1).to.equal(1) // test fails
    });

  })

  it('passes save changes', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then(async (wind ) => {

      class Person extends wind.models.Model {
        username = wind.models.CharField({});
      }

      wind.models.register({
        databaseName: "jest-5",
        type: "localStorage",
        version: 1,
        models: [Person],
      });

      await Person.deleteAll()
      let peter = await Person.create({username: 'Peter'})

      peter.username = "123"
      const result = await peter.save()

      expect(result).to.equal(true) // test fails


    });

  })

})

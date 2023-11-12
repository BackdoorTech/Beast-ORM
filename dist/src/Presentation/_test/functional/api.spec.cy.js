// @ts-nocheck
describe('API', () => {
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
            await Person.deleteAll();
            const result = await Person.create({ username: 'Peter' });
            expect(Object.assign({}, result)).to.deep.equal({ username: 'Peter', id: result.id }); // test fails
        });
    });
    it('passes insert and delete', () => {
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
                databaseName: "jest-3",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            const createdPerson = await Person.create({ username: 'Peter' });
            const deleteResult = await createdPerson.delete();
            const all = await Person.all();
            expect(all.length).to.equal(0); // test fails
        });
    });
    it('passes get all and delete', () => {
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
                databaseName: "jest-4",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            const all = await Person.all();
            expect(all.length).to.equal(3); // test fails
        });
    });
    it('passes save changes', () => {
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
                databaseName: "jest-5",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            let createdPerson = await Person.create({ username: 'Peter' });
            createdPerson.username = "123";
            const result = await createdPerson.save();
            const all = await Person.all();
            expect(result).to.equal(true); // test fails
            expect(all).to.deep.equal([{ username: '123', id: all[0].id }]); // test fails
        });
    });
    it('passes delete all', () => {
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
                databaseName: "jest-5",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.deleteAll();
            const all = await Person.all();
            expect(0).to.deep.equal(all.length); // test fails
        });
    });
    it('passes costume id field increment', () => {
        cy.visit('./index.html');
        cy.window().should("have.property", "models");
        cy.window().then(async (wind) => {
            class Person extends wind.models.Model {
                constructor() {
                    super(...arguments);
                    this.userId = wind.models.AutoField({ primaryKey: true });
                    this.username = wind.models.CharField({ maxLength: 100 });
                    this.email = wind.models.CharField({ blank: true, maxLength: 100 });
                    this.age = wind.models.IntegerField({ blank: true });
                }
            }
            wind.models.register({
                databaseName: "jest-6",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            const createdPerson = await Person.create({ username: 'kobe', email: 'kobe.bryant@lakers.com' });
            const all = await Person.all();
            expect(Object.assign({}, all[0])).to.deep.equal({ username: 'kobe', email: 'kobe.bryant@lakers.com', age: null, userId: createdPerson.userId });
            expect(Object.assign({}, createdPerson)).to.deep.equal({ username: 'kobe', email: 'kobe.bryant@lakers.com', age: null, userId: createdPerson.userId });
        });
    });
    it('passes get()', () => {
        cy.visit('./index.html');
        cy.window().should("have.property", "models");
        cy.window().then(async (wind) => {
            class Person extends wind.models.Model {
                constructor() {
                    super(...arguments);
                    this.userId = wind.models.AutoField({ primaryKey: true });
                    this.username = wind.models.CharField({ maxLength: 100 });
                    this.email = wind.models.CharField({ blank: true, maxLength: 100 });
                    this.age = wind.models.IntegerField({ blank: true });
                }
            }
            wind.models.register({
                databaseName: "jest-7",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            const createdPerson = await Person.create({ username: 'kobe', email: 'kobe.bryant@lakers.com' });
            const person = await Person.get({ userId: createdPerson.userId });
            expect(Object.assign({}, person)).to.deep.equal(Object.assign({}, createdPerson));
        });
    });
    it('passes filter.update should update all', () => {
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
                databaseName: "jest-8",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.filter({ username: "Peter" }).update({ username: "michael jackson" });
            const jackson = await Person.filter({ username: "michael jackson" }).execute();
            expect(jackson.length).to.equal(9); // test fails
        });
    });
    it('passes filter.delete ', () => {
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
                databaseName: "jest-9",
                type: "localStorage",
                version: 1,
                models: [Person],
            });
            await Person.deleteAll();
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.create({ username: 'Peter' });
            await Person.filter({ username: "Peter" }).delete();
            const all = await Person.all();
            expect(all.length).to.equal(0); // test fails
        });
    });
});

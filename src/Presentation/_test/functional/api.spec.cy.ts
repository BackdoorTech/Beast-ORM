// @ts-nocheck
describe('API', () => {
    // it('passes', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then((wind ) => {

    //     class Mode1 extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-1",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Mode1],
    //     });
    //   });

    //   cy.get("h1").should('have.text',"Example")


    //   expect(0).to.equal(0) // test fails
    // })

    // it('passes insert', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-2",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()
    //     const result = await Person.create({username: 'Peter'})

    //     expect(Object.assign({},result)).to.deep.equal({username: 'Peter', id: result.id}) // test fails

    //   });

    // })

    // it('passes insert and delete', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-3",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     const createdPerson  = await Person.create({username: 'Peter'})
    //     const deleteResult = await createdPerson.delete()
    //     const all = await Person.all()

    //     expect(all.length).to.equal(0) // test fails
    //   });


    // })

    // it('passes get all and delete', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-4",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})

    //     const all = await Person.all()

    //     expect(all.length).to.equal(3) // test fails
    //   });

    // })

    // it('passes save changes', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-5",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()
    //     let createdPerson = await Person.create({username: 'Peter'})

    //     createdPerson.username = "123"
    //     const result = await createdPerson.save()
    //     const all = await Person.all()

    //     expect(result).to.equal(true) // test fails
    //     expect([Object.assign({}, all[0])]).to.deep.equal([{ username: '123', id: all[0].id }]) // test fails


    //   });

    // })


    // it('passes delete all', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-5",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });


    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})

    //     await Person.deleteAll()

    //     const all = await Person.all()

    //     expect(0).to.deep.equal(all.length) // test fails

    //   });

    // })


    // it('passes costume id field increment', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       userId = wind.models.AutoField({primaryKey:true})
    //       username = wind.models.CharField({maxLength: 100})
    //       email = wind.models.CharField({blank: true, maxLength: 100})
    //       age = wind.models.IntegerField({blank: true})
    //     }

    //     wind.models.register({
    //       databaseName: "jest-6",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     const a = await Person.deleteAll()

    //     const createdPerson = await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})

    //     const all = await Person.all()

    //     expect(Object.assign({}, all[0])).to.deep.equal({username: 'kobe', email: 'kobe.bryant@lakers.com', age: undefined, userId: createdPerson.userId})
    //     expect(Object.assign({}, createdPerson)).to.deep.equal({username: 'kobe', email: 'kobe.bryant@lakers.com', age: null, userId: createdPerson.userId})

    //   });

    // })



    // it('passes get()', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       userId = wind.models.AutoField({primaryKey:true})
    //       username = wind.models.CharField({maxLength: 100})
    //       email = wind.models.CharField({blank: true, maxLength: 100})
    //       age = wind.models.IntegerField({blank: true})
    //     }

    //     wind.models.register({
    //       databaseName: "jest-7",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     const createdPerson = await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})

    //     const person = await Person.get({userId: createdPerson.userId})

    //     delete createdPerson.age
    //     delete person.age

    //     expect(person).to.deep.equal(createdPerson)

    //   });

    // })


    // it('passes filter.update should update all', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-8",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})

    //     await Person.filter({username:"Peter"}).update({username:"michael jackson"})

    //     const jackson = await Person.filter({username:"michael jackson"}).execute()
    //     expect(jackson.length).to.equal(9) // test fails
    //   });

    // })


    // it('passes filter.delete ', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       username = wind.models.CharField({});
    //     }

    //     wind.models.register({
    //       databaseName: "jest-9",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})
    //     await Person.create({username: 'Peter'})

    //     await Person.filter({username:"Peter"}).delete()

    //     const all = await Person.all()

    //     expect(all.length).to.equal(0) // test fails
    //   });

    // })




    // it('one-to-one relationships ', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     const models = wind.models
    //     class Place extends wind.models.Model {
    //       name = wind.models.CharField({maxLength: 50})
    //       address = wind.models.CharField({maxLength: 50})
    //     }

    //     class Restaurant extends wind.models.Model  {
    //       place = wind.models.OneToOneField({model:Place})
    //       servesHotDogs = wind.models.BooleanField({default: false})
    //       servesPizza = wind.models.BooleanField({default: false})
    //     }


    //     wind.models.register({
    //       databaseName:'jest-test-10',
    //       type: 'indexedDB',
    //       version: 1,
    //       models: [Place, Restaurant]
    //     })

    //     await Place.deleteAll()
    //     await Restaurant.deleteAll()

    //     const p1 = await Place.create({name:'Demon Dogs', address:'944 W. Fullerton'})
    //     const r = await Restaurant.create({place:p1, servesHotDogs: false, servesPizza:false})

    //     const object = await r.place.get()


    //     expect(p1).to.deep.equal(r.place)
    //     expect(true).to.deep.equal(object)
    //   });
    // })



    // it('one-to-many relationships ', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     const models = wind.models
    //     class Reporter extends wind.models.Model {
    //       firstName = wind.models.CharField({maxLength:30})
    //       lastName = wind.models.CharField({maxLength:30})
    //       email = wind.models.CharField()
    //       articles= wind.models.getter.ForeignKeyGetter({model: Article, I: this})
    //     }
    //     class Article extends wind.models.Model  {
    //       headline = wind.models.CharField({maxLength:100})
    //       pubDate = wind.models.DateField()
    //       reporter = wind.models.ForeignKey({model:Reporter})
    //     }

    //     wind.models.register({
    //       databaseName:'jest-test-11',
    //       type: 'indexedDB',
    //       version: 1,
    //       models: [Reporter, Article]
    //     })

    //     await Reporter.deleteAll()
    //     await Article.deleteAll()

    //     const r = await Reporter.create({firstName:"John", lastName:"Smith", email:"john@example.com"})
    //     const a = await Article.create({headline:"This is a test", pubDate:"date(2005, 7, 27)", reporter:r})
    //     const object = await a.reporter.get()

    //     expect(r.firstName).to.deep.equal(a.reporter.firstName)
    //     expect(true).to.deep.equal(object)

    //     const a1 = await r.articles().add({headline:"peter", pubDate:"dias", email:"john@example.com"})

    //     expect(r.firstName).to.deep.equal(a1.reporter.firstName)

    //   });
    // })


    // it('many-to-many relationships ', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Publication extends wind.models.Model {
    //       title = wind.models.CharField({maxLength:30})
    //       articles = wind.models.getter.ManyToManyGetter({model: Article, I: this})
    //     }
    //     class Article extends wind.models.Model  {
    //       headline = wind.models.CharField({maxLength:100})
    //       pubDate = wind.models.DateField()
    //       publications = wind.models.ManyToManyField({model:Publication, I: this})
    //     }

    //     wind.models.register({
    //       databaseName:'jest-test-12',
    //       type: 'indexedDB',
    //       version: 1,
    //       models: [Publication, Article]
    //     })

    //     await Publication.deleteAll()
    //     await Article.deleteAll()

    //     const r = await Publication.create({title:"John"})
    //     const r1 = await Publication.create({title:"John"})
    //     const a1 = await Article.create({headline:"This is a test", pubDate:"date(2005, 7, 27)"})

    //     await a1.publications.add(r)
    //     await a1.publications.add(r)
    //     await a1.publications.add(r1)

    //     const result = await a1.publications.all()
    //     expect(true).to.equal(result)

    //     expect(JSON.stringify([r,r,r1])).to.deep.equal(JSON.stringify(a1.publications.list))

    //     const result1 = await r.articles().all()
    //     expect(true).to.equal(result1)
    //     expect(JSON.stringify([a1, a1])).to.deep.equal(JSON.stringify(await Promise.all(r.articles().list.map( async (e) => {
    //       await e.publications.all()
    //       return e
    //     }))))

    //     await r.articles().add(a1)
    //     const result3 = await r.articles().all()
    //     expect(true).to.equal(result3)
    //     expect([a1, a1, a1].length).to.deep.equal(r.articles().list.length)

    //   });
    // })



    // it('trigger on commit', () => {

    //   cy.visit('./index.html')
    //   cy.window().should("have.property", "models");

    //   cy.window().then(async (wind ) => {

    //     class Person extends wind.models.Model {
    //       userId = wind.models.AutoField({primaryKey:true})
    //       username = wind.models.CharField({maxLength: 100})
    //       email = wind.models.CharField({blank: true, maxLength: 100})
    //       age = wind.models.IntegerField({blank: true})
    //     }

    //     wind.models.register({
    //       databaseName: "jest-13",
    //       type: "localStorage",
    //       version: 1,
    //       models: [Person],
    //     });

    //     await Person.deleteAll()

    //     let result = false
    //     Person.transactionOnCommit(() => {
    //       console.log("hello")
    //       result = true
    //     })

    //     await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
    //     await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
    //     await Person.all()


    //     expect(result).to.deep.equal(true)

    //   });

    // })



  // it('trigger on commit disconnect', () => {

  //   cy.visit('./index.html')
  //   cy.window().should("have.property", "models");

  //   cy.window().then(async (wind ) => {

  //     class Person extends wind.models.Model {
  //       userId = wind.models.AutoField({primaryKey:true})
  //       username = wind.models.CharField({maxLength: 100})
  //       email = wind.models.CharField({blank: true, maxLength: 100})
  //       age = wind.models.IntegerField({blank: true})
  //     }

  //     wind.models.register({
  //       databaseName: "jest-14",
  //       type: "localStorage",
  //       version: 1,
  //       models: [Person],
  //     });

  //     await Person.deleteAll()

  //     let result = 0
  //     let subscription = Person.transactionOnCommit(() => {
  //       result++
  //       subscription.disconnect()

  //       console.log({subscription})
  //     })

  //     await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
  //     await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
  //     await Person.all()


  //     expect(1).to.deep.equal(result)

  //   });

  // })


  it('pass reactive list', () => {

    cy.visit('./index.html')
    cy.window().should("have.property", "models");

    cy.window().then(async (wind ) => {

      class Person extends wind.models.Model {
        userId = wind.models.AutoField({primaryKey:true})
        username = wind.models.CharField({maxLength: 100})
        email = wind.models.CharField({blank: true, maxLength: 100})
        age = wind.models.IntegerField({blank: true})
      }

      wind.models.register({
        databaseName: "jest-15",
        type: "localStorage",
        version: 1,
        models: [Person],
      });

      await Person.deleteAll()

      let result = 0
      const reactive = Person.ReactiveList(async (model) => {
        return await model.all()
      })

      await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
      await Person.create({username:'kobe', email:'kobe.bryant@lakers.com'})
      await Person.all()


      expect(2).to.deep.equal(reactive.value.length)

    });

  })
})

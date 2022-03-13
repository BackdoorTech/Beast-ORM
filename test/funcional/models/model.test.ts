import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('register model', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      document.body.innerHTML = JSON.stringify(Person.getDBSchema())
    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"databaseName":"beast-orm","version":1,"stores":[{"name":"Person","id":{"keyPath":"id","autoIncrement":false},"indices":[{"name":"username","keyPath":"username","options":{"unique":false}}]}]}')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



  it('model create object', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      document.body.innerHTML = JSON.stringify({username:james.username, id:james.id})

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"username":"james","id":1}')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model create object', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      document.body.innerHTML = JSON.stringify({username:james.username, id:james.id})

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"username":"james","id":1}')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model save()', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      let getJames = await Person.get({id:james.id})

      getJames.username = "Peter"
      await getJames.save()

      let getJames1 = await Person.get({id:getJames.id})

      document.body.innerHTML = JSON.stringify({username:getJames1.username, id:getJames1.id})

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"username":"Peter","id":1}')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model filter save()', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})

      await Person.filter({username:'Peter'}).update({username:'police'})
      const rows = await Person.filter({username:'police'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"police","id":2},{"username":"police","id":3}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

  it('model delete()', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})

      await Person.filter({username:'Peter'}).update({username:'police'})
      const rows = await Person.filter({username:'police'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"police","id":2},{"username":"police","id":3}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model filter delete()', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})


      await Person.filter({username:'james'}).delete()

      const rows = await Person.filter({username:'james'}).delete()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



  it('model create([{...}])', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      await models.register({
        databaseName:'jest-test-model create([{...}])',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })


      await Person.create([
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'}]
      )


      const rows = await Person.filter({username:'Peter'}).execute()


      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"Peter","id":1},{"username":"Peter","id":2},{"username":"Peter","id":3},{"username":"Peter","id":4},{"username":"Peter","id":5},{"username":"Peter","id":6}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

  it('model autoField', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create([
        {username:'Peter'},
        {username:'Peter'}]
      )

      const rows = await Person.filter({username:'Peter'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"Peter","userId":1},{"username":"Peter","userId":2}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



  it('static update', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const createdUser = await Person.create({username:'Peter'})

      createdUser.username = 'nice'

      await Person.update(createdUser)

      const rows = await Person.filter({username:'nice'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"nice","userId":1}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('all()', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      } 

      await models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const createdUser = await Person.create({username:'Peter'})

      const rows = await Person.all()
      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"nice","userId":1}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

  it('model createOrFind case find', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()
      
      }

      await models.register({
        databaseName:'jest-test-documentation first example',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      const user = await User.create({username:'kobe', email:'kobe.bryant@lakers.com'})
      
      const result = await User.createOrFind(
        {userId:user.userId},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"userId":1,"username":"kobe","email":"kobe.bryant@lakers.com","age":""},false]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



  it('model createOrFind case create', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()
      
      }

      await models.register({
        databaseName:'jest-test-model createOrFind case create',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'jame.mark@lakers.com'})
      
      const result = await User.createOrFind(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"userId":2,"username":"kobe","email":"kobe.bryant@lakers.com","age":""},true]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model updateOrCreate case create', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()
      
      }

      await models.register({
        databaseName:'jest-test-model updateOrCreate case create',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'jame.mark@lakers.com'})
      
      const result = await User.updateOrCreate(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"userId":2,"username":"kobe","email":"kobe.bryant@lakers.com","age":""},true]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('model updateOrCreate case update', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()
      
      }

      await models.register({
        databaseName:'jest-test-model-updateOrCreate-case-update',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'kobe.bryant@lakers.com'})
      
      const result = await User.updateOrCreate(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"userId":1,"username":"kobe","email":"kobe.bryant@lakers.com","age":""}')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

})



describe("operators", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  it('operator contains', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const {ArrayField, JsonField } = models.indexedDB.fields

      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()
        pets = ArrayField({type: models.CharField()})
      
      }

      await models.register({
        databaseName:'jest-test-operator-contains-include',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })


      await User.create({username:'James', email:'', age:'', pets:['ashe','meggie']})

      const user = await User.filter({pets__contains:['ashe']}).execute()

      document.body.innerHTML = JSON.stringify(user)
    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"James","email":"","age":"","pets":["ashe","meggie"],"userId":1}]')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



})
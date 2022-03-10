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

    await page.evaluate(() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      } 

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test-model create([{...}])',
        type: 'indexeddb',
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

      models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
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


})
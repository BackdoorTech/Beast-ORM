import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("reactive", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('all', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username = models.CharField({})  
      } 
      
      models.migrate({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      

      const sub = Person.ReactiveList((model)=> model.all())

      Person.transactionOnCommit( async () => {
        setTimeout(() => {
            document.body.innerHTML = JSON.stringify(sub.value)
        }, 100)
      })

      Person.create({username: 'peter'})

      
    })
    debugger

    
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"peter","id":1}]')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 65000)


  it('reactive list UnSubscribe', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

        const models: typeof modelsType = window['models']
        
        window.document.title = "reactive list UnSubscribe";
        class Person extends models.Model {
          username = models.CharField({})  
        } 
        
        models.migrate({
          databaseName:'',
          type: 'indexedDB',
          version: 1,
          models: [Person]
        })
  
        const sub = Person.ReactiveList((model)=> model.all())
        sub.unsubscribe()

        Person.transactionOnCommit( async () => {    
            setTimeout(() => {
                document.body.innerHTML = JSON.stringify(sub.value)
            }, 100)
        })
  
        Person.create({username: 'peter'})
  

    })
    debugger

    
    // Check to see if text exists on the page
    await page.waitForFunction('[]')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 20000)



})

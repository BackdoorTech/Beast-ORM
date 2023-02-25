import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("LocalStorage", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('register model localStorage', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.LocalStorage {
        static username = ''  
      } 
      
      models.migrate({
        databaseName:'jest-test',
        type: 'localStorage',
        version: 1,
        models: [Person]
      })

      document.body.innerHTML = JSON.stringify(Person.getDBSchema())
    })
    debugger

    
    // Check to see if text exists on the page
    await page.waitForFunction('{"databaseName":"jest-test","version":1,"type":"localStorage","stores":[{"name":"Person","id":{"keyPath":"Person","type":4,"autoIncrement":false},"attributes":{},"fields":[{"name":"username","keyPath":"username","options":{"unique":false,"type":null},"fieldAttributes":{}}],"fieldTypes":{}}]}')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 25000)


  it('localStorage save', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.LocalStorage {
        static username = ''  
        static age = 55
        static $age = 55
      } 

      Person.ignoreAttributes(['$'])
      
      models.migrate({
        databaseName:'jest-test',
        type: 'localStorage',
        version: 1,
        models: [Person]
      })

      Person.username = 'save'
      Person.age = 18
      Person.save()
      document.body.innerHTML = JSON.stringify(Person.getDBSchema())
    })
    debugger

    
    // Check to see if text exists on the page
    await page.waitForFunction('{"databaseName":"jest-test","version":1,"type":"localStorage","stores":[{"name":"Person","id":{"keyPath":"Person","type":4,"autoIncrement":false},"attributes":{},"fields":[{"name":"username","keyPath":"username","options":{"unique":false,"type":null},"fieldAttributes":{}}],"fieldTypes":{}}]}')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 25000)

})

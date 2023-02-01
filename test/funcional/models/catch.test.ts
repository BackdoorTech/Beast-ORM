import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("catch model error", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('model create object', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      
      class Person extends models.Model {
        username =  models.CharField({maxLength:0, unique: true})
      } 

      models.register({
        databaseName:'jest-test',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      try {
        const james1 = await Person.create({username:'james'})
      } catch (error) {
        document.body.innerHTML = JSON.stringify({username:james.username, id:james.id})
      }
      
      
    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('{"username":"james","id":51}')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 600000)



})

import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType, models } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("multiple Request", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  it('Multiple transactions at onces', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {
        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField({blank: true})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      let r1 = User.create({username:'kobe1', email:'kobe.bryant@lakers.com'})
      User.all()
      let r2 = User.create({username:'kobe2', email:'kobe.bryant@lakers.com'})
      User.all()
      let r3 = User.create({username:'kobe3', email:'kobe.bryant@lakers.com'})
      User.all()
      let r4 = User.create({username:'kobe4', email:'kobe.bryant@lakers.com'})
      User.all()
      let r5 = User.create({username:'kobe5', email:'kobe.bryant@lakers.com'})

      await Promise.all([r1, r2, r3, r4, r5])
      document.body.innerHTML = JSON.stringify(await User.all())
      
    
    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"username":"kobe1","email":"kobe.bryant@lakers.com","age":null,"userId":1},{"username":"kobe2","email":"kobe.bryant@lakers.com","age":null,"userId":2},{"username":"kobe3","email":"kobe.bryant@lakers.com","age":null,"userId":3},{"username":"kobe4","email":"kobe.bryant@lakers.com","age":null,"userId":4},{"username":"kobe5","email":"kobe.bryant@lakers.com","age":null,"userId":5}]')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 60000)

})
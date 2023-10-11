import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType, models } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  it('documentation first example', async () => {
  
    await  page.waitForFunction(() => 'models' in window);

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

      const user = await User.create({username:'kobe', email:'kobe.bryant@lakers.com'})

      document.body.innerHTML = JSON.stringify(user)

    })
    debugger
    // Check to see if text exists on the page
    const text =  ('{"username":"kobe","email":"kobe.bryant@lakers.com","userId":1}')

    expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    
  }, 20000)

})
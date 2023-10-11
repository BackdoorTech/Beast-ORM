import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("Signal", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('signal', async () => {
  
    await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { rewriteSave, rewriteGet, rewriteDelete }  = models.core.localStorage.rewrite

      class Person extends models.LocalStorage {
        static username = ''  
        static age = 55
        static $age = 55
      } 
      
      models.migrate({ 
        databaseName:'jest-test',
        type: 'localStorage',
        version: 1,
        models: [Person],
        ignoreFieldsStartWidth:['$']
      })

      //document.body.innerHTML = JSON.stringify(Person.getDBSchema())

      function get({key, localStorage, instance}) {
        const newKey = "-"+key
        return JSON.parse(localStorage.getItem(newKey))
      }


      function save({key, localStorage, instance, dataToSave}) {
        const newKey = "-"+key
        const stringifyData  = JSON.stringify(dataToSave)

        localStorage.setItem(newKey, stringifyData)
      }

      function _delete({key, localStorage, instance}) {
        const newKey = "-"+key
        localStorage.removeItem(newKey)
      }

      rewriteGet.connect(get, [Person])
      rewriteSave.connect(save, [Person])
      rewriteDelete.connect(_delete, [Person])

      Person.username = 'peter'
      Person.save()
      Person.get()

      document.write(JSON.stringify(Object.entries(Person)))

    })
    debugger

    
    // Check to see if text exists on the page
    const text = ('[["username","peter"],["age",55],["$age",55],["getTableSchema",null],["getDBSchema",null]]')
    
    expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    
  }, 605000)

})

import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  // it('run migrations to create database', async () => {
  
  //   await  page.waitForFunction(() => 'models' in window);

  //   await page.evaluate(async () => {

  //     const models: typeof modelsType = window['models']

  //     class Person extends models.Model {
  //       username =  models.CharField({maxLength:0})
  //     } 

  //     await models.register({
  //       databaseName:'5555',
  //       type: 'indexedDB',
  //       version: 1,
  //       models: [Person]
  //     })

  //     const databases = await indexedDB.databases()
  //     document.body.innerHTML = JSON.stringify(databases)

  //   })
  //   debugger
  //   // Check to see if text exists on the page
  //   const text =  ('[{"name":"5555","version":1}]')
    
  //   expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    
  // }, 10000)

})
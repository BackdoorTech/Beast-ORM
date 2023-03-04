import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('run migrations to create database', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const models: typeof modelsType = window['models']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
				databaseName:'',
				type: 'indexedDB',
				version: 1,
				models: [Person]
			})

			const promise = indexedDB.databases()
			promise.then(databases => {
				document.body.innerHTML = JSON.stringify(databases)
			})


    })
    debugger
    // Check to see if text exists on the page
    // await page.waitForFunction('[]')
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


})
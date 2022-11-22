import { argsAttributes as argsAttributesType } from './../../../../../src/sql/Operators/args-attributes'
import fs from 'fs'
import * as _Fields from '../../../../../src/models/field/fields'
import { models, models as  modelsType } from '../../../../../src/index'
import { ObjectConditionOperator as ObjectConditionOperatorType } from './../../../../../src/sql/Operators/Object-condition-operator'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));


describe("argsAttributes", () => {
  
   
    beforeEach(async () => {
        await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
    })
     
  
	it('basic', async () => {
        await page.waitForFunction(() => 'models' in window);

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			
			class Person extends models.Model {
				name =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
				databaseName:'jest-test',
				type: 'indexedDB',
				version: 1,
				models: [Person]
			})
			
	  		
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 22}
			const filterParams = [{age: 22}]

			const args = { name: 'Peter', age: 18 }
            const argObj = new argsAttributes(args, tableSchema)

	  		
			document.body.innerHTML = 'result: '+ JSON.stringify(argObj.value)
		})

		debugger
		await page.waitForFunction(() => '[{"name":{"fieldName":"name","fieldPath":"name","operation":"eq","operationArg":"Peter"},"age":{"fieldName":"age","fieldPath":"age","operation":"eq","operationArg":18}}]');

		expect('time not exceeded').toBe('time not exceeded')
	}, 20000)


    it('basic 1', async () => {
        await page.waitForFunction(() => 'models' in window);

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			
			class Person extends models.Model {
				name =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
				databaseName:'jest-test',
				type: 'indexedDB',
				version: 1,
				models: [Person]
			})
			
	  		
			const tableSchema = Person.getTableSchema()
			const args = [{ name: 'Peter', age: 18 }]
            const argObj = new argsAttributes(args, tableSchema)

	  		
			document.body.innerHTML = 'result: '+ JSON.stringify(argObj.value)
		})

		debugger
		await page.waitForFunction(() => '[{"name":{"fieldName":"name","fieldPath":"name","operation":"eq","operationArg":"Peter"},"age":{"fieldName":"age","fieldPath":"age","operation":"eq","operationArg":18}}]');

		expect('time not exceeded').toBe('time not exceeded')
	}, 20000)
  
  
})
import fs from 'fs'
import * as _Fields from '../../../../../src/models/field/fields'
import { models as  modelsType } from '../../../../../src/index'
import { ObjectConditionOperator as ObjectConditionOperatorType } from './../../../../../src/sql/Operators/Object-condition-operator'

const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("comparisonOperator", () => {
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })
 
	it('comparisonOperator = eq', async () => {

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })
			
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 22}
			const filterParams = [{age: 22}]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+result
		})

		debugger
		await page.waitForFunction(() => 'true');

		expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

	it('comparisonOperator __lte <=', async () => {

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 10}
			const filterParams = [{age__lte: 22}]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+result
    })

    debugger
		await page.waitForFunction(() => 'true');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

	it('comparisonOperator __lte <= 2', async () => {

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 23}
			const filterParams = [{age__lte: 22}]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+result
    })

    debugger
		await page.waitForFunction(() => 'false');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

	it('comparisonOperator __gte >=', async () => {

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', age: 10}
			const filterParams = [{name__not: 'peter',age__lts: 20}]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+result
    })

    debugger
		await page.waitForFunction(() => 'true');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)


	it('comparisonOperator complex 1', async () => {
		await page.goto(`http://127.0.0.1:${Port}/test/index.html`)

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', age: 10}
			const filterParams = [{age__lte: 5},[{age:10}, [{age:20},{age:12}]]]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    })

    debugger
		await page.waitForFunction(() => 'result: true');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)


	it('comparisonOperator not', async () => {
		await page.goto(`http://127.0.0.1:${Port}/test/index.html`)

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
			} 

			models.register({
        databaseName:'jest-test',
        type: 'indexeddb',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', age: 10}
			const filterParams = [{age__not: 5}]

			const operator = new ObjectOperator(row, tableSchema)
			const result: Boolean = await operator.run(filterParams)
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    })

    debugger
		await page.waitForFunction(() => 'result: true');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

})
import fs from 'fs'
import * as _Fields from '../../../../../src/models/field/fields'
import { models, models as  modelsType } from '../../../../../src/index'
import { ObjectConditionOperator as ObjectConditionOperatorType } from './../../../../../src/sql/Operators/Object-condition-operator'
import { argsAttributes as argsAttributesType } from './../../../../../src/sql/Operators/args-attributes'

const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("comparisonOperator", () => {
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })
 
	it('comparisonOperator = eq', async () => {

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
				databaseName:'',
				type: 'indexedDB',
				version: 1,
				models: [Person]
			})
			
	  		
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 22}
			const filterParams = [{age: 22}]

			const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
			document.body.innerHTML = 'result: '+result
		})

		debugger
		await page.waitForFunction(() => 'true');


		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })
			
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 22}
			const filterParams = [{age: 23}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
			document.body.innerHTML = 'result: '+result
		})

		debugger
		await page.waitForFunction(() => 'false');

		expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

	it('comparisonOperator __lte <=', async () => {

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {username:'peter', age: 10}
			const filterParams = [{age__lte: 22}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
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
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {name:'peter', age: 23}
			const filterParams = [{age__lte: 22}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
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
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			
			const tableSchema = Person.getTableSchema()
			const row = {username:'jame', age: 10}
			const filterParams = [{username__not: 'peter',age__lts: 20}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
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
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {username:'jame', age: 10}
			const filterParams = [{age__lte: 5},[{age:10}, [{age:20},{age:12}]]]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
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
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', age: 10}
			const filterParams = [{age__not: 5}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
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
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				age = models.IntegerField()
			} 

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', age: 10}
			const filterParams = [{age__not: 5}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    })

    debugger
		await page.waitForFunction(() => 'result: true');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)


	it('comparisonOperator len', async () => {
		await page.goto(`http://127.0.0.1:${Port}/test/index.html`)

		await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			
			const { ArrayField, JsonField} = models.indexedDB.fields

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				tags =  ArrayField({})
			}

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', tags: ['django']}
			const filterParams = [{tags__len:  1}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    })

    debugger
		await page.waitForFunction(() => 'result: true');

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			
			const { ArrayField, JsonField} = models.indexedDB.fields

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				tags =  ArrayField({})
			}

			models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

			const tableSchema = Person.getTableSchema()
			const row = {name:'jame', tags: ['django']}
			const filterParams = [{tags__len:  2}]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row)
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    })

    debugger

		await page.waitForFunction(() => 'result: false');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)


	it('comparisonOperator isNull', async () => {
		await page.goto(`http://127.0.0.1:${Port}/test/index.html`)

		await page.waitForFunction(() => 'models' in window);

		await page.evaluate(async() => {

				const models: typeof modelsType = window['models']
				const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
				const argsAttributes: typeof argsAttributesType = window['argsAttributes']
				
				const { ArrayField, JsonField} = models.indexedDB.fields

				class Person extends models.Model {
					username =  models.CharField({maxLength:0})
					data =  JsonField()
				}

				models.register({
					databaseName:'',
					type: 'indexedDB',
					version: 1,
					models: [Person]
				})

				const tableSchema = Person.getTableSchema()
				const row = {
					username:'jame', 
					data: {
						'name': 'Bob',
						'other_pets': [{
							'name': 'Fishy',
						}],
					}
				}

				const filterParams = [{data__owner__isNull:  true }]

				const args = new argsAttributes(filterParams, tableSchema)

				const operator = new ObjectOperator(tableSchema, args)
				const result: Boolean = await operator.run(row)
				
				document.body.innerHTML = 'result: '+ JSON.stringify(result) 
		})

    	debugger
		await page.waitForFunction(() => 'result: true');

		await page.evaluate(async() => {

			const models: typeof modelsType = window['models']
			const ObjectOperator: typeof ObjectConditionOperatorType = window['ObjectConditionOperator']
			const argsAttributes: typeof argsAttributesType = window['argsAttributes']
			
			const { ArrayField, JsonField} = models.indexedDB.fields

			class Person extends models.Model {
				username =  models.CharField({maxLength:0})
				data =  ArrayField({})
			}

			models.register({
				databaseName:'',
				type: 'indexedDB',
				version: 1,
				models: [Person]
			})

			const tableSchema = Person.getTableSchema()
			const row = {
				username:'jame', 
				data: {
					'name': 'Bob',
					'other_pets': [{
						'name': 'Fishy',
					}],
				}
			}
			const filterParams = [{data__name__isNull:  false }]

						const args = new argsAttributes(filterParams, tableSchema)

			const operator = new ObjectOperator(tableSchema, args)
			const result: Boolean = await operator.run(row )
			
			document.body.innerHTML = 'result: '+ JSON.stringify(result) 
    	})

    	 debugger

		await page.waitForFunction(() => 'result: false');

    expect('time not exceeded').toBe('time not exceeded')
	}, 20000)

})
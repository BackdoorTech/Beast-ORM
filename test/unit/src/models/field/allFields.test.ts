import * as FieldsType from '../../../../../src/models/field/fields'
import { models as  modelsType } from '../../../../../src/index'


import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("Field valid", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


	// =========================================== CharField
  it('CharField valid blank true', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.CharField({blank:true})
			document.body.innerText = JSON.stringify(f1.valid(''))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.CharField({blank:true})
			document.body.innerText = JSON.stringify(f1.valid('name'))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 5000)


	it('CharField not valid blank false 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.CharField({blank:false})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');

    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



	it('CharField not valid blank false 1', async () => {
		
    await page.waitForFunction(() => 'models' in window);


		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.CharField({blank:false})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(9))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

	// ============================================= TextField
	it('TextField valid blank true 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.TextField({blank:true})
			document.body.innerText = JSON.stringify(f1.valid(''))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.TextField({blank:true})
			document.body.innerText = JSON.stringify(f1.valid('name'))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 5000)


	it('TextField not valid blank false 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.CharField({blank:false})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');

    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


	it('TextField not valid blank false 1', async () => {
		
    await page.waitForFunction(() => 'models' in window);


		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.TextField({blank:false})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(9))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

	// ============================================= IntegerField
	it('IntegerField  true 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.IntegerField({})
			document.body.innerText = JSON.stringify(f1.valid(1))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.IntegerField({})
			document.body.innerText = JSON.stringify(f1.valid(10))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 5000)


	it('IntegerField not valid incorrect type 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.IntegerField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


	it('IntegerField not valid incorrect type 1', async () => {
		
    await page.waitForFunction(() => 'models' in window);


		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.IntegerField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(''))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

	// ============================================= BigIntegerField
	it('BigIntegerField  true 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.BigIntegerField({})
			document.body.innerText = JSON.stringify(f1.valid(1))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.BigIntegerField({})
			document.body.innerText = JSON.stringify(f1.valid(10))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 5000)


	it('BigIntegerField not valid incorrect type 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.BigIntegerField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


	it('BigIntegerField not valid incorrect type 1', async () => {
		
    await page.waitForFunction(() => 'models' in window);


		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.BigIntegerField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(''))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



	// ============================================= DateTimeField
	it('DateTimeField  true 0', async () => {
	
		await page.waitForFunction(() => 'models' in window);

		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.DateTimeField({})
			document.body.innerText = JSON.stringify(f1.valid("01/24/2020 21:30"))

		})
		debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.DateTimeField({})
			document.body.innerText = JSON.stringify(f1.valid(10))

		})
		debugger

		await page.waitForFunction('true');
		
		expect('time not exceeded').toBe('time not exceeded')
		
	}, 5000)


	it('DateTimeField not valid incorrect type 0', async () => {
		
		await page.waitForFunction(() => 'models' in window);

		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.DateTimeField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

		})
		debugger

		await page.waitForFunction('{result:false}');
		
		expect('time not exceeded').toBe('time not exceeded')
		
	}, 10000)


	it('DateTimeField not valid incorrect type 1', async () => {
		
		await page.waitForFunction(() => 'models' in window);


		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.DateTimeField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(0))}}`

		})
		debugger

		await page.waitForFunction('{result:false}');
		
		expect('time not exceeded').toBe('time not exceeded')
		
	}, 10000)


	it('DateTimeField not valid incorrect type 1', async () => {
		
		await page.waitForFunction(() => 'models' in window);

		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const f1 = Field.DateTimeField({})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(0))}}`

		})
		debugger

		await page.waitForFunction('{result:false}');
		
		expect('time not exceeded').toBe('time not exceeded')
		
	}, 10000)


	
	// ============================================= indexedDB.JsonField
	it('indexedDB.JsonField  true 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']

			const { ArrayField, JsonField}  = Field.indexedDB.fields
			
			const f1 = JsonField({})
			document.body.innerText = JSON.stringify(f1.valid({}))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			
			const f1 = JsonField({})
			
			document.body.innerText = JSON.stringify(f1.valid({test:'test'}))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

	it('indexedDB.JsonField not valid incorrect type 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			const f1 = JsonField({})

			document.body.innerText = `{result:${JSON.stringify(f1.valid([]))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 20000)

	it('indexedDB.JsonField not valid incorrect type 1', async () => {
		
    await page.waitForFunction(() => 'models' in window);

		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			const f1 = JsonField({blank:true})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

    })
    debugger

		await page.waitForFunction('{result:true}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


		// ============================================= indexedDB.ArrayField
	it('indexedDB.ArrayField  true 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']

			const { ArrayField, JsonField}  = Field.indexedDB.fields
			
			const f1 = ArrayField({})
			document.body.innerText = JSON.stringify(f1.valid([]))

    })
    debugger

		await page.waitForFunction('true');



		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			
			const f1 = ArrayField({})
			
			document.body.innerText = JSON.stringify(f1.valid(['1']))

    })
    debugger

		await page.waitForFunction('true');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

	it('indexedDB.ArrayField not valid incorrect type 0', async () => {
		
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			const f1 = ArrayField({})

			document.body.innerText = `{result:${JSON.stringify(f1.valid(8))}}`

    })
    debugger

		await page.waitForFunction('{result:false}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 20000)

	it('indexedDB.ArrayField  valid null', async () => {
		
    await page.waitForFunction(() => 'models' in window);

		await page.evaluate(() => {

			const Field: typeof FieldsType = window['Field']
			const { ArrayField, JsonField}  = Field.indexedDB.fields
			const f1 = ArrayField({blank:true})
			document.body.innerText = `{result:${JSON.stringify(f1.valid(null))}}`

		})
		debugger

		await page.waitForFunction('{result:true}');
    
    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)
})
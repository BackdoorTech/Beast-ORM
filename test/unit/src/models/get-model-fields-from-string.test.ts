import {Model as _Model} from '../../../../dist/src/models/model'
import * as _Fields from '../../../../dist/src/models/field/fields'

const port = process.env.PUPPETEER_PORT


describe("Transform", () => {
    beforeAll(async () => {
      await page.goto(`http://127.0.0.1:${port}/test/index.html`)
    })
   
    // it('Transform To object', async () => {

    //   await page.waitForFunction(() => 'Model' in window);

    //   await page.evaluate(() => {
  
    //     const Model: typeof _Model = window['Model']
    //     const { CharField, JsonField }: typeof _Fields = window['Fields']
    //     const FieldsInText = window['FieldsInText']

    //     class Person extends Model {
    //       username = CharField({maxLength: 90})
    //     } 
  
    //     window['Person'] = Person

    //     console.log(window['Person'].toString())
    //     console.log(window['FieldsInText'].getFieldsAndType(window['Person'].toString()))
        
    //   debugger

    //     document.body.innerHTML = JSON.stringify(FieldsInText.getFieldsAndType(window['Person'].toString()))
    //   })

    //   debugger

    //   await page.waitForFunction(() => 'Model123123');

    //   expect(4).toBe(4)
    // }, 20000)

    
    it('Transform To object', async () => {

      await page.waitForFunction(() => 'Model' in window);

      await page.evaluate(() => {
  
        const Model: typeof _Model = window['Model']
        const { CharField, JsonField }: typeof _Fields = window['Fields']
        const FieldsInText = window['FieldsInText']

        class Person extends Model {
          username = CharField({maxLength: 90})
        } 
  
        window['Person'] = Person

        console.log(window['Person'].toString())
        console.log(window['FieldsInText'].getFieldsAndType(window['Person'].toString()))
        
      debugger

        document.body.innerHTML = JSON.stringify(FieldsInText.getFieldsAndType(window['Person'].toString()))
      })

      debugger

      await page.waitForFunction(() => 'Model123123');

      expect(4).toBe(4)
    }, 20000)

  })
    


describe("FieldsInText", () => {
    beforeAll(async () => {
      await page.goto(`http://127.0.0.1:${port}/test/index.html`)
    })
    
    // ===================== code is commented because Private method cant be accesses in the test

    it('textToOneLine', async () => {

      await page.waitForFunction(() => 'Model' in window);

      await page.evaluate(() => {

        const Model: typeof _Model = window['Model']
        const { CharField, JsonField }: typeof _Fields = window['Fields']
        const FieldsInText = window['FieldsInText']

        class Person extends Model {
          username = CharField({maxLength: 90})
        } 

        document.body.innerHTML = FieldsInText.textToOneLine(Person.toString())

      })

      // debugger

      await page.waitForFunction(() => 'class Person extends Model { constructor() { super(...arguments); this.username = CharField({ maxLength: 90 }); } }');

      expect('time not exceeded').toBe('time not exceeded')
    }, 20000)

    
    it('getMatchAllField', async () => {

      await page.waitForFunction(() => 'Model' in window);
  
      await page.evaluate(() => {
  
        const Model: typeof _Model = window['Model']
        const { CharField, JsonField }: typeof _Fields = window['Fields']
        const FieldsInText = window['FieldsInText']
  
        class Person extends Model {
          username = CharField({maxLength: 90})
        } 
  
        const oneLineText = FieldsInText.textToOneLine(Person.toString())
        const matchFields = FieldsInText.getMatchAllField(oneLineText)

        document.body.innerHTML = JSON.stringify(matchFields)
      })
  
      // debugger
  
      await page.waitForFunction(() => '["this.username = CharField({ maxLength: 90 });"]');
  
      expect('time not exceeded').toBe('time not exceeded')
    }, 20000)



    
    it('getDeclarations', async () => {

      await page.waitForFunction(() => 'Model' in window);
  
      await page.evaluate(() => {
  
        const Model: typeof _Model = window['Model']
        const { CharField, JsonField }: typeof _Fields = window['Fields']
        const FieldsInText = window['FieldsInText']
  
        class Person extends Model {
          username = CharField({maxLength: 90})
        } 
  
        const oneLineText = FieldsInText.textToOneLine(Person.toString())
        const matchFields = FieldsInText.getMatchAllField(oneLineText)
        const declaration = FieldsInText.getDeclarations(matchFields)

        document.body.innerHTML = JSON.stringify(declaration)
      })
  
      // debugger
  
      await page.waitForFunction(() => '{"username ":" CharField({ maxLength: 90 })"}');
  
      expect('time not exceeded').toBe('time not exceeded')
    }, 20000)

})
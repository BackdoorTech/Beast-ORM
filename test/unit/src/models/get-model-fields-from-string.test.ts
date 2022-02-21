import {Model as _Model} from '../../../../dist/src/models/model'
import * as _Fields from '../../../../dist/src/models/field/fields'
const port = process.env.PUPPETEER_PORT

describe("src/models/get-model-fields-from-string/FieldsInText.ts", () => {
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

    
    // ===================== code is commented because Private method cant be accesses in the test
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
  
      await page.waitForFunction(() => '["this.username=CharField({ maxLength: 90 });"]');
  
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
          firstName = CharField({maxLength: 90})
        } 
  
        const oneLineText = FieldsInText.textToOneLine(Person.toString())
        const matchFields = FieldsInText.getMatchAllField(oneLineText)

        document.body.innerHTML = JSON.stringify(matchFields)
      })
  
      debugger
  
      await page.waitForFunction(() => '["this.username = CharField({ maxLength: 90 })"," this.firstName = CharField({ maxLength: 90 })"]');
  
      expect('time not exceeded').toBe('time not exceeded')
    }, 20000)



    // ===================== code is commented because Private method cant be accesses in the test
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
  
      debugger
  
      await page.waitForFunction(() => '{sdfsdfsd');
  
      expect('time not exceeded').toBe('time not exceeded')
    }, 40000)


    it('getDeclarations 2 fields', async () => {

      await page.waitForFunction(() => 'Model' in window);
  
      await page.evaluate(() => {
  
        const Model: typeof _Model = window['Model']
        const { CharField, JsonField }: typeof _Fields = window['Fields']
        const FieldsInText = window['FieldsInText']
  
        class Person extends Model {
          username = CharField({maxLength: 90})
          first = CharField({maxLength: 90,minLength:0})
        } 
  
        const oneLineText = FieldsInText.textToOneLine(Person.toString())
        const matchFields = FieldsInText.getMatchAllField(oneLineText)
        const declaration = FieldsInText.getDeclarations(matchFields)

        document.body.innerHTML = JSON.stringify(declaration)
      })
  
      debugger
  
      await page.waitForFunction(() => '{"username":{"maxLength":90},"first":{"maxLength":90,"minLength":0}}');
  
      expect('time not exceeded').toBe('time not exceeded')
    }, 40000)

})
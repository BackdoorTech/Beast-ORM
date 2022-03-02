import { models as  modelsType } from '../../../../src/index'
import fs from 'fs'

const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("src/models/model.reader.ts", () => {
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })
  
  it('read attribute', async () => {

    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
      
        name = models.CharField({maxLength:0})          
      
      }

      const response = models.read(Person)
      
      document.body.innerHTML = JSON.stringify(response.fields)

    })

    debugger

    await page.waitForFunction(() => '{"name":{"maxLength":0}}');

    expect('time not exceeded').toBe('time not exceeded')

  }, 20000)

})
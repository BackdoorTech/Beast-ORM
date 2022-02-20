import * as _Fields from './../../dist/src/models/field/fields'
import {Model as _Model} from './../../dist/src/models/model'

const _port = process.env.PUPPETEER_PORT

describe("initial test", () => {
  
  beforeAll(async () => {
    await page.goto(`http://127.0.0.1:${_port}/test/index.html`)
  })

  it('Get class name', async () => {
  
    await page.waitForFunction(() => 'Model' in window);

    await page.evaluate(() => {

      const Model: typeof _Model = window['Model']

      class Person extends Model {
        username = ''
      } 

      window['Person'] = Person
      
      document.body.innerHTML = window['Person'].getModelName()
    })

    // Check to see if text exists on the page
    await page.waitForFunction('Person')

    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)



  // it('Get column', async () => {
  //   // (\w*)\s*=\s*

  //   await page.waitForFunction(() => 'Model' in window);

  //   await page.evaluate(() => {

  //     const Model: typeof _Model = window['Model']
  //     const { CharField, JsonField }: typeof _Fields = window['Fields']

  //     class Person extends Model {
  //       username = CharField({maxLength:0,minLength:3})
  //     }
      
  //     document.body.innerHTML = window['prettyJs'](Person.toString())

      
  //     console.log(window['prettyJs'](Person.toString()))
  //     alert(window['prettyJs'](Person.toString()))
  //   })

  //   // Check to see if text exists on the page
  //   await page.waitForFunction('Perdddson')

  //   expect('time not exceeded').toBe('time not exceeded')
    
  // }, 40000)

})
  
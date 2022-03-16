import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  it('model relation ship one to one', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Place extends models.Model {
        name = models.CharField({maxLength: 50})
        address = models.CharField({maxLength: 50})
      } 

      class Restaurant extends models.Model  {
        place = models.OneToOneField({model:Place, primaryKey:true})
        servesHotDogs = models.BooleanField({default: false})
        servesPizza = models.BooleanField({default: false})
      }


      await models.register({
        databaseName:'jest-test'+ new Date().getTime(),
        type: 'indexedDB',
        version: 1,
        models: [Place, Restaurant]
      })

      const p1 = await Place.create({name:'Demon Dogs', address:'944 W. Fullerton'})
      const r = await Restaurant.create({place:p1, servesHotDogs: false, servesPizza:false})


      document.body.innerHTML = JSON.stringify(await p1.restaurant())
    })
    
    debugger

    await page.waitForFunction('{"place":1,"servesHotDogs":false,"servesPizza":false}')
    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)


  it('model relation ship many to many', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

        const models: typeof modelsType = window['models']


        class Publication extends models.Model {
          title = models.CharField({maxLength: 50})
        }


        class Article extends models.Model {
            headline = models.CharField({maxLength: 100})
            publications = models.ManyToManyField({model:Publication})
        }

        await models.register({
            databaseName:'jest-test'+ new Date().getTime(),
            type: 'indexedDB',
            version: 1,
            models: [Publication, Article]
        })


        const  p1 = await Publication.create({title:'james'})
        const a1 = await Article.create({headline:''})

        // a1.publicationsAdd(p1)

        document.body.innerHTML = JSON.stringify(await Article.getDBSchema())

    })
    debugger
    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)



  it('model relation ship many to one', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

        const models: typeof modelsType = window['models']

        class Reporter extends models.Model {
            firstName = models.CharField({maxLength: 50})
            lastName = models.CharField({maxLength: 50})
            email = models.CharField()
        }

        class Article extends models.Model {
            headline = models.CharField({maxLength: 50})
            pubDate = models.DateField()
            reporter = models.ForeignKey({model:Reporter})
        }

  
      await models.register({
        databaseName:'jest-test'+ new Date().getTime(),
        type: 'indexedDB',
        version: 1,
        models: [Reporter, Article]
      })

      const r = await Reporter.create({firstName: 'asdfsadf', lastName: 'asdfsd', email:'teste'})
      const a = await Article.create({headline:"This is a test", pubDate:'', reporter:r})


      document.body.innerHTML = JSON.stringify(await r.articleSetAll()) 
    })

    debugger
    await page.waitForFunction('[{"headline":"This is a test","pubDate":"","reporter":1,"id":1}]')

    expect('time not exceeded').toBe('time not exceeded')
  }, 10000)

})


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
        place = models.OneToOneField({model:Place})
        servesHotDogs = models.BooleanField({default: false})
        servesPizza = models.BooleanField({default: false})
      }


      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Place, Restaurant]
      })

      const p1 = await Place.create({name:'Demon Dogs', address:'944 W. Fullerton'})
      const r = await Restaurant.create({place:p1, servesHotDogs: false, servesPizza:false})


      document.body.innerHTML = JSON.stringify(await p1.Restaurant())
    })
    
    debugger

    await page.waitForFunction('{"place":1,"servesHotDogs":false,"servesPizza":false}')
    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)

  it('model relation ship one to one reverse', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Place extends models.Model {
        name = models.CharField({maxLength: 50})
        address = models.CharField({maxLength: 50})
      } 

      class Restaurant extends models.Model  {
        place = models.OneToOneField({model:Place})
        servesHotDogs = models.BooleanField({default: false})
        servesPizza = models.BooleanField({default: false})
      }


      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Place, Restaurant]
      })

      const p1 = await Place.create({name:'Demon Dogs', address:'944 W. Fullerton'})
      const r = await Restaurant.create({place:p1, servesHotDogs: false, servesPizza:false})


      document.body.innerHTML = JSON.stringify(await r.Place())
    })
    
    debugger

    await page.waitForFunction('{"name":"Demon Dogs","address":"944 W. Fullerton","id":1}')
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
            publication = models.ManyToManyField({model:Publication})
        }

        await models.register({
            databaseName:'',
            type: 'indexedDB',
            version: 1,
            models: [Publication, Article]
        })


        const  p1 = await Publication.create({title:'james'})
        const a1 = await Article.create({headline:''})

        a1.publication_add(p1)

        document.body.innerHTML = JSON.stringify(await Article.getDBSchema())

    })
    debugger
    await page.waitForFunction('{"place":1,"servesHotDogs":false,"servesPizza":false}')
    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)


  it('model relation ship many to many documentation', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

        const models: typeof modelsType = window['models']


        class Publication extends models.Model {
          title = models.CharField({maxLength: 50})
        }


        class Article extends models.Model {
            headline = models.CharField({maxLength: 100})
            publication = models.ManyToManyField({model:Publication})
        }

        await models.register({
          databaseName:'',
          type: 'indexedDB',
          version: 1,
          models: [Publication, Article]
        })


        const  p1 = await Publication.create({title:'The Python Journal'})
        const  p2 = await Publication.create({title:'Science News'})
        const  p3 = await Publication.create({title:'Science Weekly'})


        const a1 = await Article.create({headline:'lets you build web apps easily'})
        const a2 = await Article.create({headline:'NASA uses Python'})

        await a1.publication_add([p1, p2])


        const result = await a1.publication_all()

        document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    await page.waitForFunction('[{"title":"The Python Journal","id":1},{"title":"Science News","id":2}]')
    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)

  it('model relation ship many to many documentation set_all', async () => {
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

        const models: typeof modelsType = window['models']


        class Publication extends models.Model {
          title = models.CharField({maxLength: 50})
        }


        class Article extends models.Model {
          headline = models.CharField({maxLength: 100})
          publication = models.ManyToManyField({model:Publication})
        }

        await models.register({
          databaseName:'',
          type: 'indexedDB',
          version: 1,
          models: [Publication, Article]
        })


        const  p1 = await Publication.create({title:'The Python Journal'})
        const  p2 = await Publication.create({title:'Science News'})
        const  p3 = await Publication.create({title:'Science Weekly'})


        const a1 = await Article.create({headline:'lets you build web apps easily'})
        const a2 = await Article.create({headline:'NASA uses Python'})

        await a1.publication_add([p1, p2])


        const result = await p1.article_set_all()

        document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    await page.waitForFunction('[{"headline":"lets you build web apps easily","id":1}]')
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
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Reporter, Article]
      })

      const r1 = await Reporter.create({firstName: 'asdfsadf', lastName: 'asdfsd', email:'teste'})
      const r2 = await Reporter.create({firstName: 'Peter', lastName: 'Maquiran', email:'teste'})
      const a = await Article.create({headline:"This is a test", pubDate:'', reporter:r1})

      document.body.innerHTML = JSON.stringify(await r1.article_setAll()) 
    })

    debugger
    await page.waitForFunction('[{"headline":"This is a test","pubDate":"","reporter":1,"id":1}]')

    expect('time not exceeded').toBe('time not exceeded')
  }, 90000)

})


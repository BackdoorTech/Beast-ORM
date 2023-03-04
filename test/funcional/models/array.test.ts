import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
import { uniqueGenerator } from '../../../src/utils'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("ArryField", () => {
  
  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('documentation 1', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const {ArrayField, JsonField } = models.indexedDB.fields

      class ChessBoardUser extends models.Model {
        board = ArrayField({
          field: ArrayField({
            field: models.CharField({maxLength:10, blank:true}),
            size:8,
          }),
          size:8,
        })
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [ChessBoardUser]
      })
      
      await ChessBoardUser.create({
        board: [
          ['01','02','03','04','05','06','07','08'],
          ['21','22','23','24','25','26','27','28'],
          ['31','32','33','34','35','36','37','38'],
          ['41','42','43','44','45','46','47','48'],
          ['51','52','53','54','55','56','57','58'],
          ['61','62','63','64','65','66','67','68'],
          ['71','72','73','74','75','76','77','78'],
          ['81','82','83','84','85','86','87','88'],
        ]
      })

      const result6 = await ChessBoardUser.all()

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result6)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"Archie","data":{},"id":2}]')


    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__contains:['django', 'thoughts']}).execute()
      //  [<Dog: Max>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1}]')


    expect('time not exceeded').toBe('time not exceeded')


    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__contains:['thoughts']}).execute()
      //  [<Dog: Max>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1},{"name":"Second post","tags":["thoughts"],"id":2}]')


    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

  it('contain_by', async () => {
  
    await page.waitForFunction(() => 'models' in window);



    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__contained_by:['thoughts', 'django']}).execute()
     // <Post: First post>, <Post: Second post>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1}]')


    expect('time not exceeded').toBe('time not exceeded')


    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__contained_by:['thoughts', 'django', 'tutorial']}).execute()
      // [<Post: First post>, <Post: Second post>, <Post: Third post>]
      

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1},{"name":"Second post","tags":["thoughts"],"id":2},{"name":"Third post","tags":["tutorial","django"],"id":3}]')


    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)

  it('overlap', async () => {
  
    await page.waitForFunction(() => 'models' in window);



    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__overlap:['thoughts']}).execute()
     // <Post: First post>, <Post: Second post>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1}]')


    expect('time not exceeded').toBe('time not exceeded')


    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      
      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})
      await Post.create({name:'Third post', tags:['tutorial', 'django']})

      const result5 = await Post.filter({tags__overlap:['thoughts', 'tutorial']}).execute()
      

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
    debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"First post","tags":["thoughts","django"],"id":1},{"name":"Second post","tags":["thoughts"],"id":2},{"name":"Third post","tags":["tutorial","django"],"id":3}]')


    expect('time not exceeded').toBe('time not exceeded')
    
  }, 10000)


  it('len', async () => {
  
    await page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField } = models.indexedDB.fields

      class Post extends models.Model {
        name = models.CharField({maxLength:200})
        tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
      }
      
      await models.register({
        databaseName:'',
        type: 'indexedDB',		
        version: 1,
        models: [Post]
      })
      document.body.innerHTML = ""
      

      await Post.create({name:'First post', tags:['thoughts', 'django']})
      await Post.create({name:'Second post', tags:['thoughts']})

      

      const result5 = await await Post.filter({tags__len:1}).execute()
     // [<Post: Second post>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result5)}</span>`,
      );


    })
  debugger
    // Check to see if text exists on the page
    await page.waitForFunction('[{"name":"Second post","tags":["thoughts"],"id":2}]')


    expect('time not exceeded').toBe('time not exceeded')

  }, 10000)


})
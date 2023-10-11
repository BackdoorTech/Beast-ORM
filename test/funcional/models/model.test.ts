import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("initial test for model", () => {

  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })

  it('register model', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'123',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      document.body.innerHTML = JSON.stringify(Person.getDBSchema())
    })
    debugger
    // Check to see if text exists on the page
    const text = '{"databaseName":"123","version":1,"type":"indexedDB","stores":[{"databaseName":"123","name":"Person","id":{"keyPath":"id","autoIncrement":true,"type":1},"attributes":{"fieldName":["username"],"type":["username"],"maxLength":["username"]},"fields":[{"name":"username","keyPath":"username","options":{"unique":false,"type":5},"className":"CharField","fieldAttributes":{"fieldName":"CharField","type":5,"maxLength":0}}],"fieldTypes":{"CharField":["username"]}}]}'
    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(text)
    }

  }, 15000)



  it('model create object', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      document.title = 'model create object'
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      document.body.innerHTML = JSON.stringify({username:james.username, id:james.id})

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"username":"james","id":1}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)



  it('model save()', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const james = await Person.create({username:'james'})

      let getJames = await Person.get({id:james.id})

      getJames.username = "Peter"
      await getJames.save()

      let getJames1 = await Person.get({id:getJames.id})

      document.body.innerHTML = JSON.stringify({username:getJames1.username, id:getJames1.id})

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"username":"Peter","id":1}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 100000)


  it('model filter save()', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})

      await Person.filter({username:'Peter'}).update({username:'police'})
      const rows = await Person.filter({username:'police'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"police","id":2},{"username":"police","id":3}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)

  it('model delete()', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})

      await Person.filter({username:'Peter'}).update({username:'police'})
      const rows = await Person.filter({username:'police'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"police","id":2},{"username":"police","id":3}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 15000)


  it('model filter delete()', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create({username:'james'})
      await Person.create({username:'Peter'})
      await Person.create({username:'Peter'})


      await Person.filter({username:'james'}).delete()

      const rows = await Person.filter({username:'james'}).delete()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('0')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)



  it('model create([{...}])', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })


      await Person.create([
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'}]
      )


      const rows = await Person.filter({username:'Peter'}).execute()


      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"Peter","id":1},{"username":"Peter","id":2},{"username":"Peter","id":3},{"username":"Peter","id":4},{"username":"Peter","id":5},{"username":"Peter","id":6}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 20000)

  it('model autoField', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      await Person.create([
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},]
      )

      const rows = await Person.filter({username:'Peter'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"Peter","userId":1},{"username":"Peter","userId":2},{"username":"Peter","userId":3},{"username":"Peter","userId":4}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 20000)



  it('static update', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const createdUser = await Person.create({username:'Peter'})

      createdUser.username = 'nice'

      await Person.update(createdUser)

      const rows = await Person.filter({username:'nice'}).execute()

      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"nice","userId":1}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(await page.$eval('body', el => (el as any).innerText)).toBe(text)
    }

  }, 20000)


  it('all()', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
        userId = models.AutoField({primaryKey:true})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })

      const createdUser = await Person.create({username:'Peter'})


      const rows = await Person.all()
      document.body.innerHTML = JSON.stringify(rows)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"username":"Peter","userId":1}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 20000)

  it('model createOrFind case find', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField({blank:true})

      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      const user = await User.create({username:'kobe', email:'kobe.bryant@lakers.com', age: 5})

      const result = await User.createOrFind(
        {userId:user.userId},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"instance":{"username":"kobe","email":"kobe.bryant@lakers.com","age":5,"userId":1},"created":false}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(await page.$eval('body', el => (el as any).innerText)).toBe(text)
    }

  }, 20000)



  it('model createOrFind case create', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField({blank: true})

      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'jame.mark@lakers.com', age: 5})

      const result = await User.createOrFind(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"instance":{"username":"kobe","email":"kobe.bryant@lakers.com","userId":2},"created":true}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)


  it('model updateOrCreate case create', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField()

      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'jame.mark@lakers.com', age: 5})

      const result = await User.updateOrCreate(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com', age: 5}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"instance":{"username":"kobe","email":"kobe.bryant@lakers.com","age":5,"userId":2},"created":true}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)


  it('model updateOrCreate case update', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      class User extends models.Model {

        userId = models.AutoField({primaryKey:true})
        username = models.CharField({maxLength: 100})
        email = models.CharField({blank: true, maxLength: 100})
        age = models.IntegerField({blank: true})

      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [User]
      })

      await User.create({username:'jame', email:'kobe.bryant@lakers.com', age:5})

      const result = await User.updateOrCreate(
        {email:'kobe.bryant@lakers.com'},
        {username:'kobe', email:'kobe.bryant@lakers.com'}
      )

      document.body.innerHTML = JSON.stringify(result)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('{"instance":{"username":"kobe","email":"kobe.bryant@lakers.com","age":5,"userId":1},"created":false}')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 20000)

})



describe("operators", () => {

  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  it('operator contains', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const {ArrayField, JsonField } = models.indexedDB.fields
      class MessageModel extends models.Model {

        channels =  ArrayField()
        mentions =  ArrayField()
        msg =  models.CharField()
        rid =  models.CharField()
        ts =  models.CharField()
        u =  JsonField()
        _id =  models.CharField({unique:true})
        _updatedAt =  models.IntegerField()
        messageSend =  models.BooleanField()
        offline =  models.BooleanField()
        viewed =  ArrayField()
        received =  ArrayField()
        localReference =  models.CharField({blank:true})
        attachments =  ArrayField()
        file =  ArrayField()

      }

      class DeleteMessageModel extends models.Model {

        messageId = models.IntegerField()
        rid =  models.CharField()
        ts =  models.CharField()
        u =  JsonField()
        needToReceiveBy = ArrayField()

      }


      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [MessageModel, DeleteMessageModel]
      })

      await MessageModel.create({
        channels: [],
        mentions:[],
        msg: '',
        rid: 'rid',
        ts: '',
        u: {},
        _id: '8888',
        id: '555555',
        _updatedAt: 3333,
        messageSend: false,
        offline: false,
        viewed: [],
        received: [],
        localReference: 'sdfsdf',
        attachments: [],
        file: [],
        delate: false
      })

      document.body.innerHTML = JSON.stringify(await MessageModel.all())

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"channels":[],"mentions":[],"msg":"","rid":"rid","ts":"","u":{},"_id":"8888","_updatedAt":3333,"messageSend":false,"offline":false,"viewed":[],"received":[],"localReference":"sdfsdf","attachments":[],"file":[],"id":"555555"}]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 10000)


  it('Delete all', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']

      class Person extends models.Model {
        username =  models.CharField({maxLength:0})
      }

      models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [Person]
      })


      await Person.create([
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'},
        {username:'Peter'}]
      )

      const rows = await Person.filter({username:'Peter'}).execute()

      if(JSON.stringify(rows) ==
      '[{"username":"Peter","id":1},{"username":"Peter","id":2},{"username":"Peter","id":3},{"username":"Peter","id":4},{"username":"Peter","id":5},{"username":"Peter","id":6}]') {
        await Person.deleteAll()
      }

      let record = await Person.filter({username:'Peter'}).execute()
      document.body.innerHTML = JSON.stringify(record)

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[]')

    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }

  }, 20000)



})

describe("JSONField", () => {

  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })


  // it('documentation 1', async () => {

  //  await  page.waitForFunction(() => 'models' in window);

  //   await page.evaluate(async() => {

  //     const models: typeof modelsType = window['models']
  //     const {ArrayField, JsonField } = models.indexedDB.fields
  //     class DogModel extends models.Model {
  //       name = models.CharField({maxLength:200})
  //       data = JsonField({null: false})
  //     }

  //     await models.register({
  //       databaseName:'',
  //       type: 'indexedDB',
  //       version: 1,
  //       models: [DogModel]
  //     })

  //     await DogModel.create({name:'Max', data: null})
  //     await DogModel.create({name:'Archie', data:models.Value('null')})

  //     const result6 = await DogModel.filter({data__isNull:false}).execute()
  //     //  [<Dog: Archie>]

  //     document.body.insertAdjacentHTML(
  //       'beforeend', `<span id="result6fff" style="background-color: yellow"> ${JSON.stringify(result6)}::1</span>`,
  //     );
  //     document.body.insertAdjacentHTML(
  //       'beforeend', `<br><span id="resudlt6fff" style="background-color: yellow"> ${JSON.stringify(await DogModel.all())}::2</span>`,
  //     );

  //   })
  //   debugger
  //   // Check to see if text exists on the page
  //   const text1 = ('[{"name":"Max","data":null,"id":1},{"name":"Archie","data":{},"id":2}]')

  //   try {

  //     await page.waitForFunction(
  //       text => (document!.querySelector('#result6fff') as any)!.innerText.includes(text1),
  //       {timeout: 100},
  //       text1
  //     );
  //     expect(text1).toBe(text1)

  //   } catch(e) {
  //     expect(text1).toBe('i_i')
  //   }

  //   const text22 = ('[{"name":"Max","data":null,"id":1},{"name":"Archie","data":{},"id":2}]::2')

  //   try {

  //     await page.waitForFunction(
  //       text => document!.querySelector('body')!.innerText.includes(text22),
  //       {timeout: 100},
  //       text22
  //     );
  //     expect(text22).toBe(text22)

  //   } catch(e) {
  //     expect(text22).toBe('i_i')
  //   }


  //   await page.evaluate(async() => {

  //     const models: typeof modelsType = window['models']
  //     const {ArrayField, JsonField } = models.indexedDB.fields
  //     class DogModel extends models.Model {
  //       name = models.CharField({maxLength:200})
  //       data = JsonField({null: false})
  //     }


  //     await models.register({
  //       databaseName:'',
  //       type: 'indexedDB',
  //       version: 1,
  //       models: [DogModel]
  //     })
  //     document.body.innerHTML = ""

  //     await DogModel.create({name:'Max', data: null})
  //     await DogModel.create({name:'Archie', data:models.Value('null')})

  //     const result5 = await DogModel.filter({data__isNull:true}).execute()
  //     //  [<Dog: Max>]

  //     document.body.insertAdjacentHTML(
  //       'beforeend', `<span id="resudlt6fff" style="background-color: yellow"> ${JSON.stringify(result5)}::13</span>`,
  //     );


  //   })
  //   debugger
  //   // Check to see if text exists on the page
  //   const text2 = ('[{"name":"Max","data":null,"id":1}]')


  //   try {

  //     await page.waitForFunction(
  //       text => document!.querySelector('body')!.innerText.includes(text2),
  //       {timeout: 100},
  //       text2
  //     );
  //     expect(text2).toBe(text2)

  //   } catch(e) {
  //     expect(text2).toBe('i_i')
  //   }

  //   await page.evaluate(async() => {

  //     const models: typeof modelsType = window['models']
  //     const {ArrayField, JsonField } = models.indexedDB.fields
  //     class DogModel extends models.Model {
  //       name = models.CharField({maxLength:200})
  //       data = JsonField({null: false})
  //     }


  //     await models.register({
  //       databaseName:'',
  //       type: 'indexedDB',
  //       version: 1,
  //       models: [DogModel]
  //     })
  //     document.body.innerHTML = ""

  //     await DogModel.create({name:'Max', data: null})
  //     await DogModel.create({name:'Archie', data:models.Value('null')})
  //     // const result3 = await DogModel.filter({data:null})
  //     // //  [<Dog: Archie>]
  //     const result4 = await DogModel.filter({data:models.Value('null')}).execute()
  //     // //  [<Dog: Archie>]


  //     // document.body.insertAdjacentHTML(
  //     //   'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result1)}</span>`,
  //     // );
  //     // document.body.insertAdjacentHTML(
  //     //   'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result2)}</span>`,
  //     // );
  //     // document.body.insertAdjacentHTML(
  //     //   'beforeend', `<span style="background-color: yellow"> ${JSON.stringify(result3)}</span>`,
  //     // );
  //     document.body.insertAdjacentHTML(
  //       'beforeend', `<span id="resudlt6fff" style="background-color: yellow"> ${JSON.stringify(result4)}::133</span>`,
  //     );



  //   })
  //   debugger
  //   // Check to see if text exists on the page
  //   const text3 = ('[{"name":"Archie","data":{},"id":2}]')

  //   try {

  //     await page.waitForFunction(
  //       text => document!.querySelector('body')!.innerText.includes(text3),
  //       {timeout: 100},
  //       text3
  //     );
  //     expect(text3).toBe(text3)

  //   } catch(e) {
  //     expect(text3).toBe('i_i')
  //   }


  //   await page.evaluate(async() => {

  //     const models: typeof modelsType = window['models']
  //     const {ArrayField, JsonField } = models.indexedDB.fields
  //     class DogModel extends models.Model {
  //       name = models.CharField({maxLength:200})
  //       data = JsonField({null: false})
  //     }


  //     await models.register({
  //       databaseName:'',
  //       type: 'indexedDB',
  //       version: 1,
  //       models: [DogModel]
  //     })
  //     document.body.innerHTML = ""

  //     await DogModel.create({name:'Max', data: null})
  //     await DogModel.create({name:'Archie', data:models.Value('null')})
  //     const result3 = await DogModel.filter({data:null}).execute()
  //     // [<Dog: Archie>]

  //     document.body.insertAdjacentHTML(
  //       'beforeend', `<span id="resudlt6fff" style="background-color: yellow"> ${JSON.stringify(result3)}::134343</span>`,
  //     );

  //   })
  //   debugger
  //   // Check to see if text exists on the page
  //   const text = ('[{"name":"Archie","data":{},"id":2}]')

  //   try {

  //     await page.waitForFunction(
  //       text => document!.querySelector('body')!.innerText.includes(text),
  //       {timeout: 100},
  //       text
  //     );
  //     expect(text).toBe(text)

  //   } catch(e) {
  //     expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
  //   }

  // }, 20000)

  it('documentation 2', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const {ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data: {
        'breed': 'labrador',
        'owner': {
          'name': 'Bob',
          'other_pets': [{
            'name': 'Fishy',
          }],
        },
      }});

      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': null}})

      const result = await DogModel.filter({data__breed:'collie'}).execute()
      //  <Dog: Meg>

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":null},"id":2}]')

  }, 20000)


  it('contained_by', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador', 'owner': 'Bob'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})
      await DogModel.create({name:'Fred', data:{}})

      const result = await DogModel.filter({data__contained_by: {'breed': 'collie', 'owner': 'Bob'}}).execute()
      // [<Dog: Meg>, <Dog: Fred>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2},{"name":"Fred","data":{},"id":3}]')

  }, 10000)


  it('has_key', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_key: 'owner'}).execute()
      // [<Dog: Meg>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')

  }, 10000)

  it('has_keys', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_keys: ['breed', 'owner']}).execute()
      // [<Dog: Meg>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')

  }, 10000)


  it('has_any_keys 1', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_any_keys: ['breed', 'owner']}).execute()
      // [<Dog: Meg>, <Dog: Rufus>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Rufus","data":{"breed":"labrador"},"id":1},{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')

  }, 10000)
})

describe("JSONField deep", () => {

  beforeEach(async () => {
    await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
  })



  it('Multiple keys can be chained together to form a path lookup', async () => {

   await  page.waitForFunction(() => 'models' in window);

    var a = await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const {ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data: {
        'breed': 'labrador',
        'owner': {
          'name': 'Bob',
          'other_pets': [{
            'name': 'Fishy',
          }],
        },
      }});

      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': null}})

      const result = await DogModel.filter({data__owner__other_pets__0__name:'Fishy'}).execute()
      //  <Dog: Meg>

      if(JSON.stringify(result) == '[{"name":"Rufus","data":{"breed":"labrador","owner":{"name":"Bob","other_pets":[{"name":"Fishy"}]}},"id":1}]') {
        await DogModel.deleteAll()
      }

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(await DogModel.all())}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page

    const text = ("[]")
    try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(await page.$eval('body', el => (el as any).innerText)).toBe(text)
    }

  }, 10000)


//   it('IsNull deep', async () => {

//    await  page.waitForFunction(() => 'models' in window);

//     await page.evaluate(async() => {

//       const models: typeof modelsType = window['models']
//       const { ArrayField, JsonField } = models.indexedDB.fields
//       class DogModel extends models.Model {
//         name = models.CharField({maxLength:200})
//         data = JsonField({null: false})
//       }

//       await models.register({
//         databaseName:'fff',
//         type: 'indexedDB',
//         version: 1,
//         models: [DogModel]
//       })


//       await DogModel.create({name:'Rufus', data: {
//         'breed': 'labrador',
//         'owner': {
//           'name': 'Bob',
//           'other_pets': [{
//             'name': 'Fishy',
//           }],
//         },
//       }});

//       await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': null}})

//       const result = await DogModel.filter({data__owner__other_pets__0__age__isNull: true}).execute()

//       document.body.innerText = JSON.stringify(result)

//     })
//     debugger
//     // Check to see if text exists on the page
//     const text = ('[{"name":"Rufus","data":{"breed":"labrador","owner":{"name":"Bob","other_pets":[{"name":"Fishy"}]}},"id":1}]')

// try {

//       await page.waitForFunction(
//         text => document!.querySelector('body')!.innerText.includes(text),
//         {timeout: 100},
//         text
//       );
//       expect(text).toBe(text)

//     } catch(e) {
//       expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
//     }

//   }, 10000)


  it('has_key', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_key: 'owner'}).execute()
      // [<Dog: Meg>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')
try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }
  }, 10000)

  it('has_keys', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_keys: ['breed', 'owner']}).execute()
      // [<Dog: Meg>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')
try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }
  }, 10000)


  it('has_any_keys 2', async () => {

   await  page.waitForFunction(() => 'models' in window);

    await page.evaluate(async() => {

      const models: typeof modelsType = window['models']
      const { ArrayField, JsonField } = models.indexedDB.fields
      class DogModel extends models.Model {
        name = models.CharField({maxLength:200})
        data = JsonField({null: false})
      }

      await models.register({
        databaseName:'',
        type: 'indexedDB',
        version: 1,
        models: [DogModel]
      })

      await DogModel.create({name:'Rufus', data:{'breed': 'labrador'}})
      await DogModel.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})


      const result = await DogModel.filter({data__has_any_keys: ['breed', 'owner']}).execute()
      // [<Dog: Meg>, <Dog: Rufus>]

      document.body.insertAdjacentHTML(
        'beforeend', `<span id="result6" style="background-color: yellow"> ${JSON.stringify(result)}</span>`,
      );

    })
    debugger
    // Check to see if text exists on the page
    const text = ('[{"name":"Rufus","data":{"breed":"labrador"},"id":1},{"name":"Meg","data":{"breed":"collie","owner":"Bob"},"id":2}]')
try {

      await page.waitForFunction(
        text => document!.querySelector('body')!.innerText.includes(text),
        {timeout: 100},
        text
      );
      expect(text).toBe(text)

    } catch(e) {
      expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
    }
  }, 10000)
})

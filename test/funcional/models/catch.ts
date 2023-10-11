import * as _Fields from '../../../src/models/field/fields'
import { models as  modelsType } from '../../../src/index'
function uniqueGenerator() {
  return (Math.random() +'uuid'+ new Date().getTime()).slice(2)
}

import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

// describe("catch model error", () => {

//   beforeEach(async () => {
//     await page.goto(`http://127.0.0.1:${Port}/test/index.html`)
//   })

//   // it('create duplicate unique object', async () => {

//   //   await  page.waitForFunction(() => 'models' in window);

//   //   await page.evaluate(async() => {

//   //     const models: typeof modelsType = window['models']
//   //     document.title = 'create duplicate unique object'

//   //     class Person extends models.Model {
//   //       username =  models.CharField({maxLength:0, unique: true})
//   //     }

//   //     models.register({
//   //       databaseName:'',
//   //       type: 'indexedDB',
//   //       version: 1,
//   //       models: [Person]
//   //     })

//   //     const james = await Person.create({username:'james'})

//   //     try {
//   //       const james1 = await Person.create({username:'james'})
//   //     } catch (error) {
//   //       document.body.innerHTML = JSON.stringify({username:james.username, id:james.id})
//   //     }
//   //   })
//   //   debugger
//   //   // Check to see if text exists on the page
//   //   const text =  ('{"username":"james","id":1}')

//   //   try {

//   //     await page.waitForFunction(
//   //       text => document!.querySelector('body')!.innerText.includes(text),
//   //       {timeout: 2000},
//   //       text
//   //     );
//   //     expect(text).toBe(text)

//   //   } catch(e) {
//   //     expect(text).toBe(await page.$eval('body', el => (el as any).innerText))
//   //   }

//   // }, 30000)



//   // it('transaction failure', async () => {

//   //   await  page.waitForFunction(() => 'models' in window);

//   //   await page.evaluate(async() => {

//   //     const models: typeof modelsType = window['models']
//   //     document.title = 'create duplicate unique object'

//   //     class Person extends models.Model {
//   //       username =  models.CharField({maxLength:0, unique: true})
//   //     }

//   //     models.register({
//   //       databaseName:'',
//   //       type: 'indexedDB',
//   //       version: 1,
//   //       models: [Person]
//   //     })

//   //     let date = new Date().getTime()


//   //     const james = Person.create({username: date.toString()})
//   //     const james1 = Person.create({username: date.toString()})
//   //     const james2 = Person.create({username: '123'})

//   //     const sub = Person.ReactiveList((model)=> model.all())

//   //     Person.transactionOnCommit( async () => {
//   //       setTimeout(() => {
//   //           document.body.innerHTML = JSON.stringify([sub.value.length])
//   //       }, 100)
//   //     })

//   //     await Person.create({username: 'peter'})

//   //   })
//   //   debugger

//   //   const text = (`[3]`)

//   //   expect(text).toBe(await page.$eval('body', el => (el as any).innerText))

//   // }, 30000)



// })

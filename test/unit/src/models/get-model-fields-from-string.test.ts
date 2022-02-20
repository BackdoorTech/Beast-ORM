import { getFields } from '../../../../dist/src/models/get-model-fields-from-string/get-model-field-from-text'
const port = process.env.PUPPETEER_PORT


describe("Transform", () => {
    beforeAll(async () => {
      await page.goto(`http://127.0.0.1:${port}/test/index.html`)
    })
   
    it('Transform To object', async () => {
      await page.waitForSelector('h1')
      expect(4).toBe(4)
    }, 10000)
  
  })
    
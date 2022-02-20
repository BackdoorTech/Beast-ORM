require('dotenv').config()
const port = process.env.PUPPETEER_PORT

describe("initial test", () => {
  beforeAll(async () => {
    await page.goto(`http://127.0.0.1:${port}/test/index.html`)
  })
 
  it('load page', async () => {
    await page.waitForSelector('h1')
    expect(4).toBe(4)
  }, 10000)

})
  
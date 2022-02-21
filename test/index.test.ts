require('dotenv').config()
const port = process.env.PUPPETEER_PORT

describe("page load", () => {
  beforeAll(async () => {
    await page.goto(`http://127.0.0.1:${port}/test/index.html`)
  })
 
  it('load page', async () => {
    await page.waitForSelector('h1')
    expect('time not exceeded').toBe('time not exceeded')
  }, 10000)

})
  
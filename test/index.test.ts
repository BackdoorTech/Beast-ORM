require('dotenv').config()
const port = process.env.PUPPETEER_PORT
const url = `file://${__dirname}/index.html`.replace(/[\\]/g, '/')

describe("general test", () => {
  beforeAll(async () => {
    await page.goto(`http://127.0.0.1:${port}/test/index.html`)
  })
 
  it('should display "google" text on page', async () => {
    await page.waitForFunction(() => 'Connector' in window); 
  }, 10000)
})
  
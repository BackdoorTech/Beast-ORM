// jest-puppeteer.config.js
require('dotenv').config()

const port = process.env.PUPPETEER_PORT
const host = process.env.PUPPETEER_HOST
const openChrome = process.env.PUPPETEER_OPEN_CHROME
const chromePath =  process.env.PUPPETEER_CHROME_PATH

module.exports = {
  server: {
    command: `http-server`,
    port: port,
    launchTimeout: 1000
  },
  launch: {
    dumpio: true,
    headless: true,
    product: 'chrome',
    args: [`--window-size=1200,1080`],
    defaultViewport: {
      width:1200,
      height:1080
    },
    executablePath: chromePath
  },
  browserContext: 'default',
}
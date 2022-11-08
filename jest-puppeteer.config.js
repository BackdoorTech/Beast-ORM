require('dotenv').config()
const openChrome = process.env.PUPPETEER_OPEN_CHROME

module.exports = {
  server: {
    command: `node ./test/config/test-server.js`,
    launchTimeout: 4000
  },
  launch: {
    dumpio: true,
    headless: openChrome != 'true',
    // product: 'chrome',
    args: [`--window-size=1200,1080`],
    defaultViewport: {
      width:1200,
      height:1080
    },
    // executablePath: chromePath
  },
  browserContext: 'default',
}
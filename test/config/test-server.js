const express = require('express')
const fs = require('fs')
const app = express();
const path = require('path')

const staticPath = path.resolve(__dirname, "../../");

app.use('/', express.static(staticPath))

const server = app.listen(0, () => {
  console.log('Listening on port:', server.address().port);

  const content = {
    'Port': server.address().port
  }

  fs.writeFileSync('./test/config/test.json', JSON.stringify(content))

});
import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("jest configuration", () => {

  it('jest is healthy', async () => {
    expect(4).toBe(4)
  }, 10000)

})
  
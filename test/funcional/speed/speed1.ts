import fs from 'fs'
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));

describe("jest configuration", () => {

  it('should run faster than 40ms', async () => {
    const dummyFunction = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({})
            }, 50)
            
        })
    };

    await expect(dummyFunction)['toBeFasterThan'](40);
  });

})
';
import fs from 'fs';
';
';
';
const { Port } = JSON.parse(fs.readFileSync('./test/config/test.json', 'utf8'));
describe("argsAttributes", () => {
    beforeEach(async () => {
        await page.goto(`http://127.0.0.1:${Port}/test/index.html`);
    });
    it('basic', async () => {
        await page.waitForFunction(() => 'models' in window);
        await page.evaluate(async () => {
            const models = window['models'];
            const ObjectOperator = window['ObjectConditionOperator'];
            const argsAttributes = window['argsAttributes'];
            class Person extends models.Model {
                constructor() {
                    super(...arguments);
                    this.name = models.CharField({ maxLength: 0 });
                    this.age = models.IntegerField();
                }
            }
            models.register({
                databaseName: 'jest-test',
                type: 'indexedDB',
                version: 1,
                models: [Person]
            });
            const tableSchema = Person.getTableSchema();
            const row = { name: 'peter', age: 22 };
            const filterParams = [{ age: 22 }];
            const args = { name: 'Peter', age: 18 };
            const argObj = new argsAttributes(args, tableSchema);
            document.body.innerHTML = 'result: ' + JSON.stringify(argObj.value);
        });
        debugger;
        const text = ('result: [{"name":{"fieldName":"name","fieldPath":"name","operation":"eq","operationArg":"Peter","fieldClassName":"CharField"},"age":{"fieldName":"age","fieldPath":"age","operation":"eq","operationArg":18,"fieldClassName":"IntegerField"}}]');
        expect(text).toBe(await page.$eval('body', el => el.innerText));
    }, 20000);
    it('basic 1', async () => {
        await page.waitForFunction(() => 'models' in window);
        await page.evaluate(async () => {
            const models = window['models'];
            const ObjectOperator = window['ObjectConditionOperator'];
            const argsAttributes = window['argsAttributes'];
            class Person extends models.Model {
                constructor() {
                    super(...arguments);
                    this.name = models.CharField({ maxLength: 0 });
                    this.age = models.IntegerField();
                }
            }
            models.register({
                databaseName: 'jest-test',
                type: 'indexedDB',
                version: 1,
                models: [Person]
            });
            const tableSchema = Person.getTableSchema();
            const args = [{ name: 'Peter', age: 18 }];
            const argObj = new argsAttributes(args, tableSchema);
            document.body.innerHTML = 'result: ' + JSON.stringify(argObj.value);
        });
        debugger;
        const text = ('result: [{"name":{"fieldName":"name","fieldPath":"name","operation":"eq","operationArg":"Peter","fieldClassName":"CharField"},"age":{"fieldName":"age","fieldPath":"age","operation":"eq","operationArg":18,"fieldClassName":"IntegerField"}}]');
        expect(text).toBe(await page.$eval('body', el => el.innerText));
    }, 20000);
});

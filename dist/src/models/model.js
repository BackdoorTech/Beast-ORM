import { uniqueGenerator } from '../utils.js';
let queries = {} = {};
// inspire by https://github.com/brianschardt/browser-orm
export class Model {
    constructor(objData) {
        Object.assign(this, objData || {});
    }
    filter(...arg) {
        return Model.filter(arg);
    }
    static filter(...arg) {
        const queryId = uniqueGenerator();
        return Object.assign(this, Model.object(queryId, ['filter', arg]));
    }
}
Model.object = (queryId, some) => {
    if (!queries[queryId]) {
        queries[queryId] = [];
    }
    if (some) {
        const methodName = some[0];
        const methodArgs = some[1];
        Model.object(queryId)[methodName](...methodArgs);
    }
    return {
        filter: (a, b, c, d) => {
            queries[queryId].push({ methodName: 'filter', arguments: [a, b, c, d] });
            return Object.assign(Model, Model.object(queryId));
        },
        select: () => { },
        execute() { }
    };
};

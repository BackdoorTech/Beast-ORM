export class QueryReaderSelect {
    constructor(Query) {
        Object.assign(this, Query);
    }
    get hasNoCondition() {
        return this.where.length == 0;
    }
    get isInsertOne() {
        return true;
    }
    get hasLimit() {
        return this.limit >= 1;
    }
}
export function CreateQueryReaderSelect(Query) {
    return new QueryReaderSelect(Query);
}

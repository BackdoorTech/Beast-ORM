export class ItemNotFound {
    constructor(IQuery) {
        this.type = IQuery.type;
        this.table = IQuery.table;
        this.where = IQuery.where;
        this.limit = IQuery.limit;
        //this.queryId = IQuery.id
    }
}

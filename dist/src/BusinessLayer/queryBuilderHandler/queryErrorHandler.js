export class ItemNotFound {
    constructor(IQuery) {
        this.type = IQuery.type;
        this.table = IQuery.table;
        this.where = IQuery.where;
        this.limit = IQuery.limit;
        //this.queryId = IQuery.id
    }
}
export class UniqueField {
    constructor(IQuery) {
        this.message = "Unique field are not nullable in indexedDB";
        this.table = IQuery.table;
        this.where = IQuery.where;
        this.limit = IQuery.limit;
        //this.queryId = IQuery.id
    }
}
export class BulkDataUniqueFieldError {
    constructor({ table, rows, data, index }) {
        this.table = "";
        this.rows = [];
        this.data = [];
        this.index = 0;
        this.message = "";
        this.table = table;
        this.rows = rows;
        this.data = data;
        this.index = index;
    }
    printMessage() {
        this.message = "No unique value passed";
    }
}

export function argHasId(TableSchema, args) {
    const idFieldName = TableSchema.id.keyPath;
    return args[idFieldName];
}
export function getArgId(TableSchema, args) {
    const idFieldName = TableSchema.id.keyPath;
    return args[idFieldName];
}
export function getIdObject(TableSchema, args) {
    const idFieldName = TableSchema.id.keyPath;
    const filter = {};
    filter[idFieldName] = this[idFieldName];
    return filter;
}
export function getArgIdWithT(model, args) {
    const _model = model.getModel();
    const TableSchema = _model.getTableSchema();
    const idFieldName = TableSchema.id.keyPath;
    return args[idFieldName];
}
export function getIdObjectWithT(model, args) {
    const _model = model.getModel();
    const TableSchema = _model.getTableSchema();
    const idFieldName = TableSchema.id.keyPath;
    const filter = {};
    filter[idFieldName] = args[idFieldName];
    return filter;
}
export function equalModels(a, b) {
    return a.getTableSchema().name == b.getTableSchema().name;
}

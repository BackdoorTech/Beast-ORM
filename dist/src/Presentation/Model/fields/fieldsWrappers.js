import * as Fields from './allFields.js';
import { equalModels, getIdObjectWithT } from '../../../Utility/Model/utils.js';
import { RuntimeMethods as RM } from '../../../BusinessLayer/modelManager/runtimeMethods/runTimeMethods.js';
import { relationShip } from '../../../BusinessLayer/modelManager/relationships/relationShip.js';
const PrototypeGust = {
    CharField(data) { return null; },
    BooleanField(data) { return null; },
    TextField(data) { return null; },
    IntegerField(data) { return null; },
    DateField(data) { return null; },
    DateTimeField(data) { return null; },
    BigIntegerField(data) { return null; },
    AutoField(data) { return null; },
    indexedDB: {
        fields: {
            JsonField: (data) => null,
            ArrayField: (data) => null
        }
    },
    OneToOneField: (data) => {
        const modelInstance = new data.model();
        return modelInstance;
    },
    ForeignKey(data) {
        return new data.model();
    },
    ManyToManyField(data) {
        let modelInstance = [];
        const foreignKeyModel = data.model;
        return {
            async add(args) {
                const currentModel = data.I.getModel();
                const middleTableName = relationShip.getMiddleTableName(currentModel, foreignKeyModel);
                const { fieldName } = currentModel.getTableSchema().middleTableRelatedFields[middleTableName];
                return data.I[fieldName + RM.Add](args);
            },
            async all() {
                const currentModel = data.I.getModel();
                const middleTableName = relationShip.getMiddleTableName(currentModel, foreignKeyModel);
                const { fieldName } = currentModel.getTableSchema().middleTableRelatedFields[middleTableName];
                const [list, result] = await data.I[fieldName + RM.All]();
                if (result.isOk) {
                    modelInstance = list;
                }
                return result.pass();
            },
            get list() {
                return modelInstance;
            }
        };
    },
};
export const _RealPrototype = {
    CharField(data) {
        return new Fields.CharField(data);
    },
    BooleanField(data) {
        return new Fields.BooleanField(data);
    },
    TextField(data) {
        return new Fields.TextField(data);
    },
    IntegerField(data) {
        return new Fields.IntegerField(data);
    },
    DateField(data) {
        return new Fields.DateField(data);
    },
    DateTimeField(data) {
        return new Fields.DateTimeField(data);
    },
    BigIntegerField(data) {
        return new Fields.BigIntegerField(data);
    },
    AutoField(data) {
        return new Fields.AutoField(data);
    },
    indexedDB: {
        fields: {
            JsonField: (data) => new Fields.indexedDBJsonField(data),
            ArrayField: (data) => new Fields.indexedDBArrayField(data)
        }
    },
    OneToOneField: (data) => new Fields.OneToOneField(data),
    ForeignKey: (data) => new Fields.ForeignKey(data),
    ManyToManyField: (data) => new Fields.ManyToManyField(data),
};
let FieldsStrategyContext = _RealPrototype;
export function GustPrototype() {
    FieldsStrategyContext = PrototypeGust;
}
export function RealPrototype() {
    FieldsStrategyContext = _RealPrototype;
}
export function CharField(data) {
    return FieldsStrategyContext.CharField(data);
}
export function BooleanField(data) {
    return FieldsStrategyContext.BooleanField(data);
}
export function TextField(data) {
    return FieldsStrategyContext.TextField(data);
}
export function IntegerField(data) {
    return FieldsStrategyContext.IntegerField(data);
}
export function DateField(data) {
    return FieldsStrategyContext.DateField(data);
}
export function DateTimeField(data) {
    return FieldsStrategyContext.DateTimeField(data);
}
export function BigIntegerField(data) {
    return FieldsStrategyContext.BigIntegerField(data);
}
export function AutoField(data) {
    return FieldsStrategyContext.AutoField(data);
}
export const indexedDB = {
    fields: {
        JsonField: (data) => FieldsStrategyContext.indexedDB.fields.JsonField(data),
        ArrayField: (data) => FieldsStrategyContext.indexedDB.fields.ArrayField(data)
    }
};
export function OneToOneField(data) {
    return FieldsStrategyContext.OneToOneField(data);
}
export function ForeignKey(data) {
    return FieldsStrategyContext.ForeignKey(data);
}
export function ManyToManyField(data) {
    return FieldsStrategyContext.ManyToManyField(data);
}
export const getter = {
    ForeignKeyGetter(data) {
        let modelInstance = [];
        const foreignKeyModel = data.model;
        const a = {
            async add(args) {
                const currentModel = data.I.getModel();
                const staticModel = foreignKeyModel.getModelSchema();
                const tableSchema = foreignKeyModel.getTableSchema();
                for (const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
                    const Field = staticModel[fieldName];
                    if (equalModels(Field.model, currentModel)) {
                        const params = {};
                        params[fieldName] = data.I;
                        return await foreignKeyModel.create(Object.assign(Object.assign({}, args), params));
                    }
                }
            },
            async all() {
                const currentModel = data.I.getModel();
                const staticModel = foreignKeyModel.getModelSchema();
                const tableSchema = foreignKeyModel.getTableSchema();
                for (const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
                    const Field = staticModel[fieldName];
                    if (equalModels(Field.model, currentModel)) {
                        const filter = getIdObjectWithT(data.I, data.I);
                        const [list, result] = await Field.model.filter(filter).execute();
                        if (result.isOk) {
                            modelInstance = list;
                            return true;
                        }
                        result.pass();
                    }
                }
            },
            get list() {
                return modelInstance;
            }
        };
        return function () { return a; };
    },
    ManyToManyGetter(data) {
        let modelInstance = [];
        const foreignKeyModel = data.model;
        const a = {
            add(args) {
                const currentModel = data.I.getModel();
                const middleModel = relationShip.getMiddleTable(foreignKeyModel, currentModel);
                return relationShip.addToMiddleTable(data.I, foreignKeyModel, args, middleModel);
            },
            async all() {
                const currentModel = data.I.getModel();
                const middleModel = relationShip.getMiddleTable(foreignKeyModel, currentModel);
                let [list, result] = await relationShip.getAll(data.I, foreignKeyModel, middleModel);
                if (result.isOk) {
                    modelInstance = list;
                }
                return result.pass();
            },
            get list() {
                return modelInstance;
            }
        };
        return function () { return a; };
    }
};

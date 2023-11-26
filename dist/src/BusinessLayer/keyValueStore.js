import { schemaGenerator } from "../modelManager/schemaGenerator/schemaGenerator";
class BeastORM {
    constructor() {
        this.registerKeyValueStore = (register) => {
            // generate schema
            const schema = schemaGenerator.generate(register);
        };
    }
}
export const ORM = new BeastORM();

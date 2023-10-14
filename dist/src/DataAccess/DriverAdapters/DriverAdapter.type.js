// Define the strategy interface
export class IDatabaseStrategy {
    async migrate() { }
    async insert(table, data) { }
    async select(table, key) { }
}

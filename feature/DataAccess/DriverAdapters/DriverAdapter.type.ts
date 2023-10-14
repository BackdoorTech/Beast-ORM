// Define the strategy interface
export class IDatabaseStrategy {
  async openDatabase() {}
  async insert(table, data) {}
  async select(table, key) {}
}

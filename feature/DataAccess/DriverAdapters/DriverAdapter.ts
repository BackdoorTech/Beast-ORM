import { IDatabaseStrategy } from "./DriverAdapter.type";

 // Context that uses the strategy pattern
export class DriverAdapter implements IDatabaseStrategy{
  strategy: IDatabaseStrategy
  constructor(strategy) {
    this.strategy = strategy;
  }
  async migrate() {
    this.strategy.migrate()
  }

  async insert(table, data) {
    return this.strategy.insert(table, data);
  }

  async select(table, key) {
    return this.strategy.select(table, key);
  }
}

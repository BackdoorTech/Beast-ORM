import { IDatabaseStrategy } from "./DriverAdapter.type";

 // Context that uses the strategy pattern
export class DriverAdapter implements IDatabaseStrategy{
  strategy: IDatabaseStrategy
  constructor(strategy) {
    this.strategy = strategy;
  }
  openDatabase(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insert(table, data) {
    return this.strategy.insert(table, data);
  }

  async select(table, key) {
    return this.strategy.select(table, key);
  }
}

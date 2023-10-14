import { IConfig } from "./table.type.js";

export class Table {
  config: IConfig

  constructor(Config: IConfig) {
    this.config = Config
  }
}

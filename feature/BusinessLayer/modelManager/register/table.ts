import { IConfig } from "./table.type";

export class Table {
  config: IConfig

  constructor(Config: IConfig) {
    this.config = Config
  }
}

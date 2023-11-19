export class PipeService {

  private functions: Function[] = []

  constructor() {
    this.functions = [];
  }

  register(func) {
    this.functions.push(func);
  }

  execute(input) {
    return this.functions.reduce((result, func) => func(result), input);
  }
}

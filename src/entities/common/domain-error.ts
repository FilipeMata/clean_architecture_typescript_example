export class DomainError extends Error {
  public readonly errors: string[];

  constructor(message: string, errors: string[] | string) {
    super();
    const constructorName = this.constructor.name;
    this.name = constructorName;
    this.message = message;
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
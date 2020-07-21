export class Result<T> {
  public succeeded: boolean;
  private readonly _errors: Array<string>;
  private readonly _value?: T;

  private constructor(value?: T, errors?: Array<string>) {
    this.succeeded = true;
    this._errors = [];
    this._value = value;
   
    if (errors && errors.length > 0 && !!errors[0]) {
      this.succeeded = false;
      this._errors = errors;
      this._value = undefined;
    } 

    Object.freeze(this);
  }

  public get value(): T {
    if (!this.succeeded || !this._value) {
      throw new Error("Can't get the value of an error result. Use 'errors' instead.")
    }

    return this._value;
  }

  public get errors(): Array<string> | undefined {
    if (this._errors.length > 0) {
      return this._errors;
    }
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(value, []);
  }

  public static fail<U>(failure: string | Array<string>): Result<U> {
    let errors = failure;

    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    return new Result<U>(undefined, errors);
  }
}

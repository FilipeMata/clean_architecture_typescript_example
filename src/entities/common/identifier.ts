const isIdentifier = (id: any): id is Identifier<any> => {
  return id instanceof Identifier;
};

export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  public equals(id?: Identifier<T>): boolean {
    if (!id || !isIdentifier(id)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  public toString(): string {
    return String(this.value);
  }

  public toValue(): T {
    return this.value;
  }
}
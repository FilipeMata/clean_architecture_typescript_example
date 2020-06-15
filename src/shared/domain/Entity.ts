

export abstract class Entity<T> {
  protected readonly _id: number;
  protected props: T;

  constructor (props: T, id?: number) {
    this._id = id ? id : 1;
    this.props = props;
  }

  public equals (object?: Entity<T>) : boolean {

    if (!object) {
      return false;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id && object._id && this._id === object._id;
  }
}
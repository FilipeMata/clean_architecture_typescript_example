import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (obj: any): obj is Entity<any> => {
  return obj instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  /*get id(): any {
    return this._id.toValue();
  }*/

  public equals (entity?: Entity<T>) : boolean {

    if (!entity || !isEntity(entity)) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    return this._id.equals(entity._id);;
  }
}
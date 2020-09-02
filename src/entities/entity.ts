import { UniqueEntityIDGeneratorFactory, UniqueEntityID } from '@entities';

/**
 * 
 * @desc Entities are object that encapsulates corporation business rules. 
 * We determine it's equality throgh entity unique id, if it exists.
 */

const isEntity = (obj: any): obj is Entity<any> => {
  return obj instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected props: T;

  constructor(props: T, id?: UniqueEntityID) {
    const idGenerator = UniqueEntityIDGeneratorFactory.getInstance().getIdGeneratorFor(this);
    this._id = id ? id : idGenerator.nextId();
    this.props = props;
  }

  get id (): UniqueEntityID {
    return this._id;
  }
  
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
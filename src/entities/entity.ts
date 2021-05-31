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
  private _dirtyProperties: string[];
  protected readonly _id: UniqueEntityID;
  protected props: T;
  public readonly isNew: boolean;

  constructor(props: T, id?: UniqueEntityID, isNew?: boolean) {

    const handler = () => {
      const setPropertyDirty = (prop: string) => {
        if (!this.isNew) {
          this._dirtyProperties.push(prop);
        }
      }

      return {
        set: function(obj: any, prop: string, value: any) {    
          obj[prop] = value;
          setPropertyDirty(prop);
          return true;
        }
      };
    }
    
    const idGenerator = UniqueEntityIDGeneratorFactory.getInstance().getIdGeneratorFor(this);
    this._id = id ? id : idGenerator.nextId();
    
    if (!id && !isNew) {
      throw new Error('When ID is missing isNew must be informed');
    }

    this.isNew = id ? !!isNew : true;
    this._dirtyProperties = [];
    this.props = new Proxy(props, handler());
  }

  get id (): UniqueEntityID {
    return this._id;
  }

  public getDirtyProps(): string[] {
    return this._dirtyProperties;
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
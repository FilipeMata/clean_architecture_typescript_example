import { UniqueEntityIDGeneratorFactory, UniqueEntityID } from '@entities';
import { DomainError } from './domain-error';

const isEntity = (obj: any): obj is Entity<any> => {
  return obj instanceof Entity;
};

interface Properties {
  id?: UniqueEntityID
}

export class EntityError extends DomainError {
  constructor(entity: string, errors: string[] | string) {
    super(`Failed while manipulating ${entity} entity`, errors);
  }
}

/**
 * 
 * @desc Entities are object that encapsulates corporation business rules. 
 * We determine it's equality throgh entity unique id, if it exists.
 */
export abstract class Entity<T extends Properties> {
  private _dirtyProperties: string[];
  protected readonly _id: UniqueEntityID;
  protected props: T;
  public readonly isNew: boolean;

  constructor(props: T, isNew: boolean = true) {
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
    
    if (!props.id && !isNew) {
      throw new Error('Dirty Entities must has an ID');
    }
    
    const idGenerator = UniqueEntityIDGeneratorFactory.getInstance().getIdGeneratorFor(this);
    this._id = props.id ? props.id : idGenerator.nextId();
    this.isNew = isNew;
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
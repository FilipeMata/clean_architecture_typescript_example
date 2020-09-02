import { Entity } from '@entities';
import Guard from '@shared/guard';
import { MapperRegistry } from './mapper-registry';
import IdentityMap from './identity-map';

interface IUnitOfWork {
  registerNew(e: Entity<any>): void;
  registerClean(e: Entity<any>): void;
  registerDirty(e: Entity<any>): void;
  registerRemoved(e: Entity<any>): void;
  commit(): Promise<void>;
};

export class UnitOfWork implements IUnitOfWork {
  private _newObjects: Entity<any>[];
  private _dirtyObjects: Entity<any>[];
  private _removedObjects: Entity<any>[];
  private _identityMap: IdentityMap;

  constructor(identityMap: IdentityMap) {
    this._newObjects = [];
    this._dirtyObjects = [];
    this._removedObjects = [];
    this._identityMap = identityMap;
  }

  private _isOneOf(obj: Entity<any>, entities: Entity<any>[]) {
    return entities.filter((e) => {
      return e.equals(obj);
    }).length > 0;
  }
  
  private _remove(obj: Entity<any>, entities: Entity<any>[]): boolean {
    let removed = false;

    entities = entities.filter((e) => {
      if (e.equals(obj)) {
        removed = true;
        return false;
      }
      return true;
    });

    return removed;
  }

  private _isDirty(obj: Entity<any>) {
    return this._isOneOf(obj, this._dirtyObjects);
  }

  private _isNew(obj: Entity<any>): boolean {
    return this._isOneOf(obj, this._newObjects);
  }

  private _isRemoved(obj: Entity<any>) {
    return this._isOneOf(obj, this._removedObjects);
  }

  private _removeNew(obj: Entity<any>): boolean {
    return this._remove(obj, this._newObjects);
  }

  private _removeDirty(obj: Entity<any>): boolean {
    return this._remove(obj, this._dirtyObjects);
  }

  public registerClean(obj: Entity<any>) {
    const className = obj.constructor.name;
    Guard.againstNullOrUndefined(obj.id, `${className} Id`);
    this._identityMap.add(obj);
  }

  public registerNew(obj: Entity<any>) {
    Guard.againstNullOrUndefined(obj.id, `${obj.constructor.name} Id`);
    Guard.isTrue(`${obj.constructor.name} of ID ${obj.id.toValue()} already registered as Dirty`, !this._isDirty(obj));
    Guard.isTrue(`${obj.constructor.name} of ID ${obj.id.toValue()} already registered as Removed`, !this._isRemoved(obj));
    Guard.isTrue(`${obj.constructor.name} of ID ${obj.id.toValue()} already registered as New`, !this._isNew(obj));
    
    this._newObjects.push(obj);
    this._identityMap.add(obj);
  }

  public registerDirty(obj: Entity<any>) {
      Guard.againstNullOrUndefined(obj.id, `${obj.constructor.name} Id`);
      Guard.isTrue(`${obj.constructor.name} of ID ${obj.id.toValue()} already registered as Removed`, !this._isRemoved(obj))
    
      if (!this._isDirty(obj) && !this._isNew(obj)) {
        this._dirtyObjects.push(obj);
      }
  }

  public registerRemoved(obj: Entity<any>) {
    Guard.againstNullOrUndefined(obj.id, `${obj.constructor.name} Id`);
    this._identityMap.remove(obj);

    if (this._removeNew(obj)) {
      return;
    }

    this._removeDirty(obj);  
    
    if (!this._isRemoved(obj)) { 
      this._removedObjects.push(obj);
    }
  }

  private async _insertNew() {
    for (const newObject of this._newObjects) {
      MapperRegistry.getEntiyMapper(newObject.constructor.name).insert(newObject);
    }
  }

  private async _updateDirty() {
    for (const dirtyObject of this._dirtyObjects) {
      MapperRegistry.getEntiyMapper(dirtyObject.constructor.name).update(dirtyObject);
    }
  }

  private async _deleteRemoved() {
    for (const removedObject of this._removedObjects) {
      MapperRegistry.getEntiyMapper(removedObject.constructor.name).delete(removedObject);
    }
  }

  public async commit() {
    await this._insertNew();
    await this._updateDirty();
    await this._deleteRemoved();
  }
}
import { Entity, UniqueEntityID } from '@entities';
import IdentityMap from '../identity-map';
import { TransactionalDataMappers } from '../mappers';
import { UnitOfWork } from '../unit-of-work';

export interface IRepository {
  startTransaction(): void;
  abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]>;
  abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>>;
  endTransaction(): Promise<void>;
  remove(e: Entity<any>): Promise<void>;
  removeCollection(entities: Entity<any>[]): Promise<void>;
  save(e: Entity<any>): Promise<void>;
  saveCollection(entities: Entity<any>[]): Promise<void>
}

export default class BaseRepository implements IRepository {
  protected uow: UnitOfWork | undefined;
  protected identityMap: IdentityMap
  private _dataMappers: TransactionalDataMappers

  constructor(...args: any[]) {
    this.identityMap = new IdentityMap();
    this._dataMappers = args[0].dataMappers;
  }

  public startTransaction() {
    this.uow = new UnitOfWork(this.identityMap, this._dataMappers);
  }

  public async abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>> {
    let entity = this.identityMap.load(entityName, id);

    if (!entity) {
      entity = await this._dataMappers.getEntityMapper(entityName).find({ id: id.toValue() });
    }

    if(!entity) {
      return null;
    }

    this.identityMap.add(entity);
    return entity;
  }

  public async abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]> {
    const reload = (entity: Entity<any>) => {
      const loaded = this.identityMap.load(entityName, entity.id);

      if (!loaded) {
        this.identityMap.add(entity);
        return entity;
      }

      return loaded;
    }

    let entities = await this._dataMappers.getEntityMapper(entityName).findAll(criteria);
    
    for (let i = 0; i < entities.length; i++) {
      entities[i] = reload(entities[i]);
    }
    
    return entities;
  }

  public async save(e: Entity<any>) {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }

    const entityName = e.constructor.name;
    const registered = this.identityMap.load(entityName, e.id);

    if (registered) {
      this.uow.registerDirty(e);
    } else {
      this.uow.registerNew(e);
    }
  }

  public async saveCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.save(e);
    }
  } 

  public async remove(e: Entity<any>) {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }
    
    this.uow.registerRemoved(e);
  }

  public async removeCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.remove(e);
    }
  }

  public async endTransaction() {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }
    
    await this.uow.commit();
    this.uow = undefined;
  }
}

type GConstructor<T = {}> = new (...args: any[]) => T;
export type Repository = GConstructor<IRepository>;
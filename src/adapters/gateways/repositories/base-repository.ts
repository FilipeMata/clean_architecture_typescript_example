import { Entity, UniqueEntityID } from '@entities';
import IdentityMap from '../identity-map';
import { MapperRegistry } from '../mapper-registry';
import { UnitOfWork } from '../unit-of-work';4

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

  constructor() {
    this.identityMap = new IdentityMap();
  }

  public startTransaction() {
    this.uow = new UnitOfWork(this.identityMap);
  }

  public async abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>> {
    let entity = this.identityMap.load(entityName, id);

    if (!entity) {
      entity = await MapperRegistry.getEntiyMapper(entityName).find({ id: id.toValue() });
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
        this.identityMap.add(loaded);
        return entity;
      }

      return loaded;
    }

    let entities = await MapperRegistry.getEntiyMapper(entityName).findAll(criteria);
    
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
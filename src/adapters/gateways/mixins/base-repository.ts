import { Entity, UniqueEntityID } from '@entities';
import MapperRegistry from '../mapper-registry';
import { UnitOfWork } from '../unit-of-work';

export interface IRepository {
  startTransaction(): void;
  abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]>;
  abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>>;
  endTransaction(): void;
  remove(e: Entity<any>): Promise<void>;
  removeCollection(entities: Entity<any>[]): Promise<void>;
  save(e: Entity<any>): Promise<void>;
  saveCollection(entities: Entity<any>[]): Promise<void>
}

export default class BaseRepository implements IRepository {
  protected uow: UnitOfWork | undefined;

  public startTransaction() {
    this.uow = new UnitOfWork();
  }

  public async abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>> {
    let entity = this.uow.load(entityName, id);

    if(!entity) {
      entity = await MapperRegistry.getEntiyMapper(entityName).find({id: id.toValue()});
    }

    if(!entity) {
      return null;
    }

    this.uow.registerClean(entity);
    return entity;
  }

  public async abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]> {
    const reload = (entity: Entity<any>) => {
      if (!this.uow) 
        entity;

      const loaded = this.uow.load(entityName, entity.id);

      if (!loaded) {
        this.uow.registerClean(loaded);
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
    if (this.uow.isNew(e) || this.uow.isClean(e)) {
      this.uow.registerDirty(e);
      return;
    }

    this.uow.registerNew(e);
  }

  public async saveCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.save(e);
    }
  } 

  public async remove(e: Entity<any>) {
    this.uow.registerRemoved(e);
  }

  public async removeCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.remove(e);
    }
  }

  public async endTransaction() {
    await this.uow.commit();
    this.uow = undefined;
  }
}

type GConstructor<T = {}> = new (...args: any[]) => T;
export type Repository = GConstructor<IRepository>;
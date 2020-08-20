import { UnitOfWork, Entity } from '@entities';

export default interface Repository<T> {
  remove(t: T): Promise<void>;
  removeCollection(t: T): Promise<void>;
  save(t: T): Promise<void>;
  saveCollection(t: Array<T>): Promise<void>
}

export class BaseRepository<T> {
  constructor() { };

  save(e: Entity<any>) {
    const uow = UnitOfWork.getCurrent();

    if (uow.isNew(e) || uow.isClean(e)) {
      uow.registerDirty(e);
      return;
    }

    uow.registerNew(e);
  }

  saveCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.save(e);
    }
  } 

  remove(e: Entity<any>) {
    UnitOfWork.getCurrent().registerRemoved(e);
  }

  removeCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.remove(e);
    }
  }
}
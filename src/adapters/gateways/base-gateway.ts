import { UnitOfWork, Entity } from '@entities';

export default interface Repository<T> {
  remove(t: T): Promise<void>;
  removeCollection(t: T): Promise<void>;
  save(t: T): Promise<void>;
  saveCollection(t: Array<T>): Promise<void>
}

export class BaseGateway {
  private uow: UnitOfWork | undefined;

  public startTransaction() {
    this.uow = new UnitOfWork();
  }

  public save(e: Entity<any>) {
    if (this.uow.isNew(e) || this.uow.isClean(e)) {
      this.uow.registerDirty(e);
      return;
    }

    this.uow.registerNew(e);
  }

  public saveCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.save(e);
    }
  } 

  public remove(e: Entity<any>) {
    this.uow.registerRemoved(e);
  }

  public removeCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.remove(e);
    }
  }

  public async endTransaction() {
    await this.uow.commit();
    this.uow = undefined;
  }

}
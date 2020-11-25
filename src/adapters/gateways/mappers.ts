import { Entity } from '@entities'

export interface DataMapper {
  find(criteria: any): Promise<Entity<any>>
  findAll(criteria: any): Promise<Entity<any>[]>
  insert(e: Entity<any>): Promise<void>;
  update(e: Entity<any>): Promise<void>;
  delete(e: Entity<any>): Promise<void>;
};

export interface TransactionalDataMappers {
  startTransaction(): Promise<void>;
  getEntityMapper(entity: string): DataMapper;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
import { Entity } from '@entities'

export interface Mapper {
  find(criteria: any): Promise<Entity<any>>
  findAll(criteria: any): Promise<Entity<any>[]>
  insert(e: Entity<any>): Promise<void>;
  update(e: Entity<any>): Promise<void>;
  delete(e: Entity<any>): Promise<void>;
};

export interface Mappers {
  [entity: string]: Mapper
};
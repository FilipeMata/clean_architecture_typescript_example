import { Entity } from '@entities'

export interface Mapper {
  find(criteria: any): Promise<Entity<any>>
  insert(e: Entity<any>): Promise<void>;
  update(e: Entity<any>): Promise<void>;
  delete(e: Entity<any>): Promise<void>;
};

export interface Mappers {
  [entity: string]: Mapper
};

export default class MapperRegistry {
  public static mappers: Mappers;

  public static init(mappers: Mappers) {
    MapperRegistry.mappers = mappers;
  }

  public static getEntiyMapper(entityClass: string): Mapper {
    if (!MapperRegistry.mappers) {
      throw new Error('There is no initialized Mappers');
    }

    if (!MapperRegistry.mappers[entityClass]) {
      throw new Error(`There is no initialized Mapper for ${entityClass} entity`);
    }

    return MapperRegistry.mappers[entityClass];
  }
};
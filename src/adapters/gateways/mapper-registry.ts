import { Mapper, Mappers } from "./mappers";

export class MapperRegistry {
  private static _soleinstance: MapperRegistry;
  private _mappers: Mappers;

  private constructor(mappers: Mappers) {
    this._mappers = mappers;
  }

  public getEntityMapper(entityName: string): Mapper {
    return this._mappers[entityName];
  }

  public static initialize(mappers: Mappers) {
    MapperRegistry._soleinstance = new MapperRegistry(mappers);
  }

  public static getInstance(): MapperRegistry {
    return MapperRegistry._soleinstance;
  }

  public static getEntiyMapper(entityName: string): Mapper {
    if (!MapperRegistry.getInstance()) {
      throw new Error('There is no initialized Mappers');
    }

    if (!MapperRegistry.getInstance().getEntityMapper(entityName)) {
      throw new Error(`There is no initialized Mapper for ${entityName} entity`);
    }

    return MapperRegistry.getInstance().getEntityMapper(entityName);
  }
};
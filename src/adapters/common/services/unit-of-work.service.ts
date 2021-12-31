import { UnitOfWork } from "../interfaces/unit-of-work";

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function MixUnitOfWorkService<TBase extends GConstructor>(Gateway: TBase) {
  return class UnitOfWorkService extends Gateway implements UnitOfWork {
    private _uow: UnitOfWork;

    constructor(...args: any[]) {
      super(...args);
      this._uow = args[0].unitOfWork;
    }

    public async startTransaction(): Promise<void> {
      return this._uow.startTransaction();
    }

    public async commitTransaction(): Promise<void> {
      return this._uow.commitTransaction();
    }

    public async rollbackTransaction(): Promise<void> {
      return this._uow.rollbackTransaction();
    }
  }
}
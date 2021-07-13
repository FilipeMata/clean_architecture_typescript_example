import { DomainError } from '@entities';
import { ApplicationError } from './errors';
import Presenter from './presenter';

export default abstract class Interactor<InputModel, ResponseModel> {

  private _presenter: Presenter<ResponseModel>;

  protected abstract execute(input: InputModel): Promise<ResponseModel>

  constructor(presenter: any) {
    this._presenter = presenter;
  }
  
  public async run(input: InputModel) {

    try {

      const response = await this.execute(input);
      this._presenter.showSuccess(response);
    } catch (err) {
      
      if (err instanceof ApplicationError || err instanceof DomainError) {
        return this._presenter.showError(err as Error);
      }

      return this._presenter.showError(
        new ApplicationError('unexpected_failure')
      );
    }
  }
}
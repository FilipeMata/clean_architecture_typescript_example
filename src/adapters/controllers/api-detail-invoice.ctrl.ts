import DetailInvoiceInputPort  from '../../application/use-cases/detail-invoice/detail-invoice.input';

type APIDetailInvoiceInput = {
  params: any,
  headers?: any,
  body: any
}

export default class APIDetailInvoiceController {
  private _input: APIDetailInvoiceInput;
  private _detailInvoiceInteractor: DetailInvoiceInputPort

  constructor(input: APIDetailInvoiceInput, interactor: DetailInvoiceInputPort) {
    this._input = input;
    this._detailInvoiceInteractor = interactor;
  }

  async run() {
      await (await this._detailInvoiceInteractor.execute(this._input.params.id));
  }
};

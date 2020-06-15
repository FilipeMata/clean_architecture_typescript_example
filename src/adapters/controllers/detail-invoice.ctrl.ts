import DetailInvoiceInputPort  from '../../application/use-cases/detail-invoice/detail-invoice.input';

type DetailInvoiceHTTPInput = {
  params: any,
  headers?: any,
  body: any
}

export default class DetailInvoiceController {
  private _input: DetailInvoiceHTTPInput;
  private _detailInvoiceInteractor: DetailInvoiceInputPort

  constructor(input: DetailInvoiceHTTPInput, interactor: DetailInvoiceInputPort) {
    this._input = input;
    this._detailInvoiceInteractor = interactor;
  }

  async run() {
      await (await this._detailInvoiceInteractor.execute(this._input.params.id));
  }
};

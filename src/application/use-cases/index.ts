import * as GenerateInvoice from "./generate-invoice/index";
import * as DetailInvoice from './detail-invoice/index';

const useCases = {
  GenerateInvoice: GenerateInvoice,
  DetailInvoice: DetailInvoice
};

export { useCases as UseCases }
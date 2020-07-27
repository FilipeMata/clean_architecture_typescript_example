import DetailInvoiceResponseDTO from './detail-invoice-response.dto';
import { Result } from '../../../shared/Result';

export default interface DetailInvoiceInputPort {
  execute(invoiceId: string): Promise<Result<DetailInvoiceResponseDTO>>
};

import BaseRepository from '../common/repositories/base-repository';
import MixOrderRepository from '../common/repositories/order.rep';
import MixInvoiceService from '../common/services/invoice.service';

const GenerateOrderInvoiceGateway = MixInvoiceService(MixOrderRepository(BaseRepository));
export default GenerateOrderInvoiceGateway;

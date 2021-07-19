import MixOrderRepository from '../common/repositories/order.rep';
import MixInvoiceService from '../common/services/invoice.service';

const GenerateOrderInvoiceGateway = MixInvoiceService(MixOrderRepository(class {}));
export default GenerateOrderInvoiceGateway;

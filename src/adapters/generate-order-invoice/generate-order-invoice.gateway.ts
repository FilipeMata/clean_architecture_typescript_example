import MixOrderRepository from '../common/repositories/order.rep';
import MixInvoiceService from '../common/services/invoice.service';
import MixUnitOfWorkService from '../common/services/unit-of-work.service';

const GenerateOrderInvoiceGateway = MixUnitOfWorkService(MixInvoiceService(MixOrderRepository(class {})));
export default GenerateOrderInvoiceGateway;

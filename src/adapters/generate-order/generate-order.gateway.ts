import MixCustomerRepositoy from '../common/repositories/customer.rep';
import MixProductRepository from '../common/repositories/product.rep';
import MixOrderRepository from '../common/repositories/order.rep';
import MixUnitOfWorkService from '../common/services/unit-of-work.service';

const GenerateOrderGateway = MixUnitOfWorkService(MixOrderRepository(MixCustomerRepositoy(MixProductRepository(class {}))));
export default GenerateOrderGateway;

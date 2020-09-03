import BaseRepository from './repositories/base-repository';
import MixCustomerRepositoy from './repositories/customer.rep';
import MixProductRepository from './repositories/product.rep';
import MixOrderRepository from './repositories/order.rep';
import MixInvoiceService from './services/invoice.service';

import applyMixings  from '@shared/applyMixings';

export { Mapper, Mappers } from './mappers';
export { MapperRegistry } from './mapper-registry';
export { InvoiceGateway } from './services/invoice.service';
export { OrderData, InvoiceData } from '@useCases/common/dtos'

export const GetOrderDataGateway = MixOrderRepository(BaseRepository);
export const GenerateOrderGateway = MixCustomerRepositoy(MixProductRepository(BaseRepository));
export const GenerateOrderInvoiceGateway = MixInvoiceService(MixOrderRepository(BaseRepository));

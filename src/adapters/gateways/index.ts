import BaseRepository from './repositories/base-repository';
import MixCustomerRepositoy from './repositories/customer.rep';
import MixProductRepository from './repositories/product.rep';
import MixOrderRepository from './repositories/order.rep';

import InvoiceService from './services/invoice.service';
import applyMixings  from '@shared/applyMixings';

export { Mapper, Mappers } from './mappers';
export { MapperRegistry } from './mapper-registry';

export const GetOrderDataGateway = MixOrderRepository(BaseRepository);
export const GenerateOrderGateway = MixCustomerRepositoy(MixProductRepository(BaseRepository));

let GenerateOrderInvoiceGateway = MixOrderRepository(BaseRepository)
applyMixings(GenerateOrderInvoiceGateway, [ InvoiceService ]);
export { GenerateOrderInvoiceGateway };
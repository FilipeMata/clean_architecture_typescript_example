import InvoiceRepository from '@useCases/gateways/invoice.rep';
import CustomerRepository from '@useCases/gateways/customer.rep';
import ProductRepository from '@useCases/gateways/product.rep';

import { ItemDTO, GenerateChargeDTO, ThirdPartyPaymentService } from '@useCases/gateways/thrid-party-payment.service';

import { Result } from '@shared/Result';

class DetailInvoiceInteractor {
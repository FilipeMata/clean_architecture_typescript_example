import DetailInvoiceGateway from '../../application/use-cases/detail-invoice/detail-invoice.gateway';
import { UniqueEntityID } from '@entities';
import { Customer, Invoice, Product} from '@entities';


interface CustomerRepositoryForDetailInvoice {
  getCustomerById(customerId: UniqueEntityID): Promise<Customer>
};

interface ProductRepositoryForDetailInvoice {
  getProductById(productId: UniqueEntityID): Promise<Product>
};


interface InvoiceRepositoryForDetailInvoice {
  getInvoiceById(customerId: UniqueEntityID): Promise<Invoice>
};


export default class DetailInvoiceGatewayImpl implements DetailInvoiceGateway {
  private _customerRep: CustomerRepositoryForDetailInvoice;
  private _productRep: ProductRepositoryForDetailInvoice;
  private _invoiceRep: InvoiceRepositoryForDetailInvoice;

  constructor(
    customerRep: CustomerRepositoryForDetailInvoice,
    productRep: ProductRepositoryForDetailInvoice,
    invoiceRep: InvoiceRepositoryForDetailInvoice
  ) {
    this._customerRep = customerRep;
    this._productRep = productRep;
    this._invoiceRep = invoiceRep;
  }
  
  async getCustomerById(customerId: UniqueEntityID): Promise<Customer> {
    return this._customerRep.getCustomerById(customerId);
  };

  getProductById(productId: UniqueEntityID): Promise<Product> {
    return this._productRep.getProductById(productId);
  }

  getInvoiceById(invoiceId: UniqueEntityID): Promise<Invoice> {
    return this._invoiceRep.getInvoiceById(invoiceId);
  }
}
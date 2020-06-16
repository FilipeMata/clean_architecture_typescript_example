import { Customer, Invoice, Product, UniqueEntityID } from "@entities";

export default interface DetailInvoiceGateway {
  getInvoiceById(invoiceId: UniqueEntityID): Promise<Invoice>;
  getProductById(productId: UniqueEntityID): Promise<Product>;
  getCustomerById(customerId: UniqueEntityID): Promise<Customer>;
};
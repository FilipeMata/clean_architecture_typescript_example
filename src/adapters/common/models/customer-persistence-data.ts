import { Address, Customer, UniqueEntityID } from "@entities";

export default interface CustomerPersistenceData {
  id: number;
  document: string;
  name: string;
  cellphone: string;
  email: string;
  birthdate: Date;
  address: any;
}

export function toDomain(customer: CustomerPersistenceData): Customer {
  return Customer.build({
    id: new UniqueEntityID(customer.id),
    address: Address.build(customer.address),
    birthdate: customer.birthdate,
    cellphone: customer.cellphone,
    document: customer.document,
    email: customer.email,
    name: customer.name
  })
}

export function toPersistence(customer: Customer): Partial<CustomerPersistenceData> {
  const customerPersistenceData: Partial<CustomerPersistenceData> = {}
  
  if (customer.isNew || customer.getDirtyProps().includes('id')) {
    customerPersistenceData.id = +customer.id.toValue();
  }
  
  if (customer.isNew || customer.getDirtyProps().includes('document')) {
    customerPersistenceData.document = customer.document;
  }

  if (customer.isNew || customer.getDirtyProps().includes('email')) {
    customerPersistenceData.email = customer.email;
  }

  if (customer.isNew || customer.getDirtyProps().includes('cellphone')) {
    customerPersistenceData.cellphone = customer.cellphone;
  }

  if (customer.isNew || customer.getDirtyProps().includes('name')) {
    customerPersistenceData.name = customer.name;
  }

  if (customer.isNew || customer.getDirtyProps().includes('birthdate')) {
    customerPersistenceData.birthdate = customer.birthdate;
  }

  if (customer.isNew || customer.getDirtyProps().includes('address')) {
    customerPersistenceData.address = customer.address.toValue()
  }
  
  return customerPersistenceData;
}
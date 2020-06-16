export default interface DetailInvoiceInputPort {
  execute(invoiceId: string): Promise<void>;
};

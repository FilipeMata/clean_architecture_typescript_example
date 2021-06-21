import LineItemDBModel from "./line-item-db-model";

export default interface OrderDBModel {
  id: string;
  customer_id: string;
  invoice_number: string;
  invoice_url: number;
  billing_address: JSON;
  line_items?: LineItemDBModel[];
}
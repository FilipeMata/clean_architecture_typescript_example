export default interface CustomerDBModel {
  id: string;
  document: string;
  name: string;
  cellphone: number;
  email: string;
  birthdate: Date;
  address: JSON;
}
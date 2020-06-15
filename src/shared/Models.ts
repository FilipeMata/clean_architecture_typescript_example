export interface AddressInputModel {
    street: string;
    neighborhood: string;
    number: number;
    city: string;
    state: string;
    country: string;
    complement: string;
    zipcode: string;
}

export interface ClientInputModel extends AddressInputModel {
    document: string;
    clientName: string;
    cellphone: string;
    email: string;
    birthdate: Date;
}
import { Address } from '@entities/Address';

class Client {

    public document: string;
    public name: string;
    public cellphone: string;
    public email: string;
    public birthdate: Date;
    public address: Address;
   

    constructor(document: string, name: string, cellphone: string, 
                email: string, birthdate: Date, address: Address) {
        this.document = document;
        this.name = name;
        this.cellphone = cellphone;
        this.email = email;
        this.birthdate = birthdate;
        this.address = address;
    }
}

export { Client };

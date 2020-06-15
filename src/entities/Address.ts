class Address {

    public id: number;
    public street: string;
    public neighborhood: string;
    public number: number;
    public state: string;
    public country: string;
    public complement: string;
    public zipcode: string;

    constructor(id: number, street: string, neighborhood: string, number: number,
               state: string, country: string, complement: string, zipcode: string) {
        this.id = id;
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.state = state;
        this.country = country;
        this.complement = complement;
        this.zipcode = zipcode;
    }
}

export { Address };

import { Client } from '@entities/Client';
import { Product } from '@entities/Product';

class Invoice {

    public protocol: number;
    public value: number;
    public status: string;
    public client: Client;
    public products: Array<Product>;

    constructor(protocol: number, value: number, client: Client, 
                products: Array<Product>, status?: string) {
        this.protocol = protocol;
        this.value = value;
        this.status = status || 'waiting';
        this.client = client;
        this.products = products;

    }
}

export { Invoice };

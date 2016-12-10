export class Product {
    _id: string;
    name: string;
    description: string;
    price: string;
    constructor(_id: string, name: string, description: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
    }
}


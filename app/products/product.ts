export class Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    photos: any;
    constructor(_id: string, name: string, description: string, price: number, discount: number, photos: any) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.photos = photos;
    }
}


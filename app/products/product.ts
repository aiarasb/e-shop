<<<<<<< HEAD
export class Product {
    _id: string;
    name: string;
    description: string;
    price: string;
    quantity: number;
}
=======
export class Product {
    _id: string;
    name: string;
    description: string;
    constructor(_id: string, name: string, description: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
    }
}

>>>>>>> refs/remotes/origin/master

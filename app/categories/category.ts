export class Category {

    _id: string;
    name: string;
    description: string;
    products: Array<string>;

    constructor(_id: string, name: string, description: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
    }
}

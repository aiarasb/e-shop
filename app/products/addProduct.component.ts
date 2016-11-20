import { Component } from '@angular/core';
import { Product }    from './product';

import { ProductService } from '../services/product.service'

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'addProduct.component.html',
    styleUrls: ['addProduct.component.css']
})

export class addProductComponent {
    products: Product[];

    constructor (
        private productService: ProductService
    ) {}

    addProduct(name: string, description: string, price: number, quantity: number): void {
        if (!name) { return; }
        if (!price) { return;}
        if (!quantity) { return;}
        this.productService.addProduct(name, description, price, quantity);
    }
}

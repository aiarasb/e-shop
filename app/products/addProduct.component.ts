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
    errorMessage: string;
    products: Product[];

    constructor (
        private productService: ProductService
    ) {}

    addProduct(name: string): void {
        if (!name) { return; }
        this.productService.addProduct(name);
    }
}

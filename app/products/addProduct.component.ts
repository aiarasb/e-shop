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

    addProductInput() {
        let parentDiv = document.getElementById('photo-links');
        let container = document.createElement('div');
        container.className = 'photo-link-container';
        container.innerHTML = '<input class="photo-link-input" type="text"  name="photo-link-input">';
        parentDiv.appendChild(container);
    }

    addProduct(name: string, description: string, price: number, quantity: number): void {
        if (!name) { return; }
        if (!price) { return;}
        if (!quantity) { return;}
        this.productService.addProduct(name, description, price, quantity);
    }
}

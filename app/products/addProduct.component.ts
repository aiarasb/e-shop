import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'addProduct.component.html',
    styleUrls: ['addProduct.component.css']
})

export class addProductComponent {

    inputData = [
        {
            name:'cover image link',
        }
    ]
        ;

    constructor (
        private productService: ProductService
    ) {}

    addProductInput() {
        this.inputData.push({
            name: 'image link',
        })
    }

    removeProductInput(event) {
        let eventParent = event.target.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }

    addProduct(name: string, description: string, price: number, quantity: number): void {
        if (!name) { return; }
        if (!price) { return;}
        if (!quantity) { return;}
        this.productService.addProduct(name, description, price, quantity);
    }
}

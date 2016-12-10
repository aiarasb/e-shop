import { Component } from '@angular/core';
import { ProductService } from '../services/product.service'

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'addProduct.component.html',
    styleUrls: ['addProduct.component.css']
})

export class addProductComponent {
    constructor (
        private productService: ProductService,
    ) {}

    addProductInput() {
        let parentDiv = document.getElementById('photo-links');
        let container = document.createElement('div');

        container.className = 'photo-link-container';
        container.innerHTML = `<div class="photo-link-container"><input class="photo-link-input" type="text"  name="photo-link-input">
        <button type="button" class="link-input-remove" (click)="removeProductInput($event)">Remove</button></div>`;
        parentDiv.appendChild(container);
    }

    removeProductInput(event) {
        let eventNode = event.srcElement.parentNode;
        eventNode.parentNode.removeChild(eventNode);
    }

    addProduct(name: string, description: string, price: number, quantity: number): void {
        if (!name) { return; }
        if (!price) { return;}
        if (!quantity) { return;}
        this.productService.addProduct(name, description, price, quantity);
    }


}

import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from './product';

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'productForm.component.html'
})

export class AddProductComponent {

    products: Product[];

    inputData = [
        {
            name:'cover image link',
            cover: true
        }
    ];

    constructor (
        private productService: ProductService,
        private router: Router
    ) {}

    addProductInput()
    {
        this.inputData.push({
            name: 'image link',
            cover: false
        })
    }

    removeProductInput(event): void
    {
        let eventParent = event.target.parentNode.parentNode.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }

    addProduct(
        name: string,
        description: string,
        price: number,
        quantity: number,
        discount: number
    ): void {
        this.productService.addProduct(name, description, price, quantity, discount);
    }

    gotoProductsPage(): void {
        this.router.navigate(['/products']);
    }
}

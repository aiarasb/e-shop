import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from './product';

@Component({
    moduleId: module.id,
    selector: 'editProduct-form',
    templateUrl: 'productForm.component.html',
    styleUrls: ['productForm.component.css']
})

export class EditProductComponent {
    private hideId=true;
    product = new Product('', '', '', 0.0, 0, 0, []);
    inputData = [
        {
            name:'cover image link',
            display: false
        }
    ];

    constructor (
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    addProductInput()
    {
        this.inputData.push({
            name: 'image link',
            display: true
        })
    }

    removeProductInput(event): void
    {
        let eventParent = event.target.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }

    getProduct(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.productService.getProductByName(name).subscribe(product => this.product = product);
        });
    }

    ngOnInit(): void {
        this.getProduct();
    }

    updateProduct(
        id: string,
        name: string,
        description: string,
        price: number,
        quantity: number,
        discount: number
    ): void {
            this.productService.updateProduct(id,name, description, price, quantity, discount);
    }
    gotoProductsPage(): void {
        this.router.navigate(['/products']);
    }
}

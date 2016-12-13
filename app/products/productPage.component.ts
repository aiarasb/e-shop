import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from './product';
import {ProductService} from "../services/product.service";

@Component({
    moduleId: module.id,
    selector: 'product-page',
    templateUrl: 'productPage.component.html',
})

export class ProductPageComponent {

    product = new Product('', '', '', 0.0, 0, []);

    constructor (
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    getProduct(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.productService.getProductByName(name).subscribe(product => this.product = product);
        });
    }

    ngOnInit(): void {
        this.getProduct();
    }
}

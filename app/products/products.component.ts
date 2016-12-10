import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product'
import { ProductService } from '../services/product.service'


@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
})

export class ProductsComponent {
    products: Product[];
    constructor (
        private router: Router,
        private productService: ProductService
    ) {}

    gotoProductAdd(): void {
        this.router.navigate(['/products/add']);
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => this.products = products);
    }

    ngOnInit(): void {
        this.getProducts();
    }
}

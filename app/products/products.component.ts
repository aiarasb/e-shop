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
    private hideId: boolean = true;
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

    editProduct(productName: string): void {
        this.router.navigate(['products/edit/', productName]);
    }

    deleteProduct(idProduct: string): void {
        if (idProduct) {
            this.productService.deleteProduct(idProduct);

            let tableRow = document.getElementById(idProduct);
            tableRow.parentNode.removeChild(tableRow);
        }
    }
}

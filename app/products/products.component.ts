import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product'
import { ProductService } from '../services/product.service'
import { PagerService } from '../services/pager.service'

@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
})

export class ProductsComponent {

    private hideId: boolean = true;
    products: Product[];
    private  pager: any = {};
    private pagedProducts: any[];

    constructor (
        private router: Router,
        private productService: ProductService,
        private pagerService: PagerService
    ) {}

    gotoProductAdd(): void {
        this.router.navigate(['/products/add']);
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
            this.setPage(1);
        });
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

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.products.length, page);

        // get current page of items
        this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}

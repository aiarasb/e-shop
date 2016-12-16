import { Component } from '@angular/core';
import { Product } from '../products/product';
import {ProductService} from "../services/product.service";
import {PagerService} from "../services/pager.service";
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent {

    private productsPerPage = 10;

    private products: Product[];
    private  pager: any = {};
    private pagedProducts: any[];

    constructor (
        private productService: ProductService,
        private pagerService: PagerService,
        private router: Router
    ) {}

    getProducts(): void {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
            this.setPage(1);
        });
    }

    ngOnInit(): void {
        this.getProducts();

    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.products.length, page, this.productsPerPage);
        this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    gotoProductPage(name: string): void {
        this.router.navigate(['/product', name]);
    }
}

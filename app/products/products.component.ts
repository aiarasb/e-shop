import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product'
import { ProductService } from '../services/product.service'
import { PagerService } from '../services/pager.service'
import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css']
})

export class ProductsComponent {
    private productsPerPage = 10;
    private displayProducts = false;
    private hideId: boolean = true;
    products: Product[];
    private  pager: any = {};
    private pagedProducts: any[];
    private showProducts = false;

    constructor (
        private router: Router,
        private productService: ProductService,
        private pagerService: PagerService,
        private apiService: ApiService
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
        this.apiService.getUser(window.localStorage.getItem('userId'), (res) => {
            if(res.success === 'true') {
                this.getProducts();
                if (this.products) {
                    this.displayProducts = true;
                }
                if(res.payload.role === 'admin' || res.payload.role === 'rootAdmin') {
                    this.showProducts = true;
                }
            }
        });
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

        this.pager = this.pagerService.getPager(this.products.length, page, this.productsPerPage);
        this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}

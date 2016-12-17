import {Component, Input, SimpleChanges} from '@angular/core';
import {Product} from "../products/product";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../categories/category";
import {PagerService} from "../services/pager.service";

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent {
    products: Product[];
    results: Product[] = [];
    pagedResults: Product[];
    categories: Category[];
    pager: any = {};
    productsPerPage: number = 10;
    searchField: string;
    priceFrom: number;
    priceTo: number;
    maxPrice: number;
    discounted: boolean = false;

    constructor(private router: Router,
                private categoryService: CategoryService,
                private pagerService: PagerService,
                private productService: ProductService) {
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => this.products = products);
    }

    setPage(page: number): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        if (this.results.length > 0) {
            this.pager = this.pagerService.getPager(this.results.length, page, this.productsPerPage);
            this.pagedResults = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
        } else {
            this.pagedResults = [];
            this.pager = {
                totalItems: 0,
                currentPage: 1,
                pageSize: 10,
                totalPages: 1,
                startPage: 1,
                endPage: 1,
                startIndex: 0,
                endIndex: 0,
                pages: [1]
            };
        }
    }

    doSearch(): void {
        if (this.searchField) {
            let re = new RegExp(this.searchField);

            let tempRes = this.products.filter(function (value: Product) {
                return re.test(value.name);
            });

            let maxPrice = 0;
            tempRes.forEach(function (value) {
                maxPrice = value.price > maxPrice ? value.price : maxPrice;
            });
            this.maxPrice = maxPrice;

            let price = {
                from: this.priceFrom ? this.priceFrom : 0,
                to: this.priceTo ? this.priceTo : this.maxPrice,
                discounted: this.discounted
            };

            this.results = tempRes.filter(function (value: Product) {
                return value.price >= price.from
                    && value.price <= price.to
                    && ((price.discounted && value.discount > 0) || !price.discounted);
            });
        } else {
            this.results = [];
        }
        this.setPage(1);
    }

    ngOnInit(): void {
        this.getCategories();
        this.getProducts();
        this.setPage(1);
    }
}

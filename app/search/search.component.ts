import {Component, Input, SimpleChanges} from '@angular/core';
import {Product} from "../products/product";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../categories/category";

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent {
    products: Product[];
    categories: Category[];
    results: Product[];

    constructor(private router: Router,
                private categoryService: CategoryService,
                private productService: ProductService) {
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => this.products = products);
    }

    doSearch(event: any): void {
        if (event.target.value) {
            let re = new RegExp(event.target.value);
            this.results = this.products.filter(function (value:Product) {
                return re.test(value.name);
            });
        } else {
            this.results = null;
        }
    }

    ngOnInit(): void {
        this.getCategories();
        this.getProducts();
    }
}

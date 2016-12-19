import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Category} from './category';
import {CategoryService} from '../services/category.service'
import {ProductService} from "../services/product.service";
import {Product} from "../products/product";
import {ApiService} from "../services/api.service";

@Component({
    moduleId: module.id,
    selector: 'category',
    templateUrl: 'category.component.html',
})

export class CategoryComponent {
    category: Category;
    oldCategory: Category;
    products: Product[];
    private userIsAdmin = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private categoryService: CategoryService,
                private productService: ProductService,
                private apiService: ApiService) {
    }

    getCategory(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.categoryService.getCategory(name).subscribe(category => this.category = category);
        });
    }

    getProducts(): void {
        this.productService.getProductsByCategoryId(this.category._id).subscribe(products => this.products = products);
    }

    gotoProductPage(name: string): void {
        this.router.navigate(['/product', name]);
    }

    deleteCategory(category): void {
        this.categoryService.deleteCategory(category);
        this.router.navigate(['/categories']);
    }

    editCategory(category): void {
        this.router.navigate(['category/edit', category.name]);
    }

    ngOnInit(): void {
        this.getCategory();
        this.apiService.getUser(window.localStorage.getItem('userId'), (res) => {
            if(res.success === 'true') {
                if(res.payload.role === 'admin' || res.payload.role === 'rootAdmin') {
                    this.userIsAdmin = true;
                }
            }
        });
    }

    ngDoCheck(): void {
        if (this.category != this.oldCategory) {
            this.products = [];
            this.getProducts();
            this.oldCategory = this.category;
        }
    }
}

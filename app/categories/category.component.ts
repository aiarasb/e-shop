import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Category} from './category';
import {CategoryService} from '../services/category.service'
import {ProductService} from "../services/product.service";
import {Product} from "../products/product";

@Component({
    moduleId: module.id,
    selector: 'category',
    templateUrl: 'category.component.html',
    styleUrls: ['categories.component.css']
})

export class CategoryComponent {
    category: Category;
    oldCategory: Category;
    products: Product[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private categoryService: CategoryService,
                private productService: ProductService) {
    }

    getCategory(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.categoryService.getCategory(name).subscribe(category => this.category = category);
        });
    }

    getProducts(): void {
        if (this.category) {
            this.productService.getProductsById(this.category.products).subscribe(products => this.products = products);
        }
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
    }

    ngDoCheck(): void {
        if (this.category != this.oldCategory) {
            this.products = [];
            this.getProducts();
            this.oldCategory = this.category;
        }
    }
}

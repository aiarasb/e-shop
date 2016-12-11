import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Category} from './category';
import {CategoryService} from '../services/category.service'
import {ProductService} from "../services/product.service";
import {Product} from "../products/product";

@Component({
    moduleId: module.id,
    selector: 'categoryList',
    templateUrl: 'categoryList.component.html',
    styleUrls: ['categories.component.css']
})

export class CategoryListComponent {
    category: Category;
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
        console.log(this.category);
    }

    // getProducts(): void {
    //     if (!isUndefined(this.category)) {
    //         this.category.products.forEach(function (productId) {
    //             this.productService.getProductById(productId).subscribe(product => this.products[product._id] = product);
    //         });
    //     }
    // }

    gotoProduct(product): void {
        this.router.navigate(['/products/show', product.name]);
    }

    ngOnInit(): void {
        this.getCategory();
        // this.getProducts();
    }

}

import {Component} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';
import {Product} from './product';
import {Category} from "../categories/category";
import {CategoryService} from "../services/category.service";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'productForm.component.html'
})

export class AddProductComponent {
    product = new Product('', '', '', 0, 0, 0, [], []);
    categories: Category[];
    categoriesList: IMultiSelectOption[] = [];
    inputData = [
        {
            name: 'cover image link',
            cover: true
        }
    ];

    constructor(private productService: ProductService,
                private categoryService: CategoryService,
                private router: Router) {
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    transformCategories(): void {
        if (this.categories) {
            this.categoriesList = this.categories.map(function (value) {
                return {
                    id: value._id,
                    name: value.name
                };
            })
        }
    }

    addProductInput() {
        this.inputData.push({
            name: 'image link',
            cover: false
        })
    }

    removeProductInput(event): void {
        let eventParent = event.target.parentNode.parentNode;
        eventParent.parentNode.removeChild(eventParent);
    }


    onSubmit(): void {
        this.productService.addProduct(this.product);
        this.router.navigate(['/products'])
    }

    gotoProductsPage(): void {
        this.router.navigate(['/products']);
    }

    ngOnInit(): void {
        this.getCategories();
    }
}

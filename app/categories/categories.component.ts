import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Category} from './category';
import {CategoryService} from '../services/category.service'
import {ApiService} from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'categories',
    templateUrl: 'categories.component.html',
})

export class CategoriesComponent {
    categories: Category[];
    private userIsAdmin = false;

    constructor(private router: Router,
                private categoryService: CategoryService,
                private apiService: ApiService) {
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    addCategory(): void {
        this.router.navigate(['/category/add']);
    }

    gotoCategory(category): void {
        this.router.navigate(['/category/show', category.name]);
    }

    ngOnInit(): void {
        this.getCategories();
        this.apiService.getUser(window.localStorage.getItem('userId'), (res) => {
            if (res.success === 'true') {
                if (res.payload.role === 'admin' || res.payload.role === 'rootAdmin') {
                    this.userIsAdmin = true;
                }
            }
        });
    }
}

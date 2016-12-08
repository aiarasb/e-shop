import { Component } from '@angular/core';
import { Category } from './category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'addCategory',
    templateUrl: 'categoryForm.component.html',
    styleUrls: ['categories.component.css']
})

export class AddCategoryComponent {
    category: Category;

    constructor (
        private categoryService: CategoryService,
        private router: Router
    ) {}

    addCategory(name: string, description: string): void {
        if (!name || !description)
            return;
        this.categoryService.addCategory(name, description);
        this.router.navigate(['/category/show', name]);
    }
}

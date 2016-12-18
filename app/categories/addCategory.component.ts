import {Component} from '@angular/core';
import {Category} from './category';
import {CategoryService} from '../services/category.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'addCategory',
    templateUrl: 'categoryForm.component.html',
})

export class AddCategoryComponent {
    category = new Category('', '', '', []);

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    onSubmit(): void {
        this.categoryService.addCategory(this.category);
        this.router.navigate(['/category/show', this.category.name]);
    }
}

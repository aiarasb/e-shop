import {Component} from '@angular/core';
import {Category} from './category';
import {CategoryService} from '../services/category.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'editCategory',
    templateUrl: 'categoryForm.component.html',
})

export class EditCategoryComponent {
    category = new Category('', '', '', []);

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    getCategory(): void {
        this.route.params.forEach((params: Params) => {
            let name = params['name'];
            this.categoryService.getCategory(name).subscribe(category => this.category = category);
        });
    }

    onSubmit(): void {
        this.categoryService.updateCategory(this.category);
        this.router.navigate(['/category/show', this.category.name]);
    }

    ngOnInit(): void {
        this.getCategory();
    }
}

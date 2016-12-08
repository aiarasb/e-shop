import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Category } from './category';
import { CategoryService } from '../services/category.service'

@Component({
    moduleId: module.id,
    selector: 'category',
    templateUrl: 'category.component.html',
    styleUrls: ['categories.component.css']
})

export class CategoryComponent {
  category: Category;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  getCategory(): void {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.categoryService.getCategory(name).subscribe(category => this.category = category);
    });
  }

  deleteCategory(category): void {
    this.categoryService.deleteCategory(category.name);
    this.router.navigate(['/categories']);
  }

  ngOnInit(): void {
    this.getCategory();
  }

}

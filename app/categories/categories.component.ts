import { Component } from '@angular/core';

import { Category } from './category';
import { CategoryService } from '../services/category.service'

@Component({
    moduleId: module.id,
    selector: 'categories',
    templateUrl: 'categories.component.html',
    styleUrls: ['categories.component.css']
})

export class CategoriesComponent {
  categories: Category[];

  constructor (
      private categoryService: CategoryService
  ) {}

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  addCategory(): void {
    this.categoryService.addCategory();
    this.getCategories();
  }

  ngOnInit(): void {
    this.getCategories();
  }

}

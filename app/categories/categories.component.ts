import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
    private categoryService: CategoryService
  ) {}

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  addCategory(): void {
    this.router.navigate(['/category/add']);
  }

  gotoCategory(category): void {
    this.router.navigate(['/category/show', category.name]);
  }

  gotoCategoryList(category): void {
    this.router.navigate(['/category/list', category.name]);
  }

  ngOnInit(): void {
    this.getCategories();
  }

}

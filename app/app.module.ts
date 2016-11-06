import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './main/app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category.component';
import { LoginComponent } from './login/login.component';

import { ApiService } from './services/api.service';
import { CategoryService } from './services/category.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule,
      HttpModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      ProductsComponent,
      CategoriesComponent,
      CategoryComponent,
      LoginComponent
  ],
  providers: [
     ApiService,
     CategoryService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

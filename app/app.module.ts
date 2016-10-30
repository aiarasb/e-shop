import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './main/app.component';

import { HomeComponent } from './home/home.component'
import { ProductsComponent } from './products/products.component'
import { CategoriesComponent } from './categories/categories.component'
import { LoginComponent } from './login/login.component'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      ProductsComponent,
      CategoriesComponent,
      LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

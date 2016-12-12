import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './main/app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { addProductComponent }    from './products/addProduct.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category.component';
import { AddCategoryComponent } from './categories/addCategory.component';
import { EditCategoryComponent } from './categories/editCategory.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './cart/order.component';

import { ApiService } from './services/api.service';
import { CategoryService } from './services/category.service';
import { PurchaseService } from './services/purchase.service';
import { ProductService } from './services/product.service';

import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from "./search/search.component";

@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      JsonpModule,
      FormsModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      ProductsComponent,
      CategoriesComponent,
      LoginComponent,
      CartComponent,
      OrderComponent,
      CategoryComponent,
      AddCategoryComponent,
      EditCategoryComponent,
      LoginComponent,
      addProductComponent,
      SearchComponent
  ],
  providers: [
     ApiService,
     CategoryService,
      PurchaseService,
     ProductService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

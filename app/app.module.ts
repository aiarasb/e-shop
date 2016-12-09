import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { HttpModule } from '@angular/http';
=======
import { HttpModule, JsonpModule } from '@angular/http';
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
import { PurchaseService } from './services/purchase.service';
=======
import { ProductService } from './services/product.service';
>>>>>>> refs/remotes/origin/master

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
<<<<<<< HEAD
=======
      JsonpModule,
>>>>>>> refs/remotes/origin/master
      FormsModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      ProductsComponent,
      CategoriesComponent,
<<<<<<< HEAD
      LoginComponent,
      CartComponent,
      OrderComponent
=======
      CategoryComponent,
      AddCategoryComponent,
      EditCategoryComponent,
      LoginComponent,
      addProductComponent
>>>>>>> refs/remotes/origin/master
  ],
  providers: [
     ApiService,
     CategoryService,
<<<<<<< HEAD
      PurchaseService
=======
     ProductService
>>>>>>> refs/remotes/origin/master
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

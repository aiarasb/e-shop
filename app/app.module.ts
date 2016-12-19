import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { AppComponent }   from './main/app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent }    from './products/addProduct.component';
import { EditProductComponent }    from './products/editProduct.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category.component';
import { AddCategoryComponent } from './categories/addCategory.component';
import { EditCategoryComponent } from './categories/editCategory.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './cart/order.component';
import { ProductPageComponent } from './products/productPage.component';
import { OrderHistoryComponent } from './cart/orderHistory.component';

import { ApiService } from './services/api.service';
import { CategoryService } from './services/category.service';
import { PurchaseService } from './services/purchase.service';
import { ProductService } from './services/product.service';
import { PagerService } from './services/pager.service';

import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      JsonpModule,
      FormsModule,
      MultiselectDropdownModule,
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
      AddProductComponent,
      EditProductComponent,
      SearchComponent,
      ProductPageComponent,
      OrderHistoryComponent,
      UserComponent,
      UsersComponent
  ],
  providers: [
     ApiService,
     CategoryService,
     PurchaseService,
     ProductService,
     PagerService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

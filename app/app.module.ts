import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './main/app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';

import { ApiService } from './services/api.service';

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
      LoginComponent
  ],
  providers: [
     ApiService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent }        from './home/home.component'
import { ProductsComponent }    from './products/products.component'
import { addProductComponent }    from './products/addProduct.component'
import { CategoriesComponent }  from './categories/categories.component'
import { CategoryComponent }    from './categories/category.component'
import { LoginComponent }       from './login/login.component'
import {AddCategoryComponent} from "./categories/addCategory.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'category/add', component: AddCategoryComponent },
    { path: 'category/show/:name', component: CategoryComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products/add-product', component: addProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

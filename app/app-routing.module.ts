import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent }        from './home/home.component'
import { ProductsComponent }    from './products/products.component'
import { CategoriesComponent }  from './categories/categories.component'
import { CategoryComponent }    from './categories/category.component'
import { LoginComponent }       from './login/login.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'category/:name', component: CategoryComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

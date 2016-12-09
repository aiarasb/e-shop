import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CartComponent }        from './cart/cart.component'
import { HomeComponent }        from './home/home.component'
import { ProductsComponent }    from './products/products.component'
import { addProductComponent }    from './products/addProduct.component'
import { CategoriesComponent }  from './categories/categories.component'
<<<<<<< HEAD
import { LoginComponent }       from './login/login.component'
import { OrderComponent }       from "./cart/order.component";

=======
import { CategoryComponent }    from './categories/category.component'
import { LoginComponent }       from './login/login.component'
import { AddCategoryComponent } from "./categories/addCategory.component";
import { EditCategoryComponent } from "./categories/editCategory.component";
>>>>>>> refs/remotes/origin/master

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
<<<<<<< HEAD
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },
=======
    { path: 'category/add', component: AddCategoryComponent },
    { path: 'category/show/:name', component: CategoryComponent },
    { path: 'category/edit/:name', component: EditCategoryComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products/add-product', component: addProductComponent }
>>>>>>> refs/remotes/origin/master
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

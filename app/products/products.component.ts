import { Component } from '@angular/core';
import {Product} from "./product";

@Component({
    moduleId: module.id,
    selector: 'products',
    template: `
    <a routerLink="/addProduct" routerLinkActive="active">Add product</a>
    <router-outlet></router-outlet>
`
})

export class ProductsComponent {
}

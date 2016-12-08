import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'products',
    template: `
    <a routerLink="add-product" routerLinkActive="active">Add product</a>
    <router-outlet></router-outlet>
`
})

export class ProductsComponent {
}

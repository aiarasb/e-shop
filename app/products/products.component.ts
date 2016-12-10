import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
})

export class ProductsComponent {

    constructor (
        private router: Router
    ) {}

    gotoProductAdd(): void {
        this.router.navigate(['/products/add']);
    }
}

import { Component } from '@angular/core';
import { Product }    from './product';

@Component({
    moduleId: module.id,
    selector: 'addProduct-form',
    templateUrl: 'addProduct.component.html'
})

export class addProductComponent {

    product = new Product(1, 'product name', 'description', '17.7' , 5);

    submitted = false;
    onSubmit() { this.submitted = true; }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.product); }
}

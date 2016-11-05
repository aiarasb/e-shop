import { Component } from '@angular/core';

import { Purchase } from './purchase';
import {Product} from "../products/product";
import { PurchaseService } from '../services/purchase.service'

@Component({
    moduleId: module.id,
    selector: 'cart',
    template: `<div class="category-container">
  <h2>Shopping cart</h2>

    <table>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Whole price</th>
        </tr>
        <tr *ngFor="let item of items; let i = index" >
            <td>{{item.name}}</td>
            <td><input [(ngModel)]="item.quantity" placeholder="Enter quantity"></td>
            <td>{{item.price}}</td>
            <td>{{item.price * item.quantity}}</td>
        </tr>
    </table>
    <div> <p>Order price: {{getAllProductsPrice()}}</p></div>
</div>
`
})

export class CartComponent {
    purchases: Purchase[];
    products: Product[];

    items : Item[] = [
        {"name":"Televizorius", "price":"500", "quantity":"2"},
        {"name":"telefonas", "price":"200", "quantity":"1"},
        {"name":"masina", "price":"1500", "quantity":"2"},
        {"name":"usb", "price":"7", "quantity":"5"},
    ];


    constructor (
        private purchaseService: PurchaseService
    ) {}

    getPurchases(): void {
        //this.purchaseService.getPurchases().subscribe(purchases => this.purchases = purchases);
        //this.purchaseService.getProduct().subscribe(products => this.products = products);
    }


    getAllProductsPrice(): number{
        var sum = 0;
        for (let i of this.items){
            sum = sum + i.price * i.quantity;
        }
        return sum;
    }

    ngOnInit(): void {
        this.getPurchases();
    }

}

export class Item {
    name: string;
    price: string;
    quantity: string;
}
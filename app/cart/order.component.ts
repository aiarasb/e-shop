import { Component } from '@angular/core';
import { Location }  from '@angular/common';

import {Order} from "./order";
import {PurchaseService} from "../services/purchase.service";
import {Product} from "../products/product";
import {Purchase} from "./purchase";

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.css']
})

export class OrderComponent {

    constructor(private location: Location, private purchaseService: PurchaseService){}

    private orders: Order[] = [];
    private purchases: Purchase[];
    private products: Product[] = [];

    private completed : boolean = false;

    goBack(): void {
        this.location.back();
    }

    getOrder(): void{
        this.purchaseService.getActiveOrder(window.localStorage.getItem('userId')).then((response) => {
            this.orders = response;

            var activeOrderId = response[0]._id;

            this.purchaseService.getPurchases(activeOrderId).then((response) => {
                this.purchases = response;

                if(this.purchases.length > 0){
                    this.getProductsRecursively(0);
                }
            });
        });
    }

    update(): void{
        this.updateOrder();
        this.updateProductQuantity();
        this.updatePurchaseDiscount();
    }

    getProductsRecursively(i : any){
        this.purchaseService.getProduct(this.purchases[i].productId).then((resp) => {
            this.products.push(resp[0]);
            if ((i+1) < this.purchases.length)
                this.getProductsRecursively(i+1);
        })
    }

    updateOrder(): void{
        var order = this.orders[0];
        order.isActive = false;

        this.purchaseService.updateOrder(this.orders[0]).then( () => {
            this.completed = true;
            this.purchaseService.createNewOrder(window.localStorage.getItem('userId'));
        });
    }

    updateProductQuantity(): void{
        for (var i = 0; i < this.products.length; i++){
            this.products[i].quantity -= this.purchases[i].quantity;
            console.log(this.products[i]);
            this.purchaseService.updateProduct(this.products[i]);
        }
    }

    updatePurchaseDiscount(): void{
        for (var i = 0; i < this.purchases.length; i++){
            this.purchases[i].discount = this.products[i].discount;
            this.purchaseService.updatePurchase(this.purchases[i]);
        }
    }

    ngOnInit() : void{
        this.getOrder();
    }

}

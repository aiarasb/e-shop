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

    private userId : any = "13";

    goBack(): void {
        this.location.back();
    }

    getOrder(): void{
        this.purchaseService.getActiveOrder(this.userId).then((response) => {
            this.orders = response;

            var activeOrderId = response[0]._id;

            this.purchaseService.getPurchases(activeOrderId).then((response) => {
                this.purchases = response;

                var ind = 0;
                for (let i of this.purchases){
                    this.purchaseService.getProduct(i.productId).then((resp) => {
                        this.products.splice(ind, 0, resp[0]);
                    })
                    ind ++;
                }
            });
        });
    }

    update(): void{
        this.updateOrder();
        this.updateProductQuantity();
        this.updatePurchaseDiscount();
    }

    updateOrder(): void{
        var order = this.orders[0];
        order.isActive = false;

        this.purchaseService.updateOrder(this.orders[0]).then( () => {
            this.completed = true;
            this.purchaseService.createNewOrder(this.userId);
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

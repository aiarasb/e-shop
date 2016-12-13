import { Component } from '@angular/core';
import {Router} from "@angular/router";

import { Purchase } from './purchase';
import {Product} from "../products/product";
import { PurchaseService } from '../services/purchase.service';


@Component({
    moduleId: module.id,
    selector: 'cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})

export class CartComponent {
    purchases: Purchase[];
    products: Product[] = [];

    userId : any = 13;

    constructor (
        private router: Router, private purchaseService: PurchaseService
    ) {}

    goToOrder(): void{
        this.updatePurchases();
        this.router.navigate(['/order']);
    }

    getPurchases(): void {

        // insert current user's id as a parameter
        this.purchaseService.getActiveOrder(this.userId).then((response) => {
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
        }).catch(() => {
            console.log("User doesn't have active order.")
        });
    }

    removePurchase(index : any) : void{
        var purchaseId = this.purchases[index]._id;
        this.products.splice(index, 1);
        this.purchases.splice(index,1);
        this.purchaseService.removePurchase(purchaseId);
    }

    updatePurchases(): void{
        for (let i of this.purchases){
            var regexp = new RegExp('^[0-9]*$');
            if (regexp.test((i.quantity).toString())){
                this.purchaseService.updatePurchase(i);
            }
        }
    }

    getAllProductsPrice(): number{
        var sum = 0;
        var ind = 0;
        for (let i of this.products){
            sum += i.price * this.purchases[ind].quantity;
            ind++;
        }
        return sum;
    }

    onQuantityChange(purchase : Purchase): void{
        console.log(purchase);
        var regexp = new RegExp('^[0-9]*$');
        console.log(purchase.quantity);
    }

    addProductToOrder(productId : any, userId : any): void{

        this.purchaseService.createNewOrder(this.userId).then(() => {
            this.purchaseService.getActiveOrder(this.userId).then((response) => {
                var activeOrderId = response[0]._id;
                this.purchaseService.addPurchase(productId, activeOrderId);

                location.reload();  // refreshes page, for cart testing only
            });
        });
    }

    ngOnInit(): void {
        this.getPurchases();
    }

    ngDoCheck(): void{
    }

}

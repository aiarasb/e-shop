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



    constructor (
        private router: Router, private purchaseService: PurchaseService
    ) {}

    goToOrder(): void{
        this.router.navigate(['/order']);
    }

    getPurchases(): void {

        // insert current user's id as a parameter
        this.purchaseService.getActiveOrder(13).then((response) => {
            var activeOrderId = response[0]._id;

            this.purchaseService.getPurchases(activeOrderId).then((response) => {
                this.purchases = response;
                console.log(response);
                var ind = 0;
                for (let i of this.purchases){
                    this.purchaseService.getProduct(i.productId).then((resp) => {
                        this.products.splice(ind, 0, resp);
                    })
                    ind ++;
                }
            });
        });


    }

    removePurchase(index : any) : void{
        var purchaseId = this.purchases[index]._id;
        this.products.splice(index, 1);
        this.purchases.splice(index,1);
        this.purchaseService.removePurchase(purchaseId);
    }

    getAllProductsPrice(): number{
        var sum = 0;
        var ind = 0;
        for (let i of this.products){
            sum += i.price * parseInt(this.purchases[ind].quantity);
            ind++;
        }
        return sum;
    }

    onQuantityChange(purchase : Purchase): void{
        console.log(purchase);
        var regexp = new RegExp('^[0-9]*$');
        console.log(purchase.quantity);
    }

    addProduct(productId : any): void{
        this.purchaseService.getActiveOrder(13).then((response) => {
            var activeOrderId = response[0]._id;

            this.purchaseService.addPurchase(productId, activeOrderId);
            location.reload();
        });
    }

    ngOnInit(): void {
        this.getPurchases();
    }

    ngDoCheck(): void{
    }

}

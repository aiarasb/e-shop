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
    private purchases: Purchase[];
    private products: Product[] = [];

    private userId : any = "13";
    private productId : any = '58502142da77270ecb6a2464';

    constructor (
        private router: Router, private purchaseService: PurchaseService
    ) {}

    goToOrder(): void{
        if(this.updatePurchases() && this.purchases.length != 0){
            this.router.navigate(['/order']);
        }
    }

    getPurchases(): void {

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

    updatePurchases(): boolean{
        let safe : boolean = true;
        for (let i of this.purchases){
            var regexp = new RegExp('^[0-9]*$');
            if (regexp.test((i.quantity).toString())){
                this.purchaseService.updatePurchase(i);
            }else{
                safe = false;
            }
        }
        return safe;
    }

    getAllProductsPrice(): number{
        var sum = 0;
        for (var i = 0; i < this.products.length; i++){
            sum += this.products[i].price * this.purchases[i].quantity;
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
                this.purchaseService.addPurchase(productId, activeOrderId, 1);

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

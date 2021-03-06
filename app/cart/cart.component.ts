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

    private userId: any = null;
    private loaded = 0;

    constructor (
        private router: Router, private purchaseService: PurchaseService
    ) {}

    goToProductPage(name: string): void {
        this.router.navigate(['/product', name]);
    }

    goToOrder(): void{
        if(this.updatePurchases() && this.purchases.length != 0){
            this.router.navigate(['/order']);
        }
    }

    getPurchases(): void {

        this.purchaseService.getActiveOrder(window.localStorage.getItem('userId')).then((response) => {
            var activeOrderId = response[0]._id;

            this.purchaseService.getPurchases(activeOrderId).then((response) => {
                this.purchases = response;

                if(this.purchases.length > 0){
                    this.getProductsRecursively(0);
                }
            });
        }).catch(() => {
            console.log("User doesn't have active order.")
        });
    }

    getProductsRecursively(i : any){
        this.purchaseService.getProduct(this.purchases[i].productId).then((resp) => {
            this.products.push(resp[0]);
            this.loaded++;
            if ((i+1) < this.purchases.length)
                this.getProductsRecursively(i+1);
        })
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

    getDiscountedProductPrice(ind : any): string{
        return  (this.products[ind].price / 100 * (100 - this.products[ind].discount)).toFixed(2);
    }

    getFullProductPrice(ind: any): any{
        return (this.products[ind].price * 1).toFixed(2);
    }

    getPurchasePrice(ind: any): string{
        var price = parseFloat(this.getDiscountedProductPrice(ind)) * this.purchases[ind].quantity;
        return price.toFixed(2);
    }

    orderPriceWithDiscount(): string{
        var sum = 0;
        for (var i = 0; i < this.products.length; i++){
            sum += parseFloat(this.getDiscountedProductPrice(i)) * this.purchases[i].quantity;
        }
        return sum.toFixed(2);
    }

    getSavedMoneyAmount(): string{
        var sum = 0;
        for (var i = 0; i < this.products.length; i++){
            var savedPerProduct = this.products[i].price - parseFloat(this.getDiscountedProductPrice(i));
            sum += savedPerProduct * this.purchases[i].quantity;
        }
        return sum.toFixed(2);
    }

    isCartEmpty(): boolean{
        return this.purchases == undefined || this.purchases.length == 0;
    }

    onQuantityChange(purchase : Purchase): void{
        var regexp = new RegExp('^[0-9]*$');
        console.log(purchase.quantity);
    }

    ngOnInit(): void {
        this.userId = window.localStorage.getItem('userId');
        this.getPurchases();
    }

    ngOnDestroy(): void{
        if(this.products.length > 0){
            this.updatePurchases();
        }
    }

}

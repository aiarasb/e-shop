import { Component } from '@angular/core';

import { Purchase } from './purchase';
import {Product} from "../products/product";
import { PurchaseService } from '../services/purchase.service';
import {Order} from "./order";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'order-history',
    templateUrl: 'orderHistory.component.html',
    styleUrls: ['orderHistory.component.css']
})

export class OrderHistoryComponent {

    private orders: Order[];
    private purchases: Purchase[] = [];
    private products: Product[]= [];

    private selected: boolean = false;
    private orderExists: boolean = true;

    private userId: any = null;
    private loaded = 0;

    constructor ( private router: Router, private purchaseService: PurchaseService)
    {}

    goToProductPage(name: string): void {
        this.router.navigate(['/product', name]);
    }

    getPurchases(selectedOrderId: any): void {

        this.purchaseService.getPurchases(selectedOrderId).then((response) => {
            this.purchases = response;
            if(this.purchases.length > 0){
                this.getProductsRecursively(0);
            }
        });
    }

    getProductsRecursively(i : any){
        this.purchaseService.getProduct(this.purchases[i].productId).then((resp) => {
            this.products.push(resp[0]);
            this.loaded++;
            if ((i+1) < this.purchases.length)
                this.getProductsRecursively(i+1);
            else{
                for (var j = 0; j < this.purchases.length; j++){
                    console.log((this.purchases[j].discount + "   " + this.products[j].name));
                }
            }
        })
    }

    getDiscountedProductPrice(ind : any): string{
        return  (this.products[ind].price / 100 * (100 - this.purchases[ind].discount)).toFixed(2);
    }

    orderPriceWithDiscount(): string{
        var sum = 0;
        for (var i = 0; i < this.products.length; i++){
            sum += parseFloat(this.getDiscountedProductPrice(i)) * this.purchases[i].quantity;
        }
        return sum.toFixed(2);
    }

    getPurchasePrice(ind: any): string{
        var price = parseFloat(this.getDiscountedProductPrice(ind)) * this.purchases[ind].quantity;
        return price.toFixed(2);
    }

    onChange(orderId : any): void {
        this.purchases = [];
        this.products = [];
        this.loaded = 0;
        this.getPurchases(orderId);
        this.selected = true;
    }

    getOrderData(): void {
            this.purchaseService.getCompletedOrders(window.localStorage.getItem('userId')).then( (orderData) => {
                this.orders = orderData;
            if (orderData.length === 0){
                this.orderExists = false;
            }else{
                this.selected = true;
                this.onChange(this.orders[0]._id);
            }
        });
    }

    ngOnInit(): void {
        this.userId = window.localStorage.getItem('userId');
        this.getOrderData();
    }

}
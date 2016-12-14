import { Component } from '@angular/core';

import { Purchase } from './purchase';
import {Product} from "../products/product";
import { PurchaseService } from '../services/purchase.service';
import {Order} from "./order";


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

    private userId: any = "13";


    constructor ( private purchaseService: PurchaseService)
    {}

    getPurchases(selectedOrderId: any): void {

        this.purchaseService.getPurchases(selectedOrderId).then((response) => {
            this.purchases = response;

            var ind = 0;
            for (let i of this.purchases){
                this.purchaseService.getProduct(i.productId).then((resp) => {
                    this.products.splice(ind, 0, resp[0]);
                })
                ind ++;
            }
        });
    }

    getAllProductsPrice(): number{
        var sum = 0;
        for (var i = 0; i < this.products.length; i++){
            sum += this.products[i].price * this.purchases[i].quantity;
        }
        return sum;
    }

    onChange(orderId : any): void {
        this.purchases = [];
        this.products = [];
        this.getPurchases(orderId);
        this.selected = true;
    }

    getOrderData(): void {
            this.purchaseService.getCompletedOrders(this.userId).then( (orderData) => {
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
        this.getOrderData();
    }

}
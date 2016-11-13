import { Component } from '@angular/core';
import { Location }  from '@angular/common';

import {Order} from "./order";
import {PurchaseService} from "../services/purchase.service";

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.css']
})

export class OrderComponent {

    constructor(private location: Location, private purchaseService: PurchaseService){}

    orders: Order[] = [];
    completed : boolean = false;


    goBack(): void {
        this.location.back();
    }

    getOrder(): void{
        this.purchaseService.getOrder(0).then((response) => {
            this.orders.push(response);
        });
    }

    updateOrder(): void{
        console.log("updating...");
        this.purchaseService.updateOrder(this.orders[0]).then( () => {
            this.completed = true
        });
    }

    ngOnInit() : void{
        this.getOrder();
    }

}

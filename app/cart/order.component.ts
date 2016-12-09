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
        // insert current user's id as a parameter
        this.purchaseService.getActiveOrder(13).then((response) => {
            console.log(response);
            this.orders = response;
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

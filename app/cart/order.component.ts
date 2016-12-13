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

    userId : any = "13";

    goBack(): void {
        this.location.back();
    }

    getOrder(): void{
        // insert current user's id from session as a parameter
        this.purchaseService.getActiveOrder(this.userId).then((response) => {
            console.log(response);
            this.orders = response;
        });
    }


    updateOrder(): void{

        var order = this.orders[0];
        order.isActive = false;

        this.purchaseService.updateOrder(this.orders[0]).then( () => {
            this.completed = true;
            this.purchaseService.createNewOrder(this.userId);
        });

        /*this.purchaseService.updateOrder(this.orders[0]).then( () => {
         this.completed = true
         });*/

    }



    ngOnInit() : void{
        this.getOrder();
    }

}

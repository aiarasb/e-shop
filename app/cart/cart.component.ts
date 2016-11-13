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
        this.purchaseService.getPurchases(1).then((response) => {
            this.purchases = response;

            var ind = 0;
            for (let i of this.purchases){
                this.purchaseService.getProduct(i.produkto_id).then((resp) => {
                    this.products.splice(ind, 0, resp);
                })
                ind ++;
            }
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
            sum += parseInt(i.kaina) * parseInt(this.purchases[ind].kiekis);
            ind++;
        }
        return sum;
    }

    ngOnInit(): void {
        this.getPurchases();
    }

}

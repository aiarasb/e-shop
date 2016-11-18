import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Purchase } from '../cart/purchase';
import {Product} from "../products/product";

import 'rxjs/add/operator/toPromise';
import {Order} from "../cart/order";

@Injectable()
export class PurchaseService {

    private apiUrl = 'http://e-shop.dev:3000';

    constructor(private http: Http) {}


    getPurchases(index : any): Promise<Purchase[]> {
        return this.http.get(this.apiUrl + '/purchase/get-by-order/' + index)
            .toPromise()
            .then(response => response.json() as Purchase[])
            .catch(this.handleError);
    }

    removePurchase(index : any) : Promise<void>{
        return this.http.get(this.apiUrl + '/purchase/remove/' + index)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    updatePurchase(newPurchase : Purchase): Promise<void> {
        return this.http.post(
            this.apiUrl + '/purchase/update',
            newPurchase
        )
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getProduct(index : any): Promise<Product> {
        return this.http.get(this.apiUrl + '/product/get/' + index)
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }

    getOrder(index: any): Promise<Order> {
        return this.http.get(this.apiUrl + '/order/get/' + index)
            .toPromise()
            .then(response => response.json() as Order)
            .catch(this.handleError);
    }

    updateOrder(newOrder: Order): Promise<void> {
        return this.http.post(
                this.apiUrl + '/order/update',
                newOrder
             )
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

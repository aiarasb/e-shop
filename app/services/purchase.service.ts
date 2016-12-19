import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Purchase } from '../cart/purchase';
import {Product} from "../products/product";

import 'rxjs/add/operator/toPromise';
import {Order} from "../cart/order";

@Injectable()
export class PurchaseService {

    private apiUrl = 'http://127.0.0.1:3000';

    private requestHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }


    getPurchases(orderId : any): Promise<Purchase[]> {
        return this.http.post(
            this.apiUrl + '/purchase/get-by-order',
            {orderId : orderId} )
            .toPromise()
            .then(response => response.json() as Purchase[])
            .catch(this.handleError);
    }

    removePurchase(id : any) : Promise<void>{
        return this.http.post(
            this.apiUrl + '/purchase/remove',
            {id : id} )
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    addPurchase(productId: any, orderId : any, quantity : number): Promise<void>{
        return this.http.post(
            this.apiUrl + '/purchase/add',
            { productId : productId, orderId : orderId, quantity : quantity}
        )
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

    getProduct(index : any): Promise<Product[]> {
        return this.http.post(
            this.apiUrl + '/products/get-by-id',
            JSON.stringify({"id" : index}))
            .toPromise()
            .then(response => response.json() as Product[] || [])
            .catch(this.handleError);
    }

    updateProduct(newProduct: Product): Promise<void> {
        return this.http.post(
            this.apiUrl + '/products/update-quantity',
            JSON.stringify(newProduct),
            {headers: this.requestHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    createNewOrder(userId: any): Promise<void> {
        return this.http.post(
            this.apiUrl + '/order/add',
            { id : userId} )
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getActiveOrder(userId: any): Promise<Order[]> {
        return this.http.post(
            this.apiUrl + '/order/get', {id: userId, active: true})
            .toPromise()
            .then(response => response.json() as Order[])
            .catch();
    }

    getCompletedOrders(userId: any): Promise<Order[]> {
        return this.http.post(
            this.apiUrl + '/order/get', {id: userId, active: false})
            .toPromise()
            .then(response => response.json() as Order[])
            .catch();
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

    getProductPurchasesCount(orderId : any, productId: any): Promise<number> {
        return this.http.post(
            this.apiUrl + '/purchase/get-by-product',
            {orderId: orderId, productId: productId})
            .toPromise()
            .then(response => {
                var orders : Order[] = response.json();
                return orders.length;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Purchase } from '../cart/purchase';
import { Observable } from 'rxjs/Observable';
import {Product} from "../products/product";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PurchaseService {

    private apiUrl = 'http://e-shop.dev:3000';

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }


    getPurchases(): Promise<Purchase[]> {
        return this.http.get(this.apiUrl + '/purchase/get-by-order/1')
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

    getProduct(index : any): Promise<Product> {
        return this.http.get(this.apiUrl + '/product/get/' + index)
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

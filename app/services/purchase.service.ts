import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Purchase } from '../cart/purchase';
import { Observable } from 'rxjs/Observable';
import {Product} from "../products/product";

@Injectable()
export class PurchaseService {

    private apiUrl = 'http://e-shop.dev:3000';

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getPurchases(): Observable<Purchase[]> {
        return this.http
            .post(
                this.apiUrl + '/purchase/get-by-order',
                { "uzsakymo_id" : "1" }
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProduct(): Observable<Product[]> {
        return this.http
            .post(
                this.apiUrl + '/purchase/get-product',
                { "name" : "rope" }
            )
            .map(this.extractData)
            .catch(this.handleError);
    }




    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

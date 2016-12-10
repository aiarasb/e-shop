import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../products/product';

@Injectable()
export class ProductService {

    private apiUrl = 'http://localhost:3000';

    private requestHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getProducts(): Observable<Product[]> {
        return this.http
            .post(
                this.apiUrl + '/products/get-all',
                ''
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    addProduct (name: string, description: string, price: number, quantity: number): void {
        this.http
            .post(
                this.apiUrl + '/products/add',
                JSON.stringify(
                    {
                        name:name,
                        description:description,
                        price:price,
                        quantity:quantity
                    }
                ),
                {headers: this.requestHeaders}
            )
            .toPromise()
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
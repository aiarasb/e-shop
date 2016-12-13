import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../products/product';

@Injectable()
export class ProductService {

    private apiUrl = 'http://127.0.0.1:3000';

    private requestHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    private extractDataOne(res: Response) {
        let body = res.json();
        if (body) {
            return body[0];
        }
        return {};
    }

    getProductsById(productIds: Array<string>): Observable<Product[]> {
        return this.http
            .post(
                this.apiUrl + '/products/get-multiple',
                JSON.stringify({'ids':productIds})
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProducts(): Observable<Product[]> {
        return this.http
            .post(
                this.apiUrl + '/products/get-all',
                ''
            )
            .map(this.extractData)
            .catch(this.handleError)
    }

    getProductByName(name: string): Observable<Product> {
        return this.http
            .post(
                this.apiUrl + '/products/get',
                JSON.stringify({name:name})
            )
            .map(this.extractDataOne)
            .catch(this.handleError);
    }

    addProduct (data): void {
        this.http
            .post(
                this.apiUrl + '/products/add',
                JSON.stringify(data),
                {headers: this.requestHeaders}
            )
            .toPromise()
            .catch(this.handleError);
    }

    deleteProduct (idProduct: string) {
        return this.http
            .post(
                this.apiUrl + '/products/delete',
                JSON.stringify({
                    _id: idProduct
                }),
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

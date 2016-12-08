import { Injectable } from '@angular/core';
import {Http, Response, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: Http) {}

    addProduct (name: string, description: string, price: number, quantity: number): void {
        this.http
            .post(
                this.apiUrl + '/products/add-product',
                JSON.stringify(
                    {
                        name:name,
                        description:description,
                        price:price,
                        quantity:quantity
                    }
                )
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
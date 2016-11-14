import { Injectable } from '@angular/core';
import {Http, Response, RequestMethod} from '@angular/http';
import { Product } from '../products/product';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProductService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: Http) {}

    addProduct (name: string): void {
        this.http
            .post(
                this.apiUrl + '/addProduct',
                JSON.stringify({name:name})
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
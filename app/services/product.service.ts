import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../products/product';
import { Router } from '@angular/router';

@Injectable()
export class ProductService {

    private apiUrl = 'http://127.0.0.1:3000';

    private requestHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http,
        private router: Router
    ) {}

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

    getReducedPrice(price: number, discount: number): number {
        if (!discount) {
            return 0;
        }

        let calculatedDidcount = price*(discount/100);
        return price - calculatedDidcount;
    }

    getPhotoLinks() {
        let photos = <HTMLCollection>document.getElementsByClassName('photo-link-input');
        if (!photos) {
            return [];
        }

        let photosObj = [];

        for(let i = 0; i < photos.length; i++)
        {
            let cover = 0;
            let link = (<HTMLInputElement>photos[i]).value;

            if (i === 0) {
                cover = 1;
            }
            photosObj.push({
                link: link,
                cover: cover
            });
        }
        return photosObj;
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

    getProductsByCategoryId(categoryId: string): Observable<Product[]> {
        return this.http
            .post(
                this.apiUrl + '/products/get-multiple-by-category',
                JSON.stringify({'id':categoryId})
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

    addProduct (product: Product, onSuccess): void {
        product['photos'] = this.getPhotoLinks();
        this.http
            .post(
                this.apiUrl + '/products/add',
                product,
            )
            .toPromise()
            .then((res) =>{
                console.log(res['_body']);
                onSuccess(JSON.parse(res['_body']));
            });
    }

    updateProduct(product: Product, onSuccess): void {
        product['photos'] = this.getPhotoLinks();
        this.http
            .post(
                this.apiUrl + '/products/update',
                product
            )
            .toPromise()
            .then((res) =>{
                console.log(res['_body']);
                onSuccess(JSON.parse(res['_body']));
            });
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

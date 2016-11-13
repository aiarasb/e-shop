import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category } from '../categories/category';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

    private apiUrl = 'http://e-shop.dev:3000';

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getCategories(): Observable<Category[]> {
        return this.http
            .post(
                this.apiUrl + '/category/get-all',
                ''
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    addCategory(): void {
        this.http
            .post(
                this.apiUrl + '/category/add',
                JSON.stringify({name:'catt', description:'dess'})
            )
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

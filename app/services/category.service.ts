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

    private extractDataOne(res: Response) {
      let body = res.json();
      if (body) {
        return body[0];
      }
      return {};
    }

    getCategories(): Observable<Category[]> {
      return this.http
        .post(
          this.apiUrl + '/categories/get-all',
          ''
        )
        .map(this.extractData)
        .catch(this.handleError);
    }

    addCategory(): void {
      this.http
        .post(
          this.apiUrl + '/categories/add',
          JSON.stringify({name:'catt', description:'dess'})
        )
        .toPromise()
        .catch(this.handleError);
    }

    getCategory(name: string): Observable<Category> {
      return this.http
        .post(
          this.apiUrl + '/categories/get',
          JSON.stringify({name:name})
        )
        .map(this.extractDataOne)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

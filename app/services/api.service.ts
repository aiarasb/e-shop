import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

    private apiUrl = 'http://localhost:3000';
    private requestHeaders = new Headers({
        'Content-Type': 'application/json',
        'Origin': 'Access-Control-Allow-Origin'
    });

    constructor(private http: Http) {}

    login(username, password) {
        return this.http
            .post(this.apiUrl + '/user/authenticate', JSON.stringify({username: username, password: password}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                console.log('weh');
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
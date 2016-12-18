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

    login(username, password, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/login', JSON.stringify({username: username, password: password}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                console.log(res._body);
                onSuccess(JSON.parse(res._body));
            })
    }

    register(username, password, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/create', JSON.stringify({username: username, password: password}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                onSuccess(JSON.parse(res._body));
            })
    }
}
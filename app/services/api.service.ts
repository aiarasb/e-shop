import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

    private apiUrl = 'http://localhost:3000';
    private requestHeader = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    login(username, password) {
        return this.http
            .post(this.apiUrl + '/user/authenticate', JSON.stringify({username: username, password: password}), {headers: this.requestHeader})
            .toPromise()
            .then(res => res.json().data);
    }
}
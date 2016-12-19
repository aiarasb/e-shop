import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

    private apiUrl = 'http://localhost:3000';
    private requestHeaders = new Headers({
        'Content-Type': 'application/json',
    });

    constructor(private http: Http) {}

    authorize(role, action, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/authorize', JSON.stringify({role: role, action: action}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                console.log(res['_body']);
                onSuccess(JSON.parse(res['_body']));
            })
    }

    login(username, password, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/login', JSON.stringify({username: username, password: password}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                console.log(res['_body']);
                onSuccess(JSON.parse(res['_body']));
            })
    }

    register(username, password, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/create', JSON.stringify({username: username, password: password}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                onSuccess(JSON.parse(res['_body']));
            })
    }

    getUser(userId, onSuccess) {
        return this.http
            .get(this.apiUrl + `/user/${userId}`, {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                onSuccess(JSON.parse(res['_body']))
            })
    }

    getUsers(onSuccess) {
        return this.http
            .get(this.apiUrl + `/user/all`, {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                onSuccess(JSON.parse(res['_body']))
            })
    }

    updateUser(userData, username, password, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/update', JSON.stringify({id: userData._id, username: username, password: password, role: userData.role, photo: userData.photo}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                console.log('update', res);
                onSuccess(JSON.parse(res['_body']));
            })
    }

    removeUser(userId, onSuccess) {
        return this.http
            .post(this.apiUrl + '/user/delete', JSON.stringify({id: userId}), {headers: this.requestHeaders})
            .toPromise()
            .then((res) => {
                onSuccess(JSON.parse(res['_body']));
            })
    }
}

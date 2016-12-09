import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'login',
    template: `
        <p>{{loggedIn}}</p>
        <button (click)="login()">click</button>
    `
})

export class LoginComponent {
    constructor (
        private apiService: ApiService
    ) {}
    private loggedIn = 'no';
    login() {
        this.loggedIn = 'yes';
        //this.apiService.login('a', 'a').then((res) => console.log(res));
    }
}

import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'login',
    template: `
        <p>Login</p>
        <button (click)="login()">click</button>
    `
})

export class LoginComponent {
    constructor (
        private apiService: ApiService
    ) {}

    login() {
        this.apiService.login('a', 'a').then((res) => console.log(res));
    }
}

import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
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

import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    constructor (
        private apiService: ApiService,
        private router: Router
    ) {}
    private loggedIn = false;
    private showLoginPanel = 'hidden';
    private showRegisterPanel = 'hidden';

    private username = '';
    private password = '';
    private passwordRepeat = '';

    private errorMessage = '';

    ngOnInit() {
        let userId = window.localStorage.getItem('userId');
        if(userId) {
            this.apiService.getUser(userId, (res) => {
                if(res.success === 'true') {
                    this.username = res.payload.username;
                    this.password = res.payload.password;
                    this.loggedIn = true;
                }
            })
        }
    }

    showRegister() {
        if(this.showRegisterPanel === 'hidden') {
            this.showRegisterPanel = '';
            this.showLoginPanel = 'hidden';
            this.errorMessage = ''
        } else {
            this.showRegisterPanel = 'hidden'
        }
    }

    showLogin() {
        if(this.showLoginPanel === 'hidden') {
            this.showLoginPanel = '';
            this.showRegisterPanel = 'hidden';
            this.errorMessage = ''
        } else {
            this.showLoginPanel = 'hidden'
        }
    }

    register() {
        if(this.password === this.passwordRepeat) {
            this.apiService.register(this.username, this.password, (res) => {
                if(res.success === 'false') {
                    this.errorMessage = res.message;
                } else {
                    this.login()
                }
            })
        } else {
            this.errorMessage = 'Passwords do not match!'
        }
    }

    login() {
        this.apiService.login(this.username, this.password, (res) => {
            console.log(res);
            if(res.success === 'true') {
                this.loggedIn = true;
                this.showLoginPanel = 'hidden';
                window.localStorage.setItem('userId', res.payload._id);
            } else {
                this.errorMessage = res.message
            }
        })
    }

    logout() {
        this.username = '';
        this.password = '';
        this.loggedIn = false;
        window.localStorage.clear();
        this.router.navigate(['']);
    }

    update(username, password) {
        this.username = username;
        this.password = password;
    }
}

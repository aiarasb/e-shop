import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})

export class UserComponent {
    constructor (
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.apiService.getUser(window.localStorage.getItem('userId'), (res) => {
            if(res.success === 'true') {
                this.apiService.authorize(res.payload.role, 'editUserRoles', (results) => {
                    console.log('res', results)
                    if(results.success) {
                        this.showRootAdminSection = true;
                        this.username = res.payload.username;
                        this.password = res.payload.username;
                        this.userData = res.payload;
                    }
                });
            }
        })
    }

    private userData = {
        photo: ''
    };
    private username;
    private password;
    private showRootAdminSection;

    update() {
        this.apiService.updateUser(this.userData, this.username, this.password, (res) => {
            if(res.success === 'true') {
                console.log(res.payload);
                this.userData = res.payload;
            }
        });
    }
}

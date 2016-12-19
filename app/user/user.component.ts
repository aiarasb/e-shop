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
                this.userData = res.payload;
                if(this.userData.role === 'rootAdmin') {
                    this.showRootAdminSection = true;
                }
                console.log(this.userData)
            }
        })
    }

    private userData;
    private username;
    private password;
    private showRootAdminSection;

    update() {
        this.apiService.updateUser(this.userData, this.username, this.password, (res) => {
            if(res.success === 'true') {
                this.userData = res.payload;
            }
        });
    }
}

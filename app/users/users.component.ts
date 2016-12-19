import { Component } from '@angular/core';

import { ApiService } from '../services/api.service'

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']
})

export class UsersComponent {
    constructor (
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.apiService.getUsers((res) => {
            console.log(res);
            this.users = res.payload;
        })
    }

    private users = [];
    private roles = ['user', 'admin', 'rootAdmin'];

    delete(user) {
        this.apiService.removeUser(user._id, (res) => {
            if(res.success === 'true') {
                this.users = this.users.filter(filteredUser => filteredUser._id !== user._id)
            }
        })
    }

    onChange(userToUpdate, role) {
        this.users.forEach((user) => {
            if(user._id === userToUpdate._id) {
                user.role = role;
            }
        })
    }

    update() {
        this.users.forEach((user) => {
            if(user.role && user.username && user.password) {
                this.apiService.updateUser(user, user.username, user.password, (res) => {})
            }

        })
    }
}

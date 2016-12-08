'use strict';

const mongoDb = require('../services/mongodbService.js');

let authenticateUser = () => {};

let loginUser = (request, reply) => {
    let payload = request.payload;

    if(!payload.username || !payload.password) {
        reply({
            success: 'false',
            message: 'You need to enter username and password.'
        });
    }

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user)=>{
            return user.username === payload.username &&
                    user.password === payload.password;
        });

        if(user) {
            message = {
                success: 'true',
                payload: user
            };
        } else {
            message = {
                success: 'false',
                message: 'Wrong username and password combination!'
            };
        }
        reply(message);
    }).catch(()=>{
        reply({success: 'false'});
    });

};

let createUser = (request, reply) => {
    let payload = request.payload;

    if(!payload.username || !payload.password) {
        reply({
            success: 'false',
            message: 'You need to enter username and password.'
        });
    }

    let newUser = {
        username: payload.username,
        password: payload.password
    };

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user)=>{
            return user.username === newUser.username;
        });

        if(!user) {
            mongoDb.insertItem('userCollection', newUser);
            message = {
                success: 'true',
                message: 'created!',
                payload: user
            };
        } else {
            message = {
                success: 'false',
                message: 'A user with such username already exists!'
            };
        }
        reply(message);
    }).catch(()=>{
        reply({success: 'false'});
    });
};

let updateUser = (request, reply) => {
    let payload = request.payload;

    let userToUpdate = {
        username: payload.username,
        password: payload.password
    };

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user)=>{
            return user.username === userToUpdate.username;
        });

        if(user) {
            user.password = userToUpdate.password;

            mongoDb.updateItem('userCollection', user);

            console.log(user);

            message = {
                success: 'true',
                message: 'Updated!',
                payload: user
            };
        } else {
            message = {
                success: 'false',
                message: 'Did not find a user to update!'
            };
        }
        reply(message);
    }).catch((err)=>{
        reply({
            success: 'false',
            message: err
        });
    });
};

let deleteUser = () => {};

module.exports = [
    { method: 'POST', path: '/user/authenticate', handler: authenticateUser },
    { method: 'POST', path: '/user/login', handler: loginUser },
    { method: 'POST', path: '/user/create', handler: createUser },
    { method: 'POST', path: '/user/update', handler: updateUser },
    { method: 'POST', path: '/user/delete', handler: deleteUser }
];

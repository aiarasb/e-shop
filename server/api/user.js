'use strict';

const mongoDb = require('../services/mongodbService.js');

let getUser = (request, reply) => {
    let userId = request.params.id;

    if(!userId) {
        reply({
            success: 'false',
            message: 'The request must contain a user Id!'
        });
    }

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user) => {
            return user._id.toString() === userId;
        });

        if(user) {
            message = {
                success: 'true',
                payload: user
            };
        } else {
            message = {
                success: 'false',
                message: 'User with such id does not exist!'
            };
        }
        reply(message);
    }).catch(()=>{
        reply({success: 'false'});
    });
};

let getUsers = (request, reply) => {
    let users = mongoDb.getItems('userCollection');

    users.toArray().then((userArray) => {
        reply({
            success: 'false',
            payload: userArray
        });
    }).catch(()=>{
        reply({success: 'false'});
    });
};

let authorizeUser = (request, reply) => {
    let payload = request.payload;

    if(!payload.role || !payload.action) {
        reply({
            success: 'false',
            message: 'Missing role or action!'
        });
    }

    let roles = mongoDb.getItems('roleCollection');

    let message;

    roles.toArray().then((roleArray) => {
        let role = roleArray.find((role)=>{
            return role.name === payload.role;
        });

        if(role) {
            let action = role.actions.find(action => {
                return action === payload.action;
            });

            if(action) {
                message = {
                    success: true
                };
            } else {
                message = {
                    success: false
                };
            }


        } else {
            message = {
                success: 'false',
                message: 'Role not found.'
            };
        }
        reply(message);
    }).catch(()=>{
        reply({success: 'false'});
    });
};

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
        password: payload.password,
        role: 'user'
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
        id: payload.id,
        username: payload.username,
        password: payload.password,
        role: payload.role,
        photo: payload.photo
    };

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user)=>{
            return user._id.toString() === userToUpdate.id;
        });

        if(user) {
            user.username = userToUpdate.username;
            user.password = userToUpdate.password;
            user.role = userToUpdate.role;
            user.photo = userToUpdate.photo;

            mongoDb.updateItem('userCollection', user);

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

let deleteUser = (request, reply) => {
    let payload = request.payload;

    if(!payload.id) {
        reply({
            message: 'Must input id!'
        });
    }

    let users = mongoDb.getItems('userCollection');

    let message;

    users.toArray().then((userArray) => {
        let user = userArray.find((user)=>{
            return user._id.toString() === payload.id;
        });

        if(user) {
            mongoDb.removeItemById('userCollection', user._id);

            message = {
                success: 'true',
                message: 'Deleted!',
                payload: user
            };
        } else {
            message = {
                success: 'false',
                message: 'Did not find a user to delete!'
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

module.exports = [
    { method: 'GET',  path: '/user/{id}', handler: getUser},
    { method: 'GET',  path: '/user/all', handler: getUsers},
    { method: 'POST', path: '/user/authorize', handler: authorizeUser },
    { method: 'POST', path: '/user/login', handler: loginUser },
    { method: 'POST', path: '/user/create', handler: createUser },
    { method: 'POST', path: '/user/update', handler: updateUser },
    { method: 'POST', path: '/user/delete', handler: deleteUser }
];

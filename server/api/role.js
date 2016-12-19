'use strict';

const mongoDb = require('../services/mongodbService.js');

let getRoles = (request, reply) => {

    let roles = mongoDb.getItems('roleCollection');

    roles.toArray().then((roleArray) => {
        reply({success: true, payload: roleArray});
    }).catch(()=>{
        reply({success: 'false'});
    });
};

let createRole = (request, reply) => {
    let payload = request.payload;

    if(!payload.name || !payload.actions) {
        reply({
            success: 'false',
            message: 'You need to enter name and actions.'
        });
    }

    let newRole = {
        name: payload.name,
        actions: payload.actions
    };

    let roles = mongoDb.getItems('roleCollection');

    let message;

    roles.toArray().then((roleArray) => {
        let role = roleArray.find((role)=>{
            return role.name === newRole.name;
        });

        if(!role) {
            mongoDb.insertItem('roleCollection', newRole);
            message = {
                success: 'true',
                message: 'created!',
                payload: newRole
            };
        } else {
            message = {
                success: 'false',
                message: 'A role with such name already exists!'
            };
        }
        reply(message);
    }).catch(()=>{
        reply({success: 'false'});
    });
};

let deleteRole = (request, reply) => {
    let payload = request.payload;

    if(!payload.name) {
        reply({
            message: 'Must input name!'
        });
    }

    let roles = mongoDb.getItems('roleCollection');

    let message;

    roles.toArray().then((roleArray) => {
        let role = roleArray.find((role)=>{
            return role.username === payload.name;
        });

        if(role) {
            mongoDb.removeItemById('userCollection', role._id);

            message = {
                success: 'true',
                message: 'Deleted!',
                payload: role
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
    { method: 'GET', path: '/role/all', handler: getRoles },
    { method: 'POST', path: '/role/create', handler: createRole },
    { method: 'POST', path: '/role/delete', handler: deleteRole }
];

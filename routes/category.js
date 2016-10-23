'use strict';
const mongoDb = require('../services/mongodbService.js');
const Joi = require('Joi');

function getCategories (request, reply) {
    let products = mongoDb.getItems('categoryCollection');
    reply (products.toArray());
}

function addCategory (request, reply) {
    const productData = {
        name: request.payload.name,
        description: request.payload.description,
        products: []
    };
    mongoDb.insertItem('categoryCollection', productData);
    reply('Category added.');
}

function removeCategory (request, reply) {
    mongoDb.removeItemById('categoryCollection', request.params.id);
    reply('Category removed');
}

module.exports = [
    { method: 'GET', path: '/category/get-all', handler: getCategories },
    { method: 'GET', path: '/category/add', handler: addCategory },
    { method: 'GET', path: '/category/remove/{id}', handler: removeCategory }
];

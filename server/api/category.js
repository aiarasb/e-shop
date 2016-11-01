'use strict';
const mongoDb = require('../services/mongodbService.js');
const Joi = require('joi');

function getCategories (request, reply) {
    let products = mongoDb.getItems('categoryCollection');
    reply (products.toArray());
}

function addCategory (request, reply) {
    let data = JSON.parse(request.payload);
    const productData = {
        name: data.name,
        description: data.description,
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
    { method: 'POST', path: '/category/get-all', handler: getCategories },
    { method: 'POST', path: '/category/add', handler: addCategory },
    { method: 'POST', path: '/category/remove/{id}', handler: removeCategory }
];

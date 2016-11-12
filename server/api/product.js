'use strict';
const mongoDb = require('../services/mongodbService.js');

function getProducts (request, reply) {
    var products = mongoDb.getItems('productCollection');
    reply (products.toArray());
}

function getProduct (request, reply) {
    var order = mongoDb.getItemById('productCollection', request.params.id);
    reply(order);
}


function insertProduct (request, reply) {
    const productData = {
        name: request.params.name,
        quantity: 1,
        date: new Date()
    };
    mongoDb.insertItem('productCollection', productData);
    reply('Product added.');
}

module.exports = [
    { method: 'GET',  path: '/product/get/{id}', handler: getProduct },
    { method: 'GET', path: '/product/get-all', handler: getProducts },
    { method: 'GET', path: '/product/add/{name}', handler: insertProduct }
];

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

    // mongoDb.insertItem('productCollection', productData);
    reply('Product added.');
}

module.exports = [
    { method: 'GET',  path: '/product/get/{id}', handler: getProduct },
    { method: 'GET', path: '/product/get-all', handler: getProducts },
    { method: 'POST', path: '/products/add-product', handler: insertProduct }
];

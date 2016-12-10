'use strict';
const mongoDb = require('../services/mongodbService.js');

function getPurchases (request, reply) {
    let products = mongoDb.getItems('purchaseCollection');
    reply (products.toArray());
}

function getOrderPurchases (request, reply) {
    let products = mongoDb.getItemsByField('purchaseCollection', { "orderId" : request.params.id });
    reply (products.toArray());
}

function addPurchase (request, reply) {
    var item = {
        productId : request.payload.productId,
        orderId : request.payload.orderId,
        quantity : 1
    };
    mongoDb.insertItem('purchaseCollection', item);
    reply('Purchase added.');
}

function removePurchase(request, reply) {
    mongoDb.removeItemById('purchaseCollection', request.params.id);
    reply('Purchase removed');
}

function updatePurchase (request, reply){
    mongoDb.updateItem('purchaseCollection', request.payload);
    reply('Purchase updated.');
}

module.exports = [
    { method: 'GET', path: '/purchase/get-all', handler: getPurchases },
    { method: 'GET', path: '/purchase/get-by-order/{id}', handler: getOrderPurchases },
    { method: 'POST', path: '/purchase/add', handler: addPurchase },
    { method: 'POST', path: '/purchase/update', handler: updatePurchase },
    { method: 'GET', path: '/purchase/remove/{id}', handler: removePurchase }
];



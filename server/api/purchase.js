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

    var productId = request.payload.productId;
    var orderId = request.payload.orderId;

    let purchases = mongoDb.getItemsByField('purchaseCollection',
    {$and:[
        {"productId": productId},
        {"orderId" : orderId}
    ]});

    purchases.toArray().then((purchaseArray) => {
        if (purchaseArray.length > 0){
        console.log("Product already exists in order");
        reply("Product already exists in order");
        }else{
            var item = {
            productId : productId,
            orderId : orderId,
            quantity : 1
            };
            mongoDb.insertItem('purchaseCollection', item);
            reply('Purchase added.');
        }

    }).catch(()=>{
            reply("Error getting data from DB");
    });

}

function removePurchase(request, reply) {
    mongoDb.removeItemById('purchaseCollection', request.params.id);
    reply('Purchase removed');
}

function updatePurchase (request, reply){
    mongoDb.updateOneItem('purchaseCollection', request.payload);
    reply('Purchase updated.');
}

module.exports = [
    { method: 'GET', path: '/purchase/get-all', handler: getPurchases },
    { method: 'GET', path: '/purchase/get-by-order/{id}', handler: getOrderPurchases },
    { method: 'POST', path: '/purchase/add', handler: addPurchase },
    { method: 'POST', path: '/purchase/update', handler: updatePurchase },
    { method: 'GET', path: '/purchase/remove/{id}', handler: removePurchase }
];



'use strict';
const mongoDb = require('../services/mongodbService.js');
const Joi = require('joi');

function getPurchases (request, reply) {
    let products = mongoDb.getItems('purchaseCollection');
    reply (products.toArray());
}

function getOrderPurchases (request, reply) {
    let products = mongoDb.getItemsByField('purchaseCollection', { "uzsakymo_id" : request.params.id });
    reply (products.toArray());
}

function addPurchase (request, reply) {
    mongoDb.insertItem('purchaseCollection', request.payload);
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

//-------------------------------------------------------



function getFullProductInfo (request, reply) {
    var products = [];
    var cnt;

    mongoDb.getItemsByFieldCallback('purchaseCollection', { "uzsakymo_id" : request.payload.uzsakymo_id },
    function(items, count){
        items.forEach(function(doc){

            console.log(doc.kiekis);
            var product = { "_id": doc._id, "kiekis": doc.kiekis, "produkto_id": doc.produkto_id};
            products.push(product);
            //count--;
            console.log(count);
        })
    });

    reply ("done");
}



module.exports = [
    { method: 'POST', path: '/purchase/get-product-info', handler: getFullProductInfo },
    { method: 'GET', path: '/purchase/get-all', handler: getPurchases },
    { method: 'GET', path: '/purchase/get-by-order/{id}', handler: getOrderPurchases },
    { method: 'POST', path: '/purchase/add', handler: addPurchase },
    { method: 'POST', path: '/purchase/update', handler: updatePurchase },
    { method: 'GET', path: '/purchase/remove/{id}', handler: removePurchase }
];



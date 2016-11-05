'use strict';

const mongoDb = require('../services/mongodbService.js');


function insertOrder (request, reply){
    var orderData = {
            "_id" : request.payload._id                     // vėliau ištrint
        ,   "vardas" : ""
        ,   "pavarde" : ""
        ,   "kreditines_numeris" : ""
        ,   "kreditines_data" : ""
        ,   "krediditines_cvv" : ""
        ,   "adresas" : ""
        ,   "vartotojo_id" : request.payload.vartotojo_id
    };

    mongoDb.insertItem('orderCollection', orderData);
    reply('Order added.');
}

function updateOrder (request, reply){
    mongoDb.updateItem('orderCollection', request.payload);
    reply('Order updated.');
}

function getOrder (request, reply) {
    var order = mongoDb.getItemById('orderCollection', request.params.id);
    reply(order);
}

function getOrders (request, reply) {
    var orders = mongoDb.getItems('orderCollection');
    reply (orders.toArray());
}

function getUserOrders (request, reply) {
    var userId = encodeURIComponent(request.params.id);
    var orders = mongoDb.getItemsByField('orderCollection', { "vartotojo_id" : userId });
    reply (orders.toArray());
}


function removeOrder (request, reply) {
    mongoDb.removeItemById('orderCollection', request.params.id);
    reply('Order removed');
}



module.exports = [
    { method: 'GET',  path: '/order/get/{id}', handler: getOrder },
    { method: 'GET',  path: '/order/get-user-orders/{id}', handler: getUserOrders },
    { method: 'GET',  path: '/order/get-all', handler: getOrders },
    { method: 'POST', path: '/order/add', handler: insertOrder },
    { method: 'POST', path: '/order/update', handler: updateOrder },
    { method: 'GET',  path: '/order/remove/{id}', handler: removeOrder },
];

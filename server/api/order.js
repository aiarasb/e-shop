'use strict';

const mongoDb = require('../services/mongodbService.js');


function insertOrder (request, reply){
    var orderData = {
          isActive : true
        , userId : request.params.id
    };

    mongoDb.insertItem('orderCollection', orderData);
    reply('Order added.');
}

function getActiveOrder(request, reply){
    var userId = request.params.id;
    var order = mongoDb.getItemsByField('orderCollection',
        {$and:[
        {"userId": userId},
        {"isActive" : true}
    ]});

    reply(order.toArray());
}

function updateOrder (request, reply){
    console.log(request.payload);
    var res = mongoDb.updateOneItem('orderCollection', request.payload);
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
    var orders = mongoDb.getItemsByField('orderCollection', { "userId" : userId });
    reply (orders.toArray());
}


function removeOrder (request, reply) {
    mongoDb.removeItemById('orderCollection', request.params.id);
    reply('Order removed');
}



module.exports = [
    { method: 'GET',  path: '/order/get-active/{id}', handler: getActiveOrder },
    { method: 'GET',  path: '/order/get/{id}', handler: getOrder },
    { method: 'GET',  path: '/order/get-user-orders/{id}', handler: getUserOrders },
    { method: 'GET',  path: '/order/get-all', handler: getOrders },
    { method: 'GET', path: '/order/add/{id}', handler: insertOrder },
    { method: 'POST', path: '/order/update', handler: updateOrder },
    { method: 'GET',  path: '/order/remove/{id}', handler: removeOrder },
];

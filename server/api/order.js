'use strict';

const mongoDb = require('../services/mongodbService.js');


function insertOrder (request, reply){
    var userId = request.params.id;

    let order = mongoDb.getItemsByField('orderCollection',
        {$and:[
            {"userId": userId},
            {"isActive" : true}
    ]});

    order.toArray().then((orderArray) => {
        if (orderArray.length > 0){
        reply("Active order already exists.");
    }else{

        var orderData = {
            isActive : true
            , userId : request.params.id
        };

        mongoDb.insertItem('orderCollection', orderData);
        reply('Order added.');

    }
    }).catch(()=>{
            reply("Error getting data from DB");
    });
}

function getActiveOrder(request, reply){
    var userId = request.params.id;

    let order = mongoDb.getItemsByField('orderCollection',
        {$and:[
        {"userId": userId},
        {"isActive" : true}
    ]});

    reply(order.toArray());
}

function updateOrder (request, reply){
    var res = mongoDb.updateOneItem('orderCollection', request.payload);
    reply('Order updated.');
}

function getOrders (request, reply) {
    var orders = mongoDb.getItems('orderCollection');
    reply (orders.toArray());
}

function removeOrder (request, reply) {
    mongoDb.removeItemById('orderCollection', request.params.id);
    reply('Order removed');
}

module.exports = [
    { method: 'GET',  path: '/order/get-active/{id}', handler: getActiveOrder },
    { method: 'POST',  path: '/order/get-all', handler: getOrders },
    { method: 'GET', path: '/order/add/{id}', handler: insertOrder },
    { method: 'POST', path: '/order/update', handler: updateOrder },
    { method: 'GET',  path: '/order/remove/{id}', handler: removeOrder },
];

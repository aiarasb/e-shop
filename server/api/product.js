'use strict';
const mongoDb = require('../services/mongodbService.js');

function getProducts (request, reply) {
    let products = mongoDb.getItems('productCollection');
    reply (products.toArray());
}

function insertProduct (request, reply) {
    let payload = request.payload;
    let messages = [];
    if (!payload.name) {
        messages.push('Please enter products name');
    }

    if (!parseFloat(payload.price)) {
        messages.push('Please enter valid products price');
    }

    if (!parseInt(payload.quantity)) {
        messages.push('Please enter valid products quantity');
    }

    if (payload.discount && !parseFloat(payload.discount)) {
        messages.push('Invalid discount property');
    }

    if (messages.length > 0) {
        reply({
            success: 'false',
            messages: messages
        });
    }

    let newProduct = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        quantity: payload.quantity,
        photos: payload.photos
    };

    let products = mongoDb.getItems('productCollection');

    products.toArray().then((productArray) => {
        let product = productArray.find((product)=>{
            return product.name === newProduct.name;
        });

        let status = false;

        if (!product) {
            mongoDb.insertItem('productCollection', newProduct);
            messages.push('Product added');
            status = true;
        } else {
            messages.push('Product with same name already exists');
        }

        reply({
            success: status,
            messages: messages
        });
    }).catch(()=>{
        reply({success: 'false'});
    });
}

module.exports = [
    { method: 'POST', path: '/products/get-all', handler: getProducts },
    { method: 'POST', path: '/products/add', handler: insertProduct }
];

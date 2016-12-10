'use strict';
const mongoDb = require('../services/mongodbService.js');

function getProducts (request, reply) {
    let products = mongoDb.getItems('productCollection');
    reply (products.toArray());
}

function insertProduct (request, reply) {
    let payload = request.payload;
    let messages = validateProduct(payload);

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

function updateProduct(request, reply) {
    let payload = request.payload;
    mongoDb.updateOneItem('productCollection', payload);
    reply({
        pay: payload._id
    });
}

function validateProduct(payload)
{
    let errorMessages = [];
    if (!payload.name) {
        errorMessages.push('Please enter products name');
    }

    if (!parseFloat(payload.price)) {
        errorMessages.push('Please enter valid products price');
    }

    if (!parseInt(payload.quantity)) {
        errorMessages.push('Please enter valid products quantity');
    }

    if (payload.discount && !parseFloat(payload.discount)) {
        errorMessages.push('Invalid discount property');
    }
    return errorMessages;
}

module.exports = [
    { method: 'POST', path: '/products/get-all', handler: getProducts },
    { method: 'POST', path: '/products/add', handler: insertProduct },
    { method: 'POST', path: '/products/update', handler: updateProduct }
];

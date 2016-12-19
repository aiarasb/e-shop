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
            success: false,
            messages: messages
        });
        return;
    }



    let newProduct = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        quantity: payload.quantity,
        photos: payload.photos,
        categories: payload.categories
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
        reply({success: false});
});
}

function updateProduct(request, reply) {
    let payload = request.payload;
    let messages = validateProduct(payload);

    if (messages.length > 0) {
        reply({
            success: false,
            messages: messages
        });
        return false;
    }

    let newProduct = {
        _id: payload._id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        quantity: payload.quantity,
        photos: payload.photos,
        categories: payload.categories
    };

    mongoDb.updateOneItem('productCollection', newProduct);
    reply({
        success: true,
        messages: ['Successful product update']
    });
}

function updateProductWithoutValidation(request, reply) {
    let payload = request.payload;

    mongoDb.updateOneItem('productCollection', payload);
    reply("Successful product update");
}

function deleteProduct(request, reply) {
    let payload = request.payload;
    mongoDb.removeItemById('productCollection', payload._id);
    reply({
        success: true,
        messages: ['Product removed']
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

function getProductByName (request, reply) {
    let data = JSON.parse(request.payload);
    let product = mongoDb.getItemByName('productCollection', data.name);
    reply(product.toArray());
}

function getProductById (request, reply) {
    let data = JSON.parse(request.payload);
    let product = mongoDb.getItemById('productCollection', data.id);
    reply(product.toArray());
}

function getProductsById (request, reply) {
    let data = request.payload;
    let products = mongoDb.getItemsById('productCollection', data.ids);
    reply(products.toArray());
}

function getProductsByCategoryId (request, reply) {
    let data = JSON.parse(request.payload);
    let products = mongoDb.getItemsByCategoryId('productCollection', data.id);
    reply(products.toArray());
}

module.exports = [
    { method: 'POST', path: '/products/get-all', handler: getProducts },
    { method: 'POST', path: '/products/add', handler: insertProduct },
    { method: 'POST', path: '/products/update', handler: updateProduct },
    { method: 'POST', path: '/products/update-quantity', handler: updateProductWithoutValidation },
    { method: 'POST', path: '/products/delete', handler: deleteProduct },
    { method: 'POST', path: '/products/get', handler: getProductByName },
    { method: 'POST', path: '/products/get-by-id', handler: getProductById },
    { method: 'POST', path: '/products/get-multiple', handler: getProductsById },
    { method: 'POST', path: '/products/get-multiple-by-category', handler: getProductsByCategoryId }
];

'use strict';
const mongoDb = require('../services/mongodbService.js');
const Joi = require('joi');

function getCategories (request, reply) {
    let categories = mongoDb.getItems('categoryCollection');
    reply(categories.toArray());
}

function getCategory (request, reply) {
    let data = JSON.parse(request.payload);
    let category = mongoDb.getItemByName('categoryCollection', data.name);
    reply(category.toArray());
}

function addCategory (request, reply) {
    let data = JSON.parse(request.payload);
    const productData = {
        name: data.name,
        description: data.description,
        products: []
    };
    mongoDb.insertItem('categoryCollection', productData);
    reply('Category added.');
}

function deleteCategory (request, reply) {
    let data = JSON.parse(request.payload);
    mongoDb.removeItemByName('categoryCollection', data.name);
    reply('Category removed');
}

function updateCategory (request, reply) {
    let data = JSON.parse(request.payload);
    mongoDb.updateItem('categoryCollection', data.category);
    reply('Category updated');
}

module.exports = [
    { method: 'POST', path: '/categories/get-all', handler: getCategories },
    { method: 'POST', path: '/categories/get', handler: getCategory },
    { method: 'POST', path: '/categories/add', handler: addCategory },
    { method: 'POST', path: '/categories/delete', handler: deleteCategory },
    { method: 'POST', path: '/categories/update', handler: updateCategory }
];

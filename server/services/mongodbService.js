'use strict';
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/e-shop';

let collections;

const mongoConnect = (callback) => {
    MongoClient.connect(url, (err, db) => {
        collections = {
            productCollection: db.collection('productCollection'),
            categoryCollection: db.collection('categoryCollection')
        };
        callback();
    });
};

const insertItem = (usedCollection, item) => {
    collections[usedCollection].insert(item);
};

const getItems = (usedCollection, limit) => {
    let items = collections[usedCollection].find();
    if (typeof limit != 'undefined') {
        items.limit(limit);
    }
    return items;
};

const getItemById = (usedCollection, id) => {
    let item = collections[usedCollection].find({'_id': id});
    return item;
};

const getItemByName = (usedCollection, name) => {
    let item = collections[usedCollection].find({'name': name}).limit(1);
    return item;
};

const updateItem = (usedCollection, item) => {
    collections[usedCollection].replace({'_id': item._id}, item);
};

const removeItemById = (usedCollection, id) => {
    collections[usedCollection].remove({'_id': id});
};

const removeItem = (usedCollection, item) => {
    collections[usedCollection].remove({'_id': item._id});
};


module.exports = {
    mongoConnect,
    insertItem,
    getItems,
    getItemById,
    updateItem,
    removeItemById,
    removeItem,
    getItemByName
};

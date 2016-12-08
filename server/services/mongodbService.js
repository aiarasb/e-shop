'use strict';
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/e-shop';

let collections;

const mongoConnect = (callback) => {
    MongoClient.connect(url, (err, db) => {
        collections = {
            productCollection: db.collection('productCollection'),
            categoryCollection: db.collection('categoryCollection'),
            userCollection: db.collection('userCollection')
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
    let item = collections[usedCollection].find(ObjectId(id));
    return item;
};

const getItemByName = (usedCollection, name) => {
    let item = collections[usedCollection].find({'name': name}).limit(1);
    return item;
};

const updateItem = (usedCollection, item) => {
    collections[usedCollection].replaceOne({'_id': ObjectId(item._id)}, item);
};

const removeItemById = (usedCollection, id) => {
    collections[usedCollection].remove({'_id': ObjectId(id)});
};

const removeItemByName = (usedCollection, name) => {
    collections[usedCollection].remove({'name': name});
};

const removeItem = (usedCollection, item) => {
    collections[usedCollection].remove({'_id': ObjectId(item._id)});
};


module.exports = {
    mongoConnect,
    insertItem,
    getItems,
    getItemById,
    updateItem,
    removeItemById,
    removeItemByName,
    removeItem,
    getItemByName
};

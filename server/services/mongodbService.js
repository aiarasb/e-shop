'use strict';
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/e-shop';

let collections;

const mongoConnect = (callback) => {
    MongoClient.connect(url, (err, db) => {
        collections = {
            productCollection: db.collection('productCollection'),
            categoryCollection: db.collection('categoryCollection'),
            purchaseCollection: db.collection('purchaseCollection'),
            orderCollection: db.collection('orderCollection'),
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

const getItemsByField = (collectionName, field) => {
    let items = collections[collectionName].find(field);
    return items;
}


//---------------------------------------------------------

const getItemsByFieldCallback = (collectionName, field, callback) => {
    let items = collections[collectionName].find(field);
    callback(items, items.count());
}

//--------------------------------------------------------

// find was not working -> findOne
const getItemById = (usedCollection, id) => {
    let item = collections[usedCollection].findOne({'_id': id});
    return item;
};


// uncaught error 'replace is not  a function' -> updateOne
const updateItem = (usedCollection, item) => {
    collections[usedCollection].updateOne({'_id': item._id}, item);
}


const removeItemById = (usedCollection, id) => {
    collections[usedCollection].remove({'_id': id});
}

const removeItem = (usedCollection, item) => {
    collections[usedCollection].remove({'_id': item._id});
}


module.exports = {
    mongoConnect,
    insertItem,
    getItems,
    getItemsByField,
    getItemsByFieldCallback,
    getItemById,
    updateItem,
    removeItemById,
    removeItem
}

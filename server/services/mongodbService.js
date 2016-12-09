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
<<<<<<< HEAD
            purchaseCollection: db.collection('purchaseCollection'),
            orderCollection: db.collection('orderCollection'),
=======
            userCollection: db.collection('userCollection')
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
    let item = collections[usedCollection].findOne({'_id': id});
=======
    let item = collections[usedCollection].find(ObjectId(id));
    return item;
};

const getItemByName = (usedCollection, name) => {
    let item = collections[usedCollection].find({'name': name}).limit(1);
>>>>>>> refs/remotes/origin/master
    return item;
};


// uncaught error 'replace is not  a function' -> updateOne
const updateItem = (usedCollection, item) => {
<<<<<<< HEAD
    collections[usedCollection].updateOne({'_id': item._id}, item);
}


const removeItemById = (usedCollection, id) => {
    collections[usedCollection].remove({'_id': id});
}

const removeItem = (usedCollection, item) => {
    collections[usedCollection].remove({'_id': item._id});
}
=======
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
>>>>>>> refs/remotes/origin/master


module.exports = {
    mongoConnect,
    insertItem,
    getItems,
    getItemsByField,
    getItemsByFieldCallback,
    getItemById,
    updateItem,
    removeItemById,
<<<<<<< HEAD
    removeItem
}
=======
    removeItemByName,
    removeItem,
    getItemByName
};
>>>>>>> refs/remotes/origin/master

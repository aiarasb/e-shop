'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Joi = require('joi');
const mongoDb = require('./services/mongodbService.js');
const routes = require('./routes');
const server = new Hapi.Server();

mongoDb.mongoConnect(() => {});

server.register(Inert, () => {});
server.register(Joi, () => {});

server.connection({ port: 3000 });
server.route(routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

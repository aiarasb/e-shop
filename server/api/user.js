'use strict';

function authenticate (request, reply) {
    reply ('a');
}

module.exports = [
    { method: 'POST', path: '/user/authenticate', handler: authenticate }
];

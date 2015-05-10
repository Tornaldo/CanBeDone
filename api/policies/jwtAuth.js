var expressJwt = require('express-jwt');
var secret = '5edc0f9cdef5d177ad6f7c6d1a64126d';

module.exports = expressJwt({secret: secret});
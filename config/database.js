const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/node-rest-api';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(
    'mongodb://localhost/diy-api',
    { useMongoClient: true }
);

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
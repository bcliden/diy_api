const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/diy-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo')
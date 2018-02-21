const mongoose = require('mongoose');
const uri = 'mongodb://localhost/diy-api';

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(uri, { useMongoClient: true })
    .then(() => {
        console.log('db connected successfully!')
    })
    .catch(err => {
        console.error('db connection failed: ', err.message)
    });

module.exports.Todo = require('./todo')
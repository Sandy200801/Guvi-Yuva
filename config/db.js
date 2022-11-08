const mongoose = require('mongoose');

var url ='mongodb+srv://admin:admin@cluster0.sy8rfgr.mongodb.net/?retryWrites=true&w=majority';

const connection = mongoose.createConnection(url);

module.exports = connection;



var app = require('express');
var mongoose = require('mongoose');
var dbString = 'mongodb://localhost/houseology';

var options = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0
}

mongoose.connect(dbString, options);